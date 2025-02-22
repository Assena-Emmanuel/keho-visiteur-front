<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import apiClient from "~/components/api/intercepteur";
import { useAuthStore } from "~/stores/auth.js";
import Swal from 'sweetalert2';
import {useGestionStore} from "~/stores/gestion.js"
import { useApi } from '~/components/api/useApi';
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

// Props
const props = defineProps({
  fields: Array,
  title: String,
  typeForme: String,
  // data: Array,
  modal: Boolean,
  isLoading: Boolean,
});

// Emits
const emit = defineEmits(['data-selected']);

// Stores
const authStore = useAuthStore();
const gestionStore = useGestionStore()
const { deleteItem, getAll, getCategorieBySlug } = useApi(authStore.token);

// Refs
const submitted = ref(false);
const detailModal = ref(false);
const localModal = ref(props.modal);
const isStatutActive = ref(false);
// const totalRows = ref(1);
const currentPage = ref(1);
const perPage = ref(5);
const pageOptions = ref([5, 10, 15, 20]);
const filter = ref('');
const sortBy = ref('age');
const sortDesc = ref(false);
const uuid = ref(null)
const id = ref(null)
// const data = ref([]);  // Initialiser avec un tableau vide

// Computed properties
const filterOn = computed(() => props.fields.map(field => field.key));

const totalRows = computed(() => filteredData.value.length);

const filteredData = computed(() => {
  if (filter.value) {
    return data.value.filter(item =>
      filterOn.value.some(key =>
        String(item[key]).toLowerCase().includes(filter.value.toLowerCase())
      )
    );
  }
  return data.value;
});

// Watchers
watch(() => props.modal, (newVal) => {
  localModal.value = newVal;
});

// Lifecycle hooks
const data = computed(() => {
  if(props.typeForme === "user"){
    return gestionStore.users

  }else if(props.typeForme === "departement"){
    return gestionStore.departements

  }else if (props.typeForme === "service"){
    return gestionStore.services

  }else if (props.typeForme === "profil"){
    return gestionStore.profils

  }else if (props.typeForme === "menu"){
    return gestionStore.menus

  }else if (props.typeForme === "action"){
    return gestionStore.actions

  }else if (props.typeForme === "categorie"){
    return gestionStore.categories

  }
    
  return []
});

