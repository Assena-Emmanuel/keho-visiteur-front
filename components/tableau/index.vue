<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { capitalize } from "vue";
<<<<<<< HEAD
/**
 * Advanced-table component
 */
export default {
  data() {
    return {
      submitted: false,
      dataDetail: {},
      detailModal: false,
      localModal: this.modal,
      isStatutActive: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20],
      filter: "", 
      sortBy: "age",
      sortDesc: false,
    
    };
  },

  props: {
    fields: Array,
    title: String,
    showAddbtn: Boolean,
    typeForme: String,
    data: Array,
    modal: Boolean,
    isLoading: Boolean,
  },

  computed: {

    isStatutActive: {
      get() {
        return this.row.item.statut === 1; // Convert to boolean
      },
      set(value) {
        this.row.item.statut = value ? 1 : 0; // Convert back to numeric
      },
    },

    /**
     * Dynamically generate filterOn based on fields
     */
    filterOn() {
      // Return an array of keys from fields
      return this.fields.map(field => field.key);
    },
=======
import apiClient from "~/components/api/intercepteur";
import { useAuthStore } from "~/stores/auth.js";
import Swal from 'sweetalert2';
// Props
const props = defineProps({
  fields: Array,
  title: String,
  showAddbtn: Boolean,
  typeForme: String,
  data: Array,
  modal: Boolean,
  isLoading: Boolean,
});

// Emits
const emit = defineEmits(['data-selected']);

// Stores
const authStore = useAuthStore();

// Refs
const submitted = ref(false);
const loadingDetail = ref(false);
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
>>>>>>> 1711b80159c1652ec637dd733d324dfc391af93a

// Computed properties
const filterOn = computed(() => props.fields.map(field => field.key));

<<<<<<< HEAD
    /**
     * Filtered data based on search input
     */
    filteredData() {
      if (this.filter) {
        return this.data.filter(item =>
          this.filterOn.some(key =>
            String(item[key]).toLowerCase().includes(this.filter.toLowerCase())
          )
        );
      }
      return this.data;
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.data.length;
  },

  watch: {
    modal(newVal) {
      this.localModal = newVal;  // Mettre à jour la valeur locale lorsque la prop change
    }
  },

  methods: {
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Update totalRows and reset to first page after filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    showDetailsModal(id, data, typeForm){
      if(typeForm === "profil"){
        this.$emit('detail', data[id]);
      }else{
        this.detailModal = true
        this.dataDetail = {
          id: id,
          data: data[id],
          formType: typeForm,
        }
      }
      
    },
    handleEdit(index, data) {
        localStorage.setItem('edit', {row: data[index], index})
        this.$emit('edit', {row: data[index], index});

      },
      confirmDelete(code) {
      this.$swal.fire({
        title: 'Êtes-vous sûr?',
        text: "Cette action est irréversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non',
        reverseButtons: true // Inverser l'ordre des boutons
      }).then((result) => {
        if (result.isConfirmed) {
          // Logique pour supprimer l'élément ici
          this.deleteItem(code);

          this.$swal.fire(
            'Supprimé!',
            'Votre élément a été supprimé.',
            'success'
          );
        }
      });
    },

    capitalize(text){
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },
=======
const rows = computed(() => filteredData.value.length);
>>>>>>> 1711b80159c1652ec637dd733d324dfc391af93a

const filteredData = computed(() => {
  if (filter.value) {
    return props.data.filter(item =>
      filterOn.value.some(key =>
        String(item[key]).toLowerCase().includes(filter.value.toLowerCase())
      )
    );
  }
  return props.data;
});

// Watchers
watch(() => props.modal, (newVal) => {
  localModal.value = newVal;
});

// Lifecycle hooks
onMounted(() => {
  totalRows.value = props.data.length;
});

// Methods
const changerStatut = async (index) => {
  const user = props.data[index];

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

const showDetailsModal = async (id, data, typeForm) => {
  
  const uuid = data[id].uuid
  detailModal.value = true
  loadingDetail.value = true;
  try {
    const response = await apiClient.get(`/user/${uuid}`, {
      headers: { 
        'Authorization': `Bearer ${authStore.token}`,  // Utilise `this.token` si `this` est disponible
      }
    });

    if (!response.data.error) {
      detailUser.value = response.data.data; 
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  }finally{
    loadingDetail.value = false; 
  }
};

// Méthode pour émettre l'événement
const handleEdit = (index, data) => {
  if(data[index]){
    emit('data-selected', { uuid: data[index].uuid});
  }else{
    alert("error")
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
            <BModal @hide="hideModal" v-model="detailModal" :title="`Détail ${capitalize(typeForme)}`" hide-footer>
                <!-- <TableauDetail :dataUser="dataDetail" /> -->

              <div v-if="loadingDetail" class="loading-ellipses">
                <span class="dot font-10">.</span>
                <span class="dot">.</span>
                <span class="dot">.</span>
              </div>

              <div v-if="detailUser" class="detail-container">
  <div class="row align-items-center mb-3">
    <div class="col-md-4 text-center">
      <img 
        :src="`data:${detailUser.imageType};base64,${detailUser.image}`"  
        alt="Photo" 
        class="user-image"
      >
    </div>
    <div class="col-md-8">
      <h4 class="user-name">{{ detailUser.civilite }} {{ detailUser.nom }} {{ detailUser.prenom }}</h4>
      <div class="mb-2">
        <span class="badge badge-role">
          <i class="fas fa-user-tie"></i> EMPLOYÉ
        </span>
      </div>
      <BBadge :variant="detailUser.statut ? 'success' : 'danger'" class="status-badge">
        {{ detailUser.statut ? 'Activé' : 'Désactivé' }}
      </BBadge>
    </div>
  </div>

  <div class="separator"></div>

  <div class="row">
    <div class="col-md-6 info-item">
      <i class="fas fa-mobile-alt"></i> <strong>Mobile 1:</strong> {{ detailUser.telephone1 }}
    </div>
    <div class="col-md-6 info-item">
      <i class="fas fa-mobile-alt"></i> <strong>Mobile 2:</strong> {{ detailUser.telephone2 }}
    </div>
    <div class="col-md-12 info-item">
      <i class="fas fa-envelope"></i> <strong>Email:</strong> {{ detailUser.email }}
    </div>
  </div>

  <div class="separator"></div>

  <div class="row">
    <div class="col-md-6 info-item">
      <i class="fas fa-building"></i> <strong>Département:</strong> {{ detailUser.visite ? detailUser.visite.departement.libelle : "" }}
    </div>
    <div class="col-md-6 info-item">
      <i class="fas fa-briefcase"></i> <strong>Service:</strong> {{detailUser.visite ? detailUser.visite.service.libelle : "" }}
    </div>
  </div>

  <div class="separator"></div>

  <div class="row">
    <div class="col-md-6 info-item">
      <i class="fas fa-qrcode"></i> <strong>Code Visite:</strong> {{detailUser.visite ?  detailUser.visite.code_visite : "" }}
    </div>
    <div class="col-md-6 info-item">
      <i class="fas fa-id-card"></i> <strong>Matricule:</strong> {{detailUser.visite ?  detailUser.visite.matricule : "" }}
    </div>
  </div>
</div>

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
<<<<<<< HEAD
                  <!-- <span v-if="row.item.statut" class="badge rounded-pill text-bg-success">activé</span>
                  <span v-if="!row.item.statut" class="badge rounded-pill text-bg-danger">Désactivé</span> -->
                  <BFormCheckbox v-model="row.item.statut" class="custom-switch" :checked="row.item.statut === 1" switch></BFormCheckbox>
=======
                  <BFormCheckbox 
                    v-model="row.item.statut" 
                    class="custom-switch" 
                    switch
                    :value="1" 
                    :unchecked-value="0"
                    @change="changerStatut(row.index)"
                  >
                  </BFormCheckbox>
>>>>>>> 1711b80159c1652ec637dd733d324dfc391af93a
                </template>

                <template #cell(Actions)="row">
                    <div class="d-flex gap-1">
                        <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="mr-1 text-primary d-flex justify-content-center align-items-center" @click="handleEdit(row.index, data)">
                            <i class="fas fa-edit" ></i>
                        </BButton>
                        <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="px-2 text-danger d-flex justify-content-center align-items-center" @click="confirmDelete(row.item.Code)">
                          <i class="uil uil-trash-alt font-size-15"></i>
                        </BButton>
                        <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="d-flex justify-content-center align-items-center" @click="showDetailsModal(row.index, data, typeForme)">
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
<<<<<<< HEAD
=======
</style>
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
<style scoped>
.detail-container {
  background: #f8f9fa; /* Gris clair */
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.user-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #3498db;
}

.user-name {
  font-weight: bold;
  font-size: 1.5rem;
}

.badge-role {
  background: #6c757d;
  padding: 8px 12px;
  font-size: 0.9rem;
  border-radius: 10px;
  color: white;
}

.status-badge {
  font-size: 0.9rem;
  padding: 6px 10px;
}

.info-item {
  margin-bottom: 10px;
  font-size: 1rem;
}

.info-item i {
  color: #3498db;
  margin-right: 6px;
}

.separator {
  border-top: 2px dashed #ddd;
  margin: 15px 0;
}
>>>>>>> 1711b80159c1652ec637dd733d324dfc391af93a
</style>