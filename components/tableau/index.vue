<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { capitalize } from "vue";
import apiClient from "~/components/api/intercepteur";
import { useAuthStore } from "~/stores/auth.js";
import { allUserStore} from "~/stores/allUserStore.js"
import Swal from 'sweetalert2';

// Props
const props = defineProps({
  fields: Array,
  title: String,
  showAddbtn: Boolean,
  typeForme: String,
  // data: Array,
  modal: Boolean,
  isLoading: Boolean,
});

// Emits
const emit = defineEmits(['data-selected']);

// Stores
const authStore = useAuthStore();
const userStore = allUserStore()

// Refs
const submitted = ref(false);

const detailModal = ref(false);
const localModal = ref(props.modal);
const isStatutActive = ref(false);
const totalRows = ref(1);
const currentPage = ref(1);
const perPage = ref(5);
const pageOptions = ref([5, 10, 15, 20]);
const filter = ref('');
const sortBy = ref('age');
const sortDesc = ref(false);
const detailUser = ref(null)
const uuid = ref(null)
const idDepartement = ref(null)
const typeForme = ref(null)
const data = ref(null)

// Computed properties
const filterOn = computed(() => props.fields.map(field => field.key));

const rows = computed(() => filteredData.value.length);

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
onMounted(() => {
  data.value = userStore.users
  typeForme.value = props.typeForme
  
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
  
  detailModal.value = true

  // Afficher le modal en fonction du type de gestion
  if(typeForme.value == "departement"){
    idDepartement.value = row.id

  }else if(typeForme.value == "user"){
    uuid.value = row.uuid

  }else if(typeForme.value == "servie"){
    uuid.value = row.id

  }

};

// Méthode pour émettre l'événement
const handleEdit = (row) => {

  if(typeForme.value == "departement"){
    emit('data-selected', { id: row.id});

  }else if(typeForme.value == "user"){
    emit('data-selected', { uuid: row.uuid});

  }else if(typeForme.value == "servie"){
    uuid.value = row.id

  }
  
};

const hideModal = () =>{
  detailModal.value = false
  detailUser.value = null
}

const confirmDelete = (code) => {
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
  }).then((result) => {
    if (result.isConfirmed) {
      deleteItem(code);
      useSwal().fire(
        'Supprimé!',
        'Votre élément a été supprimé.',
        'success'
      );
    }
  });
};

const capitalizeText = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
</script>


<template>
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
  </div>

  <div>
    <BRow>
      <BCol cols="12">
        <BCard no-body>
          <BCardBody>
            <BCardTitle>{{ title }}</BCardTitle>

            <!-- Modal Détail -->
            <BModal @hide="hideModal" v-if="detailModal" v-model="detailModal" :title="`Détail ${capitalize(typeForme)}`" hide-footer>
              <TableauDetailUser :uuid="uuid" v-if="typeForme == 'user'" />
              <TableauDetailDepartement :id="idDepartement" v-if="typeForme == 'departement'"/>
            </BModal>




            <BRow class="mt-4">
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
            <div class="table-responsive mb-0">
            
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
                <template #cell(statut)="row">
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

                <template #cell(Actions)="row">
                    <div class="d-flex gap-1">
                        <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="mr-1 text-primary d-flex justify-content-center align-items-center" @click="handleEdit(row.item)">
                            <i class="fas fa-edit" ></i>
                        </BButton>
                        <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="px-2 text-danger d-flex justify-content-center align-items-center" @click="confirmDelete(row.item.Code)">
                          <i class="uil uil-trash-alt font-size-15"></i>
                        </BButton>
                        <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="d-flex justify-content-center align-items-center" @click="showDetailsModal(row.item)">
                          <i class="fas fa-eye"></i>
                        </BButton>
                    </div>
                </template>

              </BTable>
            </div>
            <hr class="border-1 border-secondary">
            <BRow>
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
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>