<script setup>
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useAuthStore } from "~/stores/auth.js";
import apiClient from '~/components/api/intercepteur';
import { useGestionStore } from "~/stores/gestion.js";
import { useApi } from '~/components/api/useApi';
import Swal from "sweetalert2";

const authStore = useAuthStore()
const gestionStore = useGestionStore()
const { getAll, createResource } = useApi(authStore.token);


const SLUG = "SRV"

const isOpen = defineModel('isOpen')
const id = defineModel('id')
const isEditMode = ref(false)



// Variables réactives
const libelle = ref("");
const code = ref("");
const slug = ref("SRV");
const statut = ref("");
const categorie = ref("");
const submitted = ref(false);
const loading = ref(false);
const loadingEdit = ref(false);
const loadingAdd = ref(false);
const categoriePrincipale = ref("");
const selectCategories = ref([])
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
  slug: { required },
}));

const v$ = useVuelidate(rules, { libelle, code, slug });

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
      slug: slug.value,
      code: code.value,
      position: 1,
      statut: statut.value || 1,
      categorie_id: categoriePrincipale.value || null, 

    };

      const data = await createResource(`categorie`, formData);
      if(!data.data.error){
        

        const data = await getCategorieBySlug(SLUG);
        gestionStore.setServices(data.data.data)
        alertMessage(data.data.message, 'success')
        resetForm()
        
        
      }else{
        erreur.value = true
        errorMessage = data.data.message
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
  const categories = await getAll("categorie");
  selectCategories.value = categories.data; 
  
} catch (error) {
  console.error('Erreur lors de la récupération des données:', error);
}
});


watch(
  () => id.value,  
  async (newid) => {  
    if (newid) {
      await getCategorie(newid);  
    }
  },
  { immediate: true }  // Lance le watch dès que possible, même si la prop est déjà présente
);

// Fonction de mise à jour du département
const onUpdatecategorie = async () => {
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
      categories();  
      isOpen.value = false
      isEditMode.value = false
      erreur.value = false;  
      resetForm();  
      
    } else {
      // Si une erreur se produit dans la réponse de l'API
      erreur.value = true;
      errorMessage.value = "Mise à jour échouée !";
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


// Obtenir tous les categories
const categories = async () => {
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
      categoriePrincipale.value = response.data.data.categorie_id

      // conserver une copie des infos afin de verifier qu'est ce qui changé lors de la mise a jour
      ediData.value.libelle = response.data.data.libelle
    }
  } catch (error) {
    console.error('Erreur durant la recuperation de la categorie:', error);
  }finally{
    loading.value = false; 
  }
}


const resetForm = () => {
  libelle.value = "";
  code.value = "";
  slug.value = "";
  submitted.value = false;
  erreur.value = false
  

  v$.value.$reset();
};
</script>


<template>
  <BModal 
      @hide="resetForm" 
      v-model="isOpen"  
      size="lg"
      :title="isEditMode ? `Modifier la Categorie ` : 'Créer une Catégorie'" 
      title-class="font-18" 
      hide-footer
      no-close-on-backdrop
  >

  <div v-if="loading" class="loading-ellipses">
    <span class="dot">.</span>
    <span class="dot">.</span>
    <span class="dot">.</span>
  </div>

  <BForm v-else class="form-vertical px-3" role="form">
    <div class="alert alert-danger" v-if="erreur">
      {{ errorMessage }}
    </div>

    <div class="row mb-3">
      <div class="col-sm-8 col-md-8">
      <label for="libelle" style="font-size: 12px;">Libellé</label>
      <input 
        v-model="libelle" 
        type="text" class="form-control form-control-sm" 
        id="categorie" 
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
      <label for="categorie" style="font-size: 12px;">Statut</label>
      <div class="input-group">
        <select v-model="statut" id="categorie" class="form-select form-select-sm border border-secondary rounded-2" aria-label="Default select example"
        >
          <option value="1" :selected="statut === 1 ">activé</option>
          <option value="0" :selected="statut === 0 ">desactivé</option>

        </select>
      </div>
      
    </div>
    </div>
    
    <div class="row mb-3">
      <div class="col-6 col-sm-6 col-md-6">
      <label for="code" style="font-size: 12px;">Code </label>
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


    <div class="col-6 col-sm-6 col-md-6">
      <label for="slug" style="font-size: 12px;">Slug </label>
      <div>
        <input 
          v-model="slug" 
          id="slug" 
          class="form-control form-control-sm"  
          type="text"
          :class="{
          'is-invalid': submitted && v$.slug.$error,
          'border border-danger': submitted && v$.slug.$error,
          'border border-dark': !(submitted && v$.slug.$error)
        }">
        <div v-if="submitted && v$.slug.$error" class="invalid-feedback">
          <span v-if="v$.slug.required.$invalid" class="font-size-12">champ obligatoire
          </span>
        </div>
      </div>
    </div>
    </div>


    <div class="mb-3">
      <label for="categorie" style="font-size: 12px">Catégorie Principale</label>
      <div class="input-group">
        <select v-model="categoriePrincipale" id="categorie" class="form-select form-select-sm border border-secondary rounded-2" aria-label="Default select example"
        >
          <option 
            v-for="categorie in selectCategories" 
            :key="categorie.code" 
            :value="categorie.id"
            :selected="categoriePrincipale == categorie.id "
          >
          
            {{ categorie.libelle }}
          
          </option>

        </select>
      </div>
    </div> 

    <div class="mt-4 d-flex justify-content-center">
      <BButton :loading="loadingAdd" 
      loading-text="enregistrement" v-if="!isEditMode" @click="onSaveService" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        Enregistrer
      </BButton>
      <BButton 
        v-if="isEditMode" 
        @click="onUpdatecategorie" 
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
