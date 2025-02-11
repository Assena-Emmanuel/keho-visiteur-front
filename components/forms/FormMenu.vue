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
const { getAll, createResource, getById } = useApi(authStore.token);


// Déclaration des props
const props = defineProps({
  isOpen: Boolean,
  id: Number,
  isEditMode: Boolean,
  selectedIndex: Number, // L'index de l'élément à éditer
});

// Déclaration des événements
const emit = defineEmits(["update:isOpen", "update:id", "update-edit-mode"]);


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
// const isEditMode = ref("");
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

const v$ = useVuelidate(rules, { libelle, name});

// Méthodes
const onSaveMenu = async () => {
  submitted.value = true;
  v$.value.$touch();

  if (v$.value.libelle.$error || v$.value.target.$error || v$.value.name.$error) {
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

      const data = await createResource(`menu`, formData);
      if(!data.data.error){

        const data = await getAll("menu");
        gestionStore.setMenus(data.data)
        alertMessage(data.data.message, 'success')
        resetForm()
        
      }else{
        console.log("------------------------------error: "+JSON.stringify(data.data))
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
  () => props.id,  
  async (newid) => {  
    if (newid) {
      loading.value = true
      // recuperation du menu
      const menu = await getById("menu", newid);
      libelle.value = menu.data.libelle
      name.value = menu.data.name
      target.value = menu.data.target
      statut.value = menu.data.statut
      type.value = menu.data.type
      menu_id.value = menu.data.menu_id

      // tous les menus
      const menus = await getAll("menu")
      menus.value = menus.data

      loading.value = false
    }
  },
  { immediate: true }  // Lance le watch dès que possible, même si la prop est déjà présente
);

// Fonction de mise à jour du département
const onUpdateMenu = async () => {
  submitted.value = true;
  v$.value.$touch(); // Marquer tous les champs comme touchés pour activer la validation

  // Vérification des erreurs de validation
  if (v$.value.$invalid) {
    alert(target.value)
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
    const response = await  apiClient.put(`/categorie/${props.id}`, formData, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`,  // Utilisation du token d'authentification
      },
    });

    // Vérification de la réponse
    if (!response.data.error) {
      console.log("Modification réussie : ", response.data.message);
      erreur.value = false;  // Réinitialiser l'état d'erreur
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
  
  emit("update:isOpen", false);
  emit("update:id", null);
  emit('update-edit-mode', !props.isEditMode);
  v$.value.$reset();
};
</script>


<template>
  <BModal 
      @hide="resetForm" 
      :modelValue="isOpen" 
      size="lg"
      :title="isEditMode ? `Modification du Menu ` : 'Création du Menu'" 
      title-class="font-18" 
      hide-footer
  >

  <div v-if="loading" class="loading-ellipses">
    <span class="dot text-danger">.</span>
    <span class="dot text-primary">.</span>
    <span class="dot text-success">.</span>
  </div>

  <BForm v-else class="form-vertical  px-3" role="form">

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
                    <div v-if="submitted && v$.target.$error" class="invalid-feedback">
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
                        <option value="PARA">PARAMETRES</option>
                        <option value="SIDE">SIDEBAR</option>
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
                    <select v-model="menu_id" id="menu" class="form-select form-select-sm border border-black rounded-2" aria-label="Default select example">
                        <option v-for="menu in menus" :key="menu.id" :value="menu.id" :selected="menu_id == menu.id ">{{ menu.libelle }}</option>
                    </select>
                </div>
            </div>
        </BCol>

    </BRow>

    <div class="mt-4 d-flex justify-content-center">
      <BButton v-if="!isEditMode" @click="onSaveMenu" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        Enregistrer
      </BButton>
      <BButton v-if="isEditMode" @click="onUpdateMenu" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
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
