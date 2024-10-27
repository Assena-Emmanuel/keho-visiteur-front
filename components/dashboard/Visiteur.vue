<template>
    <DashboardCommonStat />
    
    <div class="mb-2"><span>Visites enregistrées</span></div>
    <div>
      <!-- Tableau des visiteurs -->
      <BRow>
        <BCol cols="12">
          <BCard no-body>
            <BCardBody>
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
                <BTr>
                  <BTh v-for="(field, index) in fields" :key="field.key" :class="index === 0 ? 'sticky-column' : ''">
                    {{ field.key }}
                  </BTh>
                </BTr>
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
        dateDebut: '',
        dateFin: '',
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
            {key: "Actions"},
        ],
        title: null,
        data: [
          {
              Date: "2024-10-20",
              "Nom & Prénoms": "Dupont Jean",
              CNI: "123456789",
              Société: "Société A",
              Employé: "Oui",
              Visite: "Non",
              "H entrée": "08:30",
              Statut: "Actif",
              "H statut": "09:00",
              "H Sortie": "17:00",
              Ecart: "0h30",
          },
          {
              Date: "2024-10-21",
              "Nom & Prénoms": "Martin Claire",
              CNI: "987654321",
              Société: "Société B",
              Employé: "Non",
              Visite: "Oui",
              "H entrée": "09:00",
              Statut: "En attente",
              "H statut": "10:00",
              "H Sortie": "15:00",
              Ecart: "1h00",
          },
          {
              Date: "2024-10-22",
              "Nom & Prénoms": "Lefèvre Sophie",
              CNI: "456789123",
              Société: "Société C",
              Employé: "Oui",
              Visite: "Non",
              "H entrée": "08:00",
              Statut: "Actif",
              "H statut": "08:30",
              "H Sortie": "16:30",
              Ecart: "0h00",
          }
        ],
    };
  },

    methods: {
        onFiltered(filteredItems) {
          // Update totalRows and reset to first page after filtering
          this.totalRows = filteredItems.length;
          this.currentPage = 1;
        },

        handleEdit(index, data) {
          alert(index)
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

    },
    computed: {
    /**
     * Dynamically generate filterOn based on fields
     */
    filterOn() {
      // Return an array of keys from fields
      return this.fields.map(field => field.key);
    },

    /**
     * Total no. of records
     */
    rows() {
      return this.filteredData.length;
    },

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
    this.totalRows = this.data.length;
  },
}
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
</style>