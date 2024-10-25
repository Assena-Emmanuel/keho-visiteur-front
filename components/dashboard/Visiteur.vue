<template>
    <DashboardCommonStat />
    <div class="d-flex justify-content-end gap-5 mb-3">
        <button 
            class="btn largeur rounded-0" 
            :class="isActive === 'Jour' ? 'btn-primary' : 'btn-outline-secondary'" 
            @click="setActive('Jour')">
            Jour
        </button>
        <button 
            class="btn largeur rounded-0" 
            :class="isActive === 'Semaine' ? 'btn-primary' : 'btn-outline-secondary'" 
            @click="setActive('Semaine')">
            Semaine
        </button>
        <button 
            class="btn largeur rounded-0" 
            :class="isActive === 'Mois' ? 'btn-primary' : 'btn-outline-secondary'" 
            @click="setActive('Mois')">
            Mois
        </button>
        <button 
            class="btn largeur rounded-0" 
            :class="isActive === 'Année' ? 'btn-primary' : 'btn-outline-secondary'" 
            @click="setActive('Année')">
            Année
        </button>
    </div>
    <div>

    <!-- Tableau des visiteurs -->
    <BRow>
      <BCol cols="12">
        <BCard no-body>
          <BCardBody>
            <BCardTitle>{{ title }}</BCardTitle>

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
                <template #cell(Statut)="row">
                  <span v-if="row.item.Statut" class="badge rounded-pill text-bg-success">activé</span>
                  <span v-if="!row.item.Statut" class="badge rounded-pill text-bg-danger">Désactivé</span>
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
<script>
export default {
    data() {
        return {
       totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20],
        filter: "", 
        sortBy: "age",
        sortDesc: false,
        
        fields: [
            {key: "Date"},
            {key: "Nom & Prénoms"},
            {key: "CNI"},
            {key: "Société"},
            {key: "Employé"},
            {key: "Visite"},
            {key: "H entrée"},
            {key: "Statut"},
            {key: "H statut"},
            {key: "H Sortie"},
            {key: "Ecart"},
        ],
        title: null,
        data: [],
    };
  },

    methods: {
        setActive(period) {
            this.isActive = period; // Met à jour la période active
        }
    }
}
</script>

<style>
.active {
    background-color: #007bff; 
    color: white;
}
.largeur{
    width: 90px;
    padding: 0;
    align-items: center;
}
</style>