// Methods
const changerStatut = async (index) => {
  const user = data.value[index];

  try {
    const userResponse = await apiClient.get(`/user/${user.uuid}`, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`,
      },
    });

    const user_get = userResponse.data.data;

    const statutResponse = await apiClient.post(
      `/user/active/${user_get.uuid}`,
      { active: user_get.statut === 1 ? 0 : 1 },
      {
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
        },
      }
    );
  } catch (error) {
    console.error('Erreur lors du changement de statut : ', error);
  }
};

const onFiltered = (filteredItems) => {
  totalRows.value = filteredItems.length;
  currentPage.value = 1;
};

const showDetailsModal = (row) => {
  detailModal.value = true;

  // Afficher le modal en fonction du type de gestion
  if (props.typeForme === "departement") {
    id.value = row.id;
  } else if (props.typeForme === "user") {
    uuid.value = row.uuid;
  } else if (props.typeForme === "service") {
    id.value = row.id;
  }else if (props.typeForme === "profil") {
    id.value = row.id;

  }else if (props.typeForme === "categorie") {
    id.value = row.id;
    
  }
};

// Méthode pour émettre l'événement
const handleEdit = (row) => {
  if (props.typeForme === "departement") {
    emit('data-selected', { id: row.id });

  } else if (props.typeForme === "user") {
    emit('data-selected', { uuid: row.uuid });

  } else if (props.typeForme === "service") {
    emit('data-selected', { id: row.id });

  } else if (props.typeForme === "profil") {
    console.log("profil-------------------------id: "+row.id)
    emit('data-selected', { id: row.id });

  }else if (props.typeForme === "menu") {
    emit('data-selected', { id: row.id });
    
  }else if (props.typeForme === "action") {
    emit('data-selected', { id: row.id });
    
  }else if (props.typeForme === "categorie") {
    emit('data-selected', { id: row.id });
    
  }

};

const hideModal = () => {
  detailModal.value = false;
};

// Fonction de confirmation avant suppression
const confirmDelete = async (row) => {
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: 'Cette action est irréversible!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui',
    cancelButtonText: 'Non',
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      const id = row.id;
      let endpoint = 'categorie';

      if (props.typeForme === 'user') {
        endpoint = 'user'; // Remplacer l'endpoint si nécessaire
      }
      if (props.typeForme === 'profil') {
        endpoint = 'role'; // Remplacer l'endpoint si nécessaire
      }
      if (props.typeForme === 'menu') {
        endpoint = 'menu'; // Remplacer l'endpoint si nécessaire
      }

      if (props.typeForme === 'action') {
        endpoint = 'action'; // Remplacer l'endpoint si nécessaire
      }

      try {
        const response = await deleteItem(endpoint, id);
        // Afficher un message de succès après suppression
        Swal.fire(
          'Supprimé!',
          `${response.message}`,
          'success'
        );

        // Recharger la liste des départements après la suppression
        let data = null
        
        if (props.typeForme === "departement") {
          data = await getCategorieBySlug(`DPT`);
          gestionStore.setDepartements(data.data.data)

        } else if (props.typeForme === "user") {
          data = await getAll(`${endpoint}`);
          gestionStore.setUsers(data.data)

        } else if (props.typeForme === "service") {
          data = await getCategorieBySlug(`SRV`);
          gestionStore.setServices(data.data.data)

        } else if (props.typeForme === "profil") {
          data = await getAll(`${endpoint}`);
          gestionStore.setProfils(data.data)

        }else if (props.typeForme === "menu") {
          data = await getAll(`${endpoint}`);
          gestionStore.setMenus(data.data)

        }else if (props.typeForme === "action") {
          data = await getAll(`${endpoint}`);
          gestionStore.setActions(data.data)
        }

      } catch (error) {
        // Gérer les erreurs de suppression
        errorMessage.value = 'Erreur lors de la suppression!';
        console.error(errorMessage.value, error);
      } 
    }
  })
}

const capitalizeText = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
</script>



<template>
  <!-- <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
  </div> -->

  <div>
    <BRow>
      <BCol cols="12">
        <BCard no-body>
          <BCardBody>
            <BCardTitle>{{ title }}</BCardTitle>

            <!-- Modal Détail -->
            <BModal @hide="hideModal" v-if="detailModal" v-model="detailModal" :title="`Détail ${capitalizeText(typeForme)}`" hide-footer>
              <TableauDetailUser :uuid="uuid" v-if="typeForme == 'user'" />
              <TableauDetailDepartement :id="id" v-if="typeForme == 'departement'"/>
              <TableauDetailService :id="id" v-if="typeForme == 'service'"/>
              <TableauDetailProfil :id="id" v-if="typeForme == 'profil'"/>
            </BModal>

            <ScaleLoader :loading="isLoading" style="margin: 10em 0;" :color="'#FE0201'" />

            <BRow v-if="filteredData && !isLoading"  class="mt-4">
              <BCol sm="12" md="6" class="">
                <div id="tickets-table_length" class="dataTables_length">
                    <label class="d-inline-flex align-items-center">
                      Afficher&nbsp;
                      <BFormSelect class="border border-secondary" v-model="perPage" size="sm" :options="pageOptions"></BFormSelect>éléments&nbsp;
                      
                    </label>
                  </div>
              </BCol>
              <BCol sm="12" md="6">
                <div id="tickets-table_filter" class="dataTables_filter text-md-end">
                  <label class="d-inline-flex align-items-center">
                    Recherche:
                    <BFormInput v-model="filter" type="search" class="form-control border border-secondary form-control-sm ms-2"></BFormInput>
                  </label>
                </div>
              </BCol>
            </BRow>


            <div class="table-responsive mb-0" v-if="filteredData && !isLoading">
            
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
                <template #cell(statut)="row" v-if="props.typeForme === 'user'" >
                  <BFormCheckbox 
                    v-model="row.item.statut" 
                    class="custom-switch" 
                    switch
                    :value="1" 
                    :unchecked-value="0"
                    @change="changerStatut(row.index)"
                  >
                  </BFormCheckbox>
                </template>
                <template #cell(statut)="row" v-if="props.typeForme !== 'user'" >
                  <span class="badge text-bg-success" v-if="row.item.statut">activé</span>
                  <span class="badge text-bg-danger" v-else>désactivé</span>
                </template>

                <template #cell(Actions)="row">
                    <div class="d-flex gap-1">
                        <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="mr-1 text-primary d-flex justify-content-center align-items-center" @click="handleEdit(row.item)">
                            <i class="fas fa-edit" ></i>
                        </BButton>
                        <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="px-2 text-danger d-flex justify-content-center align-items-center" @click="confirmDelete(row.item)">
                          <i class="uil uil-trash-alt font-size-15"></i>
                        </BButton>
                        <BButton v-if="typeForme !== 'menu'" style="width: 15px; height: 15px;" variant="white" size="sm" class="d-flex justify-content-center align-items-center" @click="showDetailsModal(row.item)">
                          <i class="fas fa-eye"></i>
                        </BButton>
                    </div>
                </template>

              </BTable>
            </div>
            <hr class="border-1 border-secondary">
            <BRow v-if="filteredData && !isLoading">
              <BCol>
                <div class="dataTables_paginate paging_simple_numbers d-flex justify-content-between">
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
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>
  </div>
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
</style>
