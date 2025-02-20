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
const emit = defineEmits(["update:isOpen", "update:id"]);

// Variables réactives
const libelle = ref("");
const ancienLibelle = ref("")
const description = ref("");
const submitted = ref(false);
const loading = ref(false);
const loadingEdit = ref(false);
const loadingAdd = ref(false);
const errorMessage = ref("")
const erreur = ref(false)
const actions = ref([])

const totalRows = ref(1);
const currentPage = ref(1);
const perPage = ref(5);
const pageOptions = ref([5, 10, 15, 20]);
const filter = ref('');
const sortBy = ref('age');
const sortDesc = ref(false);
const fields = ref(["Rôle"])

// Validation avec Vuelidate
const rules = computed(() => ({
  libelle: { required },

}));

const v$ = useVuelidate(rules, { libelle});

// Méthodes
const onSaveprofil = async () => {
  submitted.value = true;
  v$.value.$touch();

  if (v$.value.libelle.$error) {
    return;

  }else{
    loadingAdd.value = true
    erreur.value = false

    try{
      const formData = {
      libelle: libelle.value,
      description: description.value,

    };

      const data = await createResource(`role`, formData);
      console.log("Error:------------"+JSON.stringify(data))
      if(!data.data.error){

        const data = await getAll("role");
        console.log("data save:------------"+JSON.stringify(data.data))
        gestionStore.setProfils(data.data)
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
  // Récupérer tous les départements
  
} catch (error) {
  console.error('Erreur lors de la récupération des données:', error);
}
});


watch(
  () => props.id,  
  async (newid) => {  
    if (newid) {
      loading.value = true
      // recuperation du profil
      const profil = await getById("role", newid);
      libelle.value = profil.data.libelle
      ancienLibelle.value = profil.data.libelle
      description.value = profil.data.description

      console.log("profil---------------------"+isEditMode)

      // // recuperation des profils
      // const role = await getAll("role")
  
      // // recuperation des action
      // const actions = await getAll("action")
      // actions.value = actions.data

      // // extrait les libelles
      // if (actions.value && Array.isArray(actions.value)) {
      //   actions.value.forEach(element => {
      //     fields.value.push(element.libelle);
      //   });
      // } else {
      //   console.error('actions.value.array n\'est pas un tableau ou est undefined');
      // }
      // console.log("libelle---------------------"+JSON.stringify(fields.value))

      loading.value = false
    }
  },
  { immediate: true }  // Lance le watch dès que possible, même si la prop est déjà présente
);

// Fonction de mise à jour du département
const onUpdateprofil = async () => {
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
    if(ancienLibelle.value !== libelle.value){
      formData.append('libelle', libelle.value);
    }
    
    formData.append('description', description.value);

    console.log("----------------------Mise  jour ------------------")

    // Appel API pour mettre à jour le profil
    const response = await  apiClient.put(`/role/${props.id}`, formData, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`,  // Utilisation du token d'authentification
      },
    });

    // Vérification de la réponse
    if (!response.data.error) {
      console.log("Modification réussie : ", response.data.message);
      erreur.value = false;  // Réinitialiser l'état d'erreur
      const data = await getAll("role");
      console.log("data save:------------"+JSON.stringify(data.data))
      gestionStore.setProfils(data.data)
      alertMessage(data.data.message, 'success')
      resetForm()

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

const filterOn = computed(() => props.fields.map(field => field.key));

const filteredData = computed(() => {
  if (filter.value) {
    return actions.value.filter(item =>
      filterOn.value.some(key =>
        String(item[key]).toLowerCase().includes(filter.value.toLowerCase())
      )
    );
  }
  return actions.value;
});


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
      description.value = response.data.data.description

    }
  } catch (error) {
    console.error('Erreur durant la recuperation de la categorie:', error);
  }finally{
    loading.value = false; 
  }
}


const resetForm = () => {
  libelle.value = "";
  description.value = "";

  submitted.value = false;
  erreur.value = false
  
  emit("update:isOpen", false);
  emit("update:id", null);

  v$.value.$reset();
};
</script>

<template>
  <BModal 
      @hide="resetForm" 
      :modelValue="isOpen" 
      size="lg"
      title-class="font-18" 
      hide-footer
      :title="isEditMode ? `Modifier le Profil ` : 'Créer un Profil'" 
      no-close-on-backdrop
  >
    <!-- :title="isEditMode ? `Modifier le service ` : 'Créer un Service'"  -->
  <div v-if="loading" class="loading-ellipses">
    <span class="dot">.</span>
    <span class="dot">.</span>
    <span class="dot">.</span>
  </div>
  
  <!-- <template #modal-title>
      <div v-if="isEditMode">Modifier le profil</div>
      <div v-else>Créer un profil</div>
  </template> -->

  <BForm v-if="!loading" class="form-vertical px-3" role="form">

    <!-- Afficher en cas de creation -->
    <div v-if="!isEditMode">
      <div class="mb-3">
        <label for="libelle" style="font-size: 12px;">Libellé <span class="fw-bool text-danger">*</span></label>
        <div class="input-group">
            <input 
            v-model="libelle" 
            type="text" 
            class="form-control border border-secondary" 
            id="libelle" 
            placeholder="Libellé" 
            :class="{'is-invalid': submitted && v$.libelle.$error }" 
            />
            <div v-if="submitted && v$.libelle.$error" class="invalid-feedback">
            <span v-if="v$.libelle.required.$invalid">Cet champ est obligatoire
            </span>
            </div>
      </div>
            
      </div>
      <div class="mb-3">
        <label for="description" style="font-size: 12px;">Description</label>
        <div class="input-group">
            <textarea 
                v-model="description" 
                type="text"
                class="form-control border border-secondary" 
                id="description" 
                placeholder="Description" 
            ></textarea>
        </div>  
      </div>
    </div>

    <BRow>

        <BCol md="4" sm="12" >
          <div class="mb-3">
              <label for="libelle" style="font-size: 12px;">Libellé <span class="fw-bool text-danger">*</span></label>
              <div class="input-group">
                <input 
                  v-model="libelle" 
                  type="text" 
                  class="form-control border border-secondary" 
                  id="libelle" 
                  placeholder="Libellé" 
                  :class="{'is-invalid': submitted && v$.libelle.$error }" 
                />
                <div v-if="submitted && v$.libelle.$error" class="invalid-feedback">
                <span v-if="v$.libelle.required.$invalid">Cet champ est obligatoire
                </span>
                </div>
              </div>
              
          </div>
        </BCol>

        <BCol md="8" sm="12">
          <div class="mb-3">
              <label for="description" style="font-size: 12px;">Description</label>
              <div class="input-group">
                <input 
                  v-model="description" 
                  type="text"
                  class="form-control border border-secondary" 
                  id="description" 
                  placeholder="Description" 
              />
              </div>
          </div>
        </BCol>
    </BRow>

    <!-- Tableau Habilitation -->
    <div class="border border-secondary p-2 rounded-3" v-if="props.id" ">
    <BRow class="">
        <BCol sm="12" md="6" class="">
            <div id="tickets-table_length" class="dataTables_length">
            <label class="d-inline-flex align-items-center" style="font-size: 12px;">
                Afficher&nbsp;
                <BFormSelect v-model="perPage" size="sm" :options="pageOptions"></BFormSelect>éléments&nbsp;
            </label>
            </div>
        </BCol>
        <BCol sm="12" md="6">
        <div id="tickets-table_filter" class="dataTables_filter text-md-end">
            <label class="d-inline-flex align-items-center">
            <BFormInput placeholder="Rechercher" v-model="filter" type="search" class="form-control border border-black form-control-sm"></BFormInput>
            </label>
        </div>
        </BCol>
    </BRow>

    <div class="table-responsive mb-0 my-3">
    <BTable
      :items="filteredData" 
      :fields="fields" 
      responsive="sm" 
      :per-page="perPage" 
      :current-page="currentPage" 
      v-model:sort-by.sync="sortBy" 
      v-model:sort-desc.sync="sortDesc" 
      @filtered="onFiltered"
    >

        <template #cell(voir)="row">
            <BFormCheckbox :disabled="isDetailMode" class="border border-secondary" v-model="row.item.modifier" @change="onCheckboxChange(row.item)">
            </BFormCheckbox>
        </template>

        <template #cell(supprimer)="row">
            <BFormCheckbox :disabled="isDetailMode" class="border border-secondary" v-model="row.item.supprimer" @change="onCheckboxChange(row.item)">
            </BFormCheckbox>
        </template>
        <template #cell(modifier)="row">
            <BFormCheckbox :disabled="isDetailMode" class="border border-secondary" v-model="row.item.modifier" @change="onCheckboxChange(row.item)">
            </BFormCheckbox>
        </template>

        <template #cell(ajouter)="row">
            <BFormCheckbox :disabled="isDetailMode" class="border border-secondary" v-model="row.item.ajouter" @change="onCheckboxChange(row.item)">
            </BFormCheckbox>
        </template>
        <template #cell(accepter)="row">
            <BFormCheckbox :disabled="isDetailMode" class="border border-secondary" v-model="row.item.accepter" @change="onCheckboxChange(row.item)">
            </BFormCheckbox>
        </template>
        <template #cell(rejeter)="row">
            <BFormCheckbox :disabled="isDetailMode" class="border border-secondary" v-model="row.item.rejeter" @change="onCheckboxChange(row.item)">
            </BFormCheckbox>
        </template>

    </BTable>
    <!-- Pagination placée après le tableau -->
    <BRow>
        <BCol>
        <div class="dataTables_paginate paging_simple_numbers d-flex justify-content-between pb-2" style="font-size: 12px;">
            <div id="tickets-table_length" class="dataTables_length">
            <label class="d-inline-flex align-items-center">
                Afficher de 1 à {{ perPage }} sur {{ totalRows }} éléments
            </label>
            </div>
            <ul class="pagination pagination-rounded mb-0">
            <BPagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" />
            </ul>
        </div>
        </BCol>
    </BRow>
    </div>
    </div>

    <div v-if="!isEditMode" class="mt-4 d-flex justify-content-center">
      <BButton 
        v-if="!isEditMode" 
        @click="onSaveprofil" 
        :loading="loadingAdd"
        loading-text="enregistrement"
        variant="primary" 
        class="w-sm waves-effect waves-light btn btn-sm" 
      >
        Enregistrer
      </BButton>
      <BButton 
        v-if="isEditMode" 
        @click="onUpdateprofil" 
        :loading="loadingEdit"
        loading-text="modification"
        variant="primary" 
        class="w-sm waves-effect waves-light btn btn-sm" 
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
