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
const menus = ref([])
const permissions = ref({})

const totalRows = ref(1);
const currentPage = ref(1);
const perPage = ref(5);
const pageOptions = ref([5, 10, 15, 20]);
const filter = ref('');
const sortBy = ref('age');
const sortDesc = ref(false);
const fields = ref([])
const dataRole = ref({})
const formData = ref({})

const newPermission = ref({})

// Validation avec Vuelidate
const rules = computed(() => ({
  libelle: { required },

}));


const paginatedMenus = computed(() => {
    const start = (currentPage.value - 1) * perPage.value
    const end = start + perPage.value
    return menus.value.slice(start, end)

});


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
});

// Extraire les actions pour créer les fields du tableau
const extractActionFields = (menus) => {
      let actions = new Set();
      menus.forEach(menu => {
        menu.permissions.forEach(permission => {
          actions.add(permission.action_lib);
        });
      });
      return Array.from(actions);
};

watch(
  () => id.value,  
  async (newid) => {  
    if (newid) {
      
      loading.value = true
      isOpen.value = false
      // recuperation du profil
      try{
          isOpen.value = true
          isEditMode.value = true
          
          
         
          const profil = await getById("role", newid);
          
          
          // const actions = await getAll("action")
        
        if(!profil.data.error){

          libelle.value = profil.data.libelle
          ancienLibelle.value = profil.data.libelle
          description.value = profil.data.description

          
          const response = await apiClient.get(`/permissions/${profil.data.id}`,{
            headers: {
              'Authorization': `Bearer ${authStore.token}`,
            },
          });
          
          if(!response.data.error){

            dataRole.value = response.data

            // Mappage des menus et permissions
            menus.value = dataRole.value.menus;
            totalRows.value = menus.value.length

            // Définir les actions comme les fields pour la table
            fields.value = extractActionFields(menus.value);

           
              menus.value.map((menu) => {
                menu.permissions.map((perm) => {
                  formData.value[`${menu.resourceId}-${perm.action_id}`] =
                    perm.habilitation;
                });
              });
            console.log("fields-------------: "+JSON.stringify(fields.value))

            
          }else{
            alert()
          }
          
          

        }else{
          console.error("recuperation Profil error: "+profil.data.message)
        }
        
        
      }catch(e){
        console.error("Erreur: "+e)
      }finally{
        loading.value = false
      }
      
    }
  },
  { immediate: true }  // Lance le watch dès que possible, même si la prop est déjà présente
);

// Fonction de mise à jour du département
const onUpdateprofil = async () => {
  submitted.value = true;
  v$.value.$touch(); // Marquer tous les champs comme touchés pour activer la validation

  // Vérification des erreurs de validation
  if (!id.value || id.value <= 0) {
    alert("L'ID est invalide");
    return; // Si des erreurs existent, on arrête la fonction
  }

  loadingEdit.value = true;
  console.log(formData.value);

  try {
    const response = await apiClient.post("/permissions", {
      "role_id": id.value,
      'choices': formData.value
    }, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (response.status === 201) {
      isOpen.value = false
      isEditMode.value = false
      id.value = null
      resetForm();
    } else {
      alert("Une erreur est survenue : " + response.statusText);
    }

  } catch (error) {
    // Gestion des erreurs si l'appel API échoue
    errorMessage.value = "Échec de mise à jour !";
    console.error(errorMessage.value, error);
  } finally {
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
  return menus.value;
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
  
  isOpen.value = false
  id.value = null
  isEditMode.value = false

};
</script>

<template>
  <BModal 
      @hide="resetForm" 
      v-model="isOpen" 
      size="xl"
      title-class="font-18" 
      hide-footer
      :title="isEditMode ? `Modifier le Profil ` : 'Créer un Profil'" 
      no-close-on-backdrop
      ok-only no-stacking
  >
    <!-- :title="isEditMode ? `Modifier le service ` : 'Créer un Service'"  -->
    <ScaleLoader :loading="loading" style="margin: 10em 0;" :color="'#FE0201'" />
  
  <BForm v-if="!loading" class="form-vertical px-3" role="form">
    <!-- Afficher en cas de creation -->
    <div class="row">
      <div class="col-md-6 mb-3">
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

      <div class="col-md-6 mb-3">
        <label for="description" style="font-size: 12px;">Description</label>
        <div class="input-group">
          <textarea 
              v-model="description" 
              rows="1"
              type="text"
              class="form-control border border-secondary" 
              id="description" 
              placeholder="Description" 
          ></textarea>
        </div>
      </div>

    </div>

    <!-- Habilitation -->
    <div v-if="!loading && isEditMode">
      <BRow class="mt-4">
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
            <BFormInput placeholder="Rechercher" v-model="filter" type="search" class="form-control border border-black form-control-sm w-100"></BFormInput>
            </label>
        </div>
        </BCol>
      </BRow>

      <table class="table" v-if="id">
  <thead class="table-dark">
    <tr>
      <th>Menu</th>
      <th v-for="action in fields" :key="action.id">
        <th>{{ action }}</th>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="menu in paginatedMenus" :key="menu.resourceId">
      <td>{{ menu.resourceName }}</td>
      <td class="text-center" v-for="action in menu.permissions" :key="action.action_id">
        <input
          type="checkbox"
          :name="`${menu.resourceId}-${action.action_id}`"
          :checked="action.habilitation ? true : false"
          v-model="formData[`${menu.resourceId}-${action.action_id}`]"
        />
      </td>
    </tr>
  </tbody>
</table>


      <!-- Pagination -->
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

    <div class="d-flex justify-content-center">
      <BButton 
      v-if="!isEditMode" 
      @click="onSaveprofil" 
      variant="primary" 
      class="w-sm waves-effect waves-light btn btn-sm" 
    >
      
      <span v-if="!loadingAdd">Enregistrer</span>
      <ScaleLoader :loading="loadingAdd" :height="'20px'" :color="'#FFFFFF'" />
    </BButton>
    
    <BButton 
      v-if="isEditMode" 
      @click="onUpdateprofil" 
      variant="primary" 
      class="w-sm waves-effect waves-light btn btn-sm" 
    >
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
