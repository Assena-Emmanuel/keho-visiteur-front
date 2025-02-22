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
const target = ref("");
const type = ref("");
const icon = ref("");
const position = ref("");
const name = ref("");
const statut = ref("");
const menu_id = ref(null);
const menus = ref([])

// Validation avec Vuelidate
const rules = computed(() => ({
  libelle: {
    required,
  },

  name: {
    required,
  },

  target: {
    required,
  },


}));

const v$ = useVuelidate(rules, { libelle, name, target});

// Méthodes
const onSaveMenu = async () => {
  submitted.value = true;
  v$.value.$touch();

  if (v$.value.libelle.$error || v$.value.target.$error || v$.value.name.$error ) {
    return;

  }else{
    loadingAdd.value = true
    erreur.value = false

    try{

      const formData = {
      libelle: libelle.value,
      name: name.value,
      target: target.value,
      type: type.value,
      menu_id: menu_id.value,
      icon: icon.value,
      position: 0,
      statut: statut.value,
      };

      const resp = await createResource(`menu`, formData);
      if(!resp.data.error){
        alertMessage(resp.data.message, 'success')
        const data = await getAll("menu");
        gestionStore.setMenus(data.data)
        
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
  // recuperation des menus
  
} catch (error) {
  console.error('Erreur lors de la récupération des données:', error);

}
});


watch(
  () => id.value,  
  async (newid) => {  
    if (newid) {
      loading.value = true
      isOpen.value = true
      isEditMode.value = true
      // recuperation du menu
      try{
        const menu = await getById("menu", newid);
        libelle.value = menu.data.libelle
        name.value = menu.data.name
        target.value = menu.data.target
        statut.value = menu.data.statut
        type.value = menu.data.type
        icon.value = menu.data.icon
        menu_id.value = menu.data.menu_id

        // console.log("Menu------------------: "+JSON.stringify(menu.data))
        // tous les menus
        const menus = await getAll("menu")
        menus.value = menus.data

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
const onUpdateMenu = async () => {
  submitted.value = true;
  v$.value.$touch();
  
  
  // Vérification des erreurs de validation
  if (v$.value.libelle.$error  || v$.value.name.$error || v$.value.target.$error) {

    return; // Si des erreurs existent, on arrête la fonction
  }


  loadingEdit.value = true;
  try {
    // Préparation des données à envoyer via FormData
    const formData = {
      libelle: libelle.value,
      name: name.value,
      target: target.value,
      type: type.value,
      menu_id: menu_id.value,
      icon: icon.value,
      position: 0,
      statut: statut.value,
    };

    // Appel API pour mettre à jour le menu
    const response = await  apiClient.put(`/menu/${id.value}`, formData, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`,  // Utilisation du token d'authentification
      },
    });

    // Vérification de la réponse
    console.log("Mise ajour: "+id.value+" "+JSON.stringify(response.data));
    if (!response.data.error) {
      const menus = await getAll("menu")
      alertMessage(response.data.message, "success")
      gestionStore.setMenus(menus.data); 
      erreur.value = false;  // Réinitialiser l'état d'erreur
      isOpen.value = false
      // resetForm(); 

    } else {
      // Si une erreur se produit dans la réponse de l'API
      // erreur.value = true;
      // errorMessage.value = "Mise à jour échouée !";
      alertMessage(response.data.message)
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
  name.value = "";
  icon.value = "";
  target.value = "";
  type.value = "";
  position.value = "";
  statut.value = "";
  menu_id.value = "";

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
                <label for="target" style="font-size: 12px;">Target </label>
                <div>
                    <input 
                      v-model="target" 
                      id="target" 
                      class="form-control form-control-sm"  
                      type="text"
                      :class="{
                      'is-invalid': submitted && v$.target.$error,
                      'border border-danger': submitted && v$.target.$error,
                      'border border-secondary': !(submitted && v$.target.$error)
                      }"
                    >
                    <div v-if="submitted && target==''" class="invalid-feedback">
                    <span v-if="v$.target.required.$invalid" class="font-size-12">champ obligatoire
                    </span>
                    </div>
                </div>
            </div>
        </BCol>

        <BCol md="6">
            <div class="mb-3">
                <label for="type" style="font-size: 12px;">Type </label>
                <div class="input-group">
                    <select v-model="type" id="type" class="form-select form-select-sm border border-secondary rounded-2" aria-label="Default select example">
                        <option value="PARA" :selected="target === 'PARAM' ">PARAMETRES</option>
                        <option value="SIDE" :selected="target === 'SIDE' ">SIDEBAR</option>
                    </select>
                </div>
            </div>
        </BCol>
        
        <BCol md="6">
            <div class="mb-3">
                <label for="name" style="font-size: 12px;">Name </label>
                <div>
                    <input 
                    v-model="name" 
                    id="name" 
                    class="form-control form-control-sm"  
                    type="text"
                    :class="{
                    'is-invalid': submitted && v$.name.$error,
                    'border border-danger': submitted && v$.name.$error,
                    'border border-secondary': !(submitted && v$.name.$error)
                    }">
                    <div v-if="submitted && v$.name.$error" class="invalid-feedback">
                    <span v-if="v$.name.required.$invalid" class="font-size-12">champ obligatoire
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
                    class="form-control form-control-sm"  
                    type="text"
                    :class="{
                    'is-invalid': submitted && v$.icon.$error,
                    'border border-danger': submitted && v$.icon.$error,
                    'border border-secondary': !(submitted && v$.icon.$error)
                    }">
                    
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
        
        <BCol md="6">
            <div class="mb-3">
                <label for="menu" style="font-size: 12px;">Menu </label>
                <div class="input-group">
                    <select v-model="menu_id" id="menu" class="form-select form-select-sm border border-secondary rounded-2" aria-label="Default select example">
                        <option v-for="menu in menus" :key="menu.id" :value="menu.id" :selected="menu_id == menu.id ">{{ menu.libelle }}</option>
                    </select>
                </div>
            </div>
        </BCol>

    </BRow>

    <div class="mt-4 d-flex justify-content-center">
      <BButton v-if="!isEditMode" @click="onSaveMenu" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        
        <span v-if="!loadingAdd">Enregistrer</span>
        <ScaleLoader :loading="loadingAdd" :height="'20px'" :color="'#FFFFFF'" />
      </BButton>
      <BButton v-if="isEditMode" @click="onUpdateMenu" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        
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
