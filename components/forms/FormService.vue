<script setup>
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useAuthStore } from "~/stores/auth.js";
import apiClient from '~/components/api/intercepteur';
import { useGestionStore } from "~/stores/gestion.js";
import { useApi } from '~/components/api/useApi';
import Swal from "sweetalert2";
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

const authStore = useAuthStore()
const gestionStore = useGestionStore()
const { getCategorieBySlug, createResource } = useApi(authStore.token);


const SLUG = "SRV"

// Déclaration des props
// const props = defineProps({
//   isOpen: Boolean,
//   id: Number,
//   isEditMode: Boolean,
//   selectedIndex: Number, // L'index de l'élément à éditer
// });

const isOpen = defineModel('isOpen')
const id = defineModel('id')
const isEditMode = defineModel('isEditMode')



// Variables réactives
const libelle = ref("");
const code = ref("");
const slug = ref("SRV");
const statut = ref(1);
const categorie = ref("");
const submitted = ref(false);
const loading = ref(false);
const loadingEdit = ref(false);
const loadingAdd = ref(false);
const departementPrincipale = ref("");
const selectDepartements = ref({})
const errorMessage = ref("")
const erreur = ref(false)

const ediData = ref({
  libelle:null,
  slug:null,
  code:null,
  statut:null,
})

// Validation avec Vuelidate
const rules = computed(() => ({
  libelle: { required },
  code: { required },
}));

const v$ = useVuelidate(rules, { libelle, code });

// Méthodes
const onSaveService = async () => {
  submitted.value = true;
  v$.value.$touch();

  if (v$.value.libelle.$error || v$.value.code.$error) {
    return;
  }else{
    loadingAdd.value = true
    erreur.value = false
    try{
      const formData = {
      libelle: libelle.value,
      slug: "SRV",
      code: code.value,
      position: 1,
      statut: statut.value || 1,
      categorie_id: departementPrincipale.value || null, 

    };

      const data = await createResource(`categorie`, formData);
      if(!data.data.error){
        

        const data = await getCategorieBySlug(SLUG);
        gestionStore.setServices(data.data.data)
        alertMessage(data.data.message, 'success')
        resetForm()
        
        
      }else{
        erreur.value = true
        errorMessage.value =`${data.data?.data?.libelle} \n ${data.data?.data?.code}`
      }
      
      
    }catch(error){
      console.error("error creer : "+error.message);
    }finally{
      loadingAdd.value = false
    }
    
  }
};


onMounted(async () => {

try {
  // Récupérer tous les départements
  const departements = await getCategorieBySlug("DPT");
  selectDepartements.value = departements.data.data; 
} catch (error) {
  console.error('Erreur lors de la récupération des données:', error);
}
});


watch(
  () => id.value,  
  async (newid) => {  
    if (newid) {
      isEditMode.value = true
      await getCategorie(newid);  
    }
  },
  { immediate: true }  // Lance le watch dès que possible, même si la prop est déjà présente
);

