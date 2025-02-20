<template>
  <DashboardCommonStat />
  

  <!-- Modal détail -->
  <BModal v-model="detailModal" hide-footer title="Détails des Visites">
    
    <div v-for="item in paginatedData" :key="item['Code visite']">
      <div class="text-center"><h4>M. {{ item['Nom & Prénoms'] }}</h4>
        <span v-if="item.Delegué" class="border border-primary rounded px-2 text-primary">délégué</span>
        <span class="border border-success rounded px-2 ms-2">Statut visite: <span class="text-success">Terminé</span></span>
        <span class="border border-primary rounded px-2 ms-2 text-primary">Date: <span>{{ item.Date }}</span></span>
      </div>
      <hr class="text-secondary">
      <div class="row">
        <div class="col col-md-6">
          <p><strong>Téléphone:</strong> {{ item.Telephone }}</p>
        </div>
        <div class="col col-md-6">
          <p><strong>Société:</strong> {{ item.Société }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col col-md-6">
          <p><strong>E-mail:</strong> {{ item.Email }}</p>
        </div>
        <div class="col col-md-6">
          <p><strong>Code visiteur:</strong> {{ item['Code visiteur'] }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col col-md-6">
          <p><strong>Type pièce:</strong> {{ item.TypePiece }}</p>
        </div>
        <div class="col col-md-6">
          <p><strong>Num pièce:</strong> {{ item.CNI }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col col-md-6">
          <p><strong>Employé:</strong> {{ item.Employé }}</p>
        </div>
        <div class="col col-md-6">
          <p><strong>Code:</strong> {{ item["Code visite"] }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col col-md-6">
          <p><strong>Heure d'entrée:</strong> {{ item['H entrée'] }}</p>
        </div>
        <div class="col col-md-6">
          <p><strong>Heure de Sortie:</strong> {{ item["H Sortie"] }}</p>
        </div>
      </div>
      <div class="bg-secondary text-center text-light">En délégation</div>
      <hr />
    </div>
    <div class="d-flex justify-content-end">
      <BPagination
      v-model="page"
      :total-rows="data.length"
      :per-page="itemsPerPage"
      aria-controls="modal-pagination"
    ></BPagination>
    </div>
    
  </BModal>



  <div class="mb-2"><span>Visites enregistrées</span></div>
  <div>
    <!-- Tableau des visiteurs -->
    <BRow>
      <BCol cols="12">
        <BCard style="min-height: 5em;">
          <!-- <div v-if="loading" class="loading-ellipses">
            <span class="dot text-success">.</span>
            <span class="dot text-primary">.</span>
            <span class="dot text-danger">.</span>
          </div> -->
          <!-- <scale-loader v-if="loading" :loading="loading" color="#FFF" :height="height" :width="width"></scale-loader> -->
          <pulse-loader  v-if="!loading" :loading="loading" :color="color" :size="size" />
          <BCardBody v-if="!loading">
            <BRow class="mb-3">
              <BCol sm="12" md="2">
                Debut
                <BFormInput type="datetime-local" v-model="dateDebut" class="border border-secondary":options="listVisiteur" size="sm" />
              </BCol>
              <BCol sm="12" md="2">
                Fin
                <BFormInput type="datetime-local" v-model="dateFin" class="border border-secondary":options="listVisiteur" size="sm" />
              </BCol>
              <BCol sm="12" md="5">
                <BFormSelect v-model="visiteurSelectionner" class="mt-4 border border-secondary":options="listVisiteur" size="sm" />
              </BCol>
              <BCol sm="12" md="3">
                <div class="input-group mt-4 border border-secondary rounded-1">
                    <span class="input-group-text">
                        <i class="fas fa-search font-size-10"></i>
                    </span>
                    <BFormInput v-model="filter" type="search" id="input-small" size="sm"  placeholder="Rechercher..." />
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
              :
                <!-- <template #cell(H Sortie)="row">
                  <span v-if="!row.item['H Sortie']" class="badge rounded-pill text-bg-danger">Désactivé</span>
                </template> -->

                <template #cell(Actions)="row">
                    <div class="d-flex gap-1">
                        
                        <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="d-flex text-primary justify-content-center align-items-center" @click="showDetailsModal">
                          <i class="fas fa-eye"></i>
                        </BButton>
                        <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="mr-1 fw-bold text-warning d-flex justify-content-center align-items-center" @click="handleEdit(row.index, data)" v-b-tooltip.hover.bottom="'rejeter'">
                          <i class="uil uil-ban font-size-15 annuler"></i>
                        </BButton>
                        <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="px-2 text-danger d-flex justify-content-center align-items-center" @click="confirmDelete(row.item)">
                          <i class="uil uil-trash-alt font-size-15"></i>
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
                    <BCol sm="12" md="6" class="">
                        <div id="tickets-table_length" class="dataTables_length">
                            <label class="d-inline-flex align-items-center">
                            Afficher&nbsp;
                            <BFormSelect class="border border-secondary" v-model="perPage" size="sm" :options="pageOptions"></BFormSelect>éléments&nbsp;
                            
                            </label>
                        </div>
                    </BCol>
                  </div>
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- <BPagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" /> -->
                    <BPagination
                      v-model="currentPage"
                      :total-rows="pagination.total"
                      :per-page="pagination.perPage"
                      :align="'fill'"
                      size="sm"
                      class="my-0"
                    />
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


<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth.js';
import apiClient from '../api/intercepteur';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';

// Déclaration des variables réactives
const authStore = useAuthStore();
const page = ref(1);
const itemsPerPage = ref(1);
const detailModal = ref(false);
const isActive = ref('Jour');
const dateDebut = ref('');
const dateFin = ref('');
const visiteurSelectionner = ref(null);
const listVisiteur = ref([
  { value: null, text: 'Liste Visiteurs' },
  { value: '1', text: 'AKA ANDRE' }
]);
const size = ref(10);
const totalRows = ref(1);
const currentPage = ref(1);
const perPage = ref(5);
const pageOptions = ref([5, 10, 15, 20]);
const filter = ref('');
const sortBy = ref('age');
const sortDesc = ref(false);
const pagination = ref({
  total: 0,
  perPage: 5,
  totalPages: 1
});
const fields = ref([
  { key: 'created_at', label: 'Date' },
  { key: 'visiteur', label: 'Nom & Prénoms' },
  { key: 'numero_piece', label: 'CNI' },
  { key: 'entreprise', label: 'Société' },
  { key: 'code_visiteur', label: 'Code visiteur' },
  { key: 'code_visite', label: 'Code visite' },
  { key: 'employe', label: 'Employé' },
  { key: 'lib_visite', label: 'Visite' },
  { key: 'heure_entree', label: 'H entrée' },
  { key: 'lib_statut', label: 'statut' },
  { key: 'heure_fin', label: 'H Sortie' },
  { key: 'Actions' }
]);
const data = ref([]);
const loading = ref(false);

// Computed properties
const filteredData = computed(() => {
  if (filter.value) {
    return data.value.filter(item =>
      Object.keys(item).some(key =>
        String(item[key]).toLowerCase().includes(filter.value.toLowerCase())
      )
    );
  }
  return data.value;
});

// Fonction pour récupérer les données avec la pagination
const fetchData = async (page) => {
  if (authStore.user.visite && authStore.user.visite.code_visite) {
    loading.value = true;
    try {
      const response = await apiClient.get('/fvisites/lvisite', {
        params: {
          page: page,
          limit: pagination.value.perPage,
          sort_type: 1,
          code_employe: authStore.user.visite.code_visite
        },
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        }
      });

      if (!response.data.error) {
        const dataResponse = response.data.data;
        data.value = [...dataResponse.data];

        pagination.value = {
          total: dataResponse.total,
          perPage: dataResponse.per_page,
          totalPages: dataResponse.last_page
        };
      } else {
        console.error('Erreur lors de l\'extraction des visiteurs:', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    } finally {
      loading.value = false;
    }
  } else {
    console.error('Pas de code visite');
  }
};

// Fonction qui est appelée à chaque changement de page
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  fetchData(newPage); // Charger les données pour la nouvelle page
};

// Fonction pour afficher/modifier les détails d'un visiteur
const showDetailsModal = () => {
  detailModal.value = !detailModal.value;
};

// Confirmer la suppression d'un visiteur
const confirmDelete = (code) => {
  // Logique de confirmation de suppression
};

// Filter dynamically based on the field keys
const filterOn = computed(() => fields.value.map(field => field.key));



// Computed property for total number of records
const rows = computed(() => data.value.length);

// Watch for changes in currentPage
watch(currentPage, (newPage) => {
  console.log('----------------- page: ' + newPage);
  fetchData(newPage).then(() => {
    // Après que fetchData a mis à jour les données, calculer filteredData
    nextTick(() => {
      console.log('data après changement de page:', JSON.stringify(filteredData.value));
    });
  });
});

// Load data initially
onMounted(() => {
  fetchData(currentPage.value);
});
</script>


<style>
.activeVisiteur {
  background-color: #007bff; 
  color: white;
}
.largeur{
  width: 90px;
  padding: 0;
}
.btn-inactive {
  border: 1px solid gray; /* Bordure grise */
  background-color: white; /* Fond blanc */
  color: gray; /* Couleur du texte */
}

/* spinner */
.loading-ellipses {
  font-size: 40px; /* Taille augmentée */
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
/* end spinner */


</style>