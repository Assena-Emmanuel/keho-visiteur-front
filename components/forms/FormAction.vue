<script setup>
import { ref, computed, defineModel } from "vue";
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
const { getAll, createResource, getById } = useApi(authStore.token);


// Déclaration des props
// const props = defineProps({
//   isOpen: Boolean,
//   id: Number,
//   isEditMode: Boolean,
//   selectedIndex: Number, // L'index de l'élément à éditer
// });

const isOpen = defineModel('isOpen')
const id = defineModel('id')
const isEditMode = ref(false)



// Variables réactives
const submitted = ref(false);
const loading = ref(false);
const loadingEdit = ref(false);
const loadingAdd = ref(false);
const errorMessage = ref("")
const erreur = ref(false)
const libelle = ref("");
const lastLibelle = ref("")
const code = ref("");
const type = ref("");
const icon = ref("");

const statut = ref(1);
const menu_id = ref(null);
const actions = ref([])

// Validation avec Vuelidate
const rules = computed(() => ({
  libelle: {
    required,
  },

  code: {
    required,
  },



}));

const v$ = useVuelidate(rules, { libelle, code});

// Méthodes
const onSaveAction = async () => {
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
      code: code.value,
      icon: icon.value,
      position: null,
      statut: statut.value,
      };

      const data = await createResource(`action`, formData);
      if(!data.data.error){

        const data = await getAll("action");
        gestionStore.setActions(data.data)
        alertMessage(data.data.message, 'success')
        resetForm()
        
      }else{
        alertMessage(data.data.message, 'error')
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
  // recuperation des actions
  
} catch (error) {
  console.error('Erreur lors de la récupération des données:', error);

}
});


watch(
  () => id.value,  
  async (newid) => {  
    if (newid) {
      
      isOpen.value = true
      isEditMode.value = true
      // recuperation du menu
      try{
        loading.value = true
        const menu = await getById("action", newid);
        libelle.value = menu.data.libelle
        lastLibelle.value = menu.data.libelle
        code.value = menu.data.code
        icon.value = menu.data.icon
        statut.value = menu.data.statut
      
        // tous les actions
        const actions = await getAll("action")
        actions.value = actions.data

      }catch(e){
        console.error("error Menu: "+e)

      }finally{
        loading.value = false

      }
      

     

      
    }
  },
  { immediate: true }  // Lance le watch dès que possible, même si la prop est déjà présente
);

// Fonction de mise à jour du département
const onUpdateAction = async () => {
  submitted.value = true;
  v$.value.$touch();
  
  
  // Vérification des erreurs de validation
  if (v$.value.libelle.$error  || v$.value.code.$error) {

    return; // Si des erreurs existent, on arrête la fonction
  }


  loadingEdit.value = true;
  try {
    // Préparation des données à envoyer via FormData
    const formData = {
      code: code.value,
      icon: icon.value,
      statut: statut.value,
    };

    if(libelle.value !== lastLibelle.value){
        formData["libelle"] = libelle.value
    }

    // Appel API pour mettre à jour le menu
    const response = await  apiClient.put(`/action/${id.value}`, formData, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`,  // Utilisation du token d'authentification
      },
    });

    // Vérification de la réponse
    if (!response.data.error) {
      const actions = await getAll("action")
      gestionStore.setActions(actions.data); 
      erreur.value = false;  // Réinitialiser l'état d'erreur
      isOpen.value = false
      // resetForm(); 

    } else {
      // Si une erreur se produit dans la réponse de l'API
      erreur.value = true;
      errorMessage.value = "Mise à jour échouée !";
      console.error("Mise ajour: "+response.data.message);

    }

  } catch (error) {
    // Gestion des erreurs si l'appel API échoue
    errorMessage.value = "Échec de mise à jour !";
    console.error("error: "+ error);
  } finally {
    // Fin du processus de chargement, que l'appel réussisse ou échoue
    loadingEdit.value = false;
  }
};




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


const resetForm = () => {
    libelle.value = "";
  icon.value = "";
  code.value = "";
  statut.value = "";

  submitted.value = false;
  erreur.value = false
  
  isOpen.value = false
  isEditMode.value = false
  id.value = null
  v$.value.$reset();
};
</script>


<template>
  <BModal 
      @hide="resetForm" 
      v-model="isOpen" 
      size="lg"
      :title="isEditMode ? `Modification du Menu ` : 'Création du Menu'" 
      title-class="font-18" 
      hide-footer
  >

  <ScaleLoader :loading="loading" style="margin: 10em 0;" :color="'#FE0201'" />

  <BForm v-if="!loading" class="form-vertical  px-3" role="form">

    <BRow>
        <BCol md="6">
            <div class="mb-3">
            <label for="libelle" style="font-size: 12px;">Libellé</label>
            <input 
                v-model="libelle" 
                type="text" class="form-control form-control-sm" 
                id="departement" 
                placeholder="" 
                :class="{
                'is-invalid': submitted && v$.libelle.$error,
                'border border-danger': submitted && v$.libelle.$error,
                'border border-secondary': !(submitted && v$.libelle.$error)
                }"
            />
            <div v-if="submitted && v$.libelle.$error" class="invalid-feedback">
                <span v-if="v$.libelle.required.$invalid" class="font-size-12">champ obligatoire
                </span>
                </div>
            </div>
        </BCol>

        <BCol md="6">
            <div class="mb-3">
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
                      'border border-secondary': !(submitted && v$.code.$error)
                      }"
                    >
                    <div v-if="submitted && code==''" class="invalid-feedback">
                    <span v-if="v$.code.required.$invalid" class="font-size-12">champ obligatoire
                    </span>
                    </div>
                </div>
            </div>
        </BCol>

        

        <BCol md="6">
            <div class="mb-3">
                <label for="icon" style="font-size: 12px;">Icon </label>
                <div>
                    <input 
                    v-model="icon" 
                    id="icon" 
                    class="form-control form-control-sm border border-secondary"  
                    type="text"
                    >
                    <!-- 
                    :class="{
                    'is-invalid': submitted && v$.icon.$error,
                    'border border-danger': submitted && v$.icon.$error,
                    'border border-secondary': !(submitted && v$.icon.$error)
                    }"
                    <div v-if="submitted && v$.icon.$error" class="invalid-feedback">
                    <span v-if="v$.icon.required.$invalid" class="font-size-12">champ obligatoire
                    </span>
                    </div> -->
                </div>
            </div>
        </BCol>

        <BCol md="6">
            <div class="mb-3">
                <label for="position" style="font-size: 12px;">Statut </label>
                <div class="input-group">
                    <select v-model="statut" id="statut" class="form-select form-select-sm border border-secondary rounded-2" aria-label="Default select example">
                      <option value="1" :selected="statut === 1 ">activé</option>
                      <option value="0" :selected="statut === 0 ">desactivé</option>
                    </select>
                </div>
            </div>
        </BCol>
        


    </BRow>

    <div class="mt-4 d-flex justify-content-center">
      <BButton v-if="!isEditMode" @click="onSaveAction" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        
        <span v-if="!loadingAdd">Enregistrer</span>
        <ScaleLoader :loading="loadingAdd" :height="'20px'" :color="'#FFFFFF'" />
      </BButton>
      <BButton v-if="isEditMode" @click="onUpdateAction" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        
        <span v-if="!loadingEdit">Modifier</span>
        <ScaleLoader :loading="loadingEdit" :height="'20px'" :color="'#FFFFFF'" />
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