// Fonction de mise à jour du département
const onUpdateDepartement = async () => {
  submitted.value = true;
  v$.value.$touch(); // Marquer tous les champs comme touchés pour activer la validation

  // Vérification des erreurs de validation
  if (v$.value.$invalid) {
    return; // Si des erreurs existent, on arrête la fonction
  }

  loadingEdit.value = true;
  try {
    // Préparation des données à envoyer via FormData
    const formData = new FormData();
    formData.append('slug', slug.value);
    formData.append('code', code.value);
    formData.append('position', 1);  // Exemple de valeur pour position
    formData.append('statut', statut.value);



    // Si la valeur de libelle a changé, on l'ajoute au formData
    if (ediData.value.libelle !== libelle.value) {
      formData.append('libelle', libelle.value);
    }

    // Appel API pour mettre à jour le département
    const response = await apiClient.put(`/categorie/${id.value}`, formData, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`,  // Utilisation du token d'authentification
      },
    });

    // Vérification de la réponse
    if (!response.data.error) {
      departements();  // Recharger les départements après la mise à jour
      erreur.value = false;  // Réinitialiser l'état d'erreur
      isEditMode.value = false
      resetForm();  // Réinitialiser le formulaire après une mise à jour réussie
    } else {
      // Si une erreur se produit dans la réponse de l'API
      erreur.value = true;
      errorMessage.value = response.data.message;
      console.error(response.data.message);
    }

  } catch (error) {
    // Gestion des erreurs si l'appel API échoue
    errorMessage.value = "Échec de mise à jour !";
    console.error(errorMessage.value, error);
  } finally {
    // Fin du processus de chargement, que l'appel réussisse ou échoue
    loadingEdit.value = false;
  }
};


// Obtenir tous les departements
const departements = async () => {
    try {
        const response = await apiClient.get(`/categorie_by_slug/${SLUG}`, {
            headers: {
                'Authorization': `Bearer ${authStore.token}`,
            },
        });

        if (!response.data.error) {
            gestionStore.setServices(response.data.data);
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error("Erreur 401 : Jeton invalide ou utilisateur non authentifié.");
        } else {
            console.error("Erreur lors de la récupération des départements :", error);
        }
    } 
  }

// Alert
function alertMessage(message, icon = "error") {
    Swal.fire({
      position: "top",
      icon,
      text: message,
      showConfirmButton: false,
      timer: 2000,
      customClass: {
        popup: 'custom-popup',
        icon: 'custom-icon',
        title: 'custom-title'
      }
    });
  }

// Fonction asynchrone pour récupérer l'utilisateur par uuid
async function getCategorie(id) {
  loading.value = true;
  try {
    const response = await apiClient.get(`/categorie/${id}`, {
      headers: { 
        'Authorization': `Bearer ${authStore.token}`,  
      }
    });

    if (!response.data.error) {
      libelle.value = response.data.data.libelle
      slug.value = response.data.data.slug
      code.value = response.data.data.code
      statut.value = response.data.data.statut
      departementPrincipale.value = response.data.data.categorie_id

      // conserver une copie des infos afin de verifier qu'est ce qui changé lors de la mise a jour
      ediData.value.libelle = response.data.data.libelle
    }
  } catch (error) {
    console.error('Erreur durant la recuperation de la categorie:', error);
  }finally{
    loading.value = false; 
  }
}

async function toutesCategories(slug) {
  try {
    const response = await apiClient.get(`/categorie_by_slug/${slug}`, {
      headers: { 
        'Authorization': `Bearer ${authStore.token}`,  // Utilise `this.token` si `this` est disponible
      }
    });

    if (!response.data.error) {
      return response.data.data;
    }
  } catch (error) {
    console.error('Error fetching Departement-----:', error);
  }
}

const resetForm = () => {
  libelle.value = "";
  code.value = "";
  slug.value = "";
  submitted.value = false;
  erreur.value = false

  isOpen.value = false
  id.value = false
  isEditMode.value = false

  v$.value.$reset();
};
</script>


<template>
  <BModal 
      @hide="resetForm" 
      v-model="isOpen" 
      size="lg"
      :title="isEditMode ? `Modifier le service ` : 'Créer un Service'" 
      title-class="font-18" 
      hide-footer
      no-close-on-backdrop
  >

  <ScaleLoader :loading="loading" style="margin: 10em 0;" :color="'#FE0201'" />

  <BForm v-if="!loading" class="form-vertical px-3" role="form">
    <div class="alert alert-danger" v-if="erreur">
      {{ errorMessage }}
    </div>

    <div class="row mb-3">
      <div class="col-sm-8 col-md-8">
      <label for="libelle" style="font-size: 12px;">Libellé <span class="text-danger">*</span></label>
      <input 
        v-model="libelle" 
        type="text" class="form-control form-control-sm" 
        id="departement" 
        placeholder="" 
        :class="{
        'is-invalid': submitted && v$.libelle.$error,
        'border border-danger': submitted && v$.libelle.$error,
        'border border-dark': !(submitted && v$.libelle.$error)
        }"
      />
      <div v-if="submitted && v$.libelle.$error" class="invalid-feedback">
          <span v-if="v$.libelle.required.$invalid" class="font-size-12">champ obligatoire
          </span>
        </div>
    </div>
    <div class="col-sm-4 col-md-4">
      <label for="departement" style="font-size: 12px;">Statut <span class="text-danger">*</span></label>
      <div class="input-group">
        <select v-model="statut" id="departement" class="form-select form-select-sm border border-secondary rounded-2" aria-label="Default select example"
        >
          <option value="1" :selected="statut === 1 ">activé</option>
          <option value="0" :selected="statut === 0 ">desactivé</option>

        </select>
      </div>
      
    </div>
    </div>
    
    <div class="row mb-3">
      <div class="col-6 col-sm-6 col-md-6">
      <label for="code" style="font-size: 12px;">Code <span class="text-danger">*</span> </label>
      <div>
        <input 
          v-model="code" 
          id="code" 
          class="form-control form-control-sm"  
          type="text"
          :class="{
          'is-invalid': submitted && v$.code.$error,
          'border border-danger': submitted && v$.code.$error,
          'border border-dark': !(submitted && v$.code.$error)
        }">
        <div v-if="submitted && v$.code.$error" class="invalid-feedback">
          <span v-if="v$.code.required.$invalid" class="font-size-12">champ obligatoire
          </span>
        </div>
      </div>
    </div>


    <!-- <div class="col-6 col-sm-6 col-md-6">
      <label for="code" style="font-size: 12px;">Slug </label>
      <div>
        <input 
          v-model="slug" 
          disabled
          id="code" 
          class="form-control form-control-sm"  
          type="text"
        >
      </div>
    </div> -->

    <div class="col-6 col-sm-6 col-md-6">
      <label for="departement" style="font-size: 12px">Département Principal</label>
      <div class="input-group">
        <select v-model="departementPrincipale" id="departement" class="form-select form-select-sm border border-secondary rounded-2" aria-label="Default select example"
        >
          <option 
            v-for="departement in selectDepartements" 
            :key="departement.code" 
            :value="departement.id"
            :selected="departementPrincipale == departement.id "
          >
          
            {{ departement.libelle }}
          
          </option>

        </select>
      </div>
    </div> 
    </div>


    

    <div class="mt-4 d-flex justify-content-center">
      <BButton :loading="loadingAdd" 
      loading-text="enregistrement" v-if="!isEditMode" @click="onSaveService" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        Enregistrer
      </BButton>
      <BButton 
        v-if="isEditMode" 
        @click="onUpdateDepartement" 
        variant="primary" 
        class="w-sm waves-effect waves-light btn btn-sm" 
        :loading="loadingEdit" 
        loading-text="modification"
      >
        Modifier
      </BButton>
    </div>
  </BForm>
</BModal>
</template>

<style scoped>
.loading-ellipses {
  font-size: 40px; /* Taille augmentée */
  color: #3498db;
  text-align: center;
  font-weight: bold;
}

.dot {
  animation: blink 1s infinite;
  margin: 0 5px; /* Espacement entre les points */
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.3s;
}

.dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes blink {
  0%, 20% {
    opacity: 0;
  }
  50%, 100% {
    opacity: 1;
  }
}

/* Alert */
.custom-popup {
  display: flex;
  align-items: center;
  padding: 10px;
}

/* Classe pour l'icône */
.custom-icon {
  font-size: 10px;
  float: left;
}
</style>
