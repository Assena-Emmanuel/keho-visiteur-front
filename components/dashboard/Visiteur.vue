<template>
    <DashboardCommonStat />
    <div class="d-flex justify-content-end gap-5 mb-3">
        <button 
                class="btn largeur" 
                :class="isActive === 'Jour' ? 'btn-primary' : 'btn-inactive'" 
                @click="setActive('Jour')">
                Jour
            </button>
            <button 
                class="btn largeur" 
                :class="isActive === 'Semaine' ? 'btn-primary' : 'btn-inactive'" 
                @click="setActive('Semaine')">
                Semaine
            </button>
            <button 
                class="btn largeur" 
                :class="isActive === 'Mois' ? 'btn-primary' : 'btn-inactive'" 
                @click="setActive('Mois')">
                Mois
            </button>
            <button 
                class="btn largeur" 
                :class="isActive === 'Année' ? 'btn-primary' : 'btn-inactive'" 
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
            <BRow class="mb-3">
              <BCol sm="12" md="6">
                <div class="">
                    <span>Visites enregistrées</span>
                </div>
              </BCol>
              <BCol sm="12" md="3">
                <BFormSelect v-model="visiteurSelectionner" class="border border-secondary":options="listVisiteur" size="sm" />
              </BCol>
              <BCol sm="12" md="3">
                <div class="input-group border border-secondary rounded-1">
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
        isActive: 'Jour' ,
        visiteurSelectionner: null,
        listVisiteur : [
        {value: null, text: 'Liste Visiteurs'},
        {value: '1', text: 'AKA ANDRE'},
        
        ],

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
}
.btn-inactive {
    border: 1px solid gray; /* Bordure grise */
    background-color: white; /* Fond blanc */
    color: gray; /* Couleur du texte */
}
</style>