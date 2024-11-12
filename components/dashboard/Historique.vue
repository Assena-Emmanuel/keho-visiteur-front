<template>
    <DashboardCommonStat />
    
    <div class="mb-2 d-flex justify-content-between">
      <div>Historique des visites</div>
      <div class="d-flex gap-2">
        <BDropdown variant="primary" class="me-2">
          <template #button-content>
            <i class="fas fa-print"></i> Imprimer
          </template>
          <BDropdownItem @click="telecharger('csv')">CSV</BDropdownItem>
          <BDropdownItem @click="telecharger('csv')">EXCEL</BDropdownItem>
          <BDropdownItem @click="telecharger('csv')">PDF</BDropdownItem>
        </BDropdown>

      </div>
    </div>
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
                :
                  <template #cell(Statut)="row">
                    <span v-if="row.item.Statut" class="badge rounded-pill text-bg-success">{{ row.item.Statut }}</span>
                  </template>

                  <!-- <template #cell(Actions)="row">
                      <div class="d-flex gap-1">
                          <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="px-2 text-danger d-flex justify-content-center align-items-center" @click="confirmDelete(row.item.Code)">
                            <i class="uil uil-trash-alt font-size-15"></i>
                          </BButton>
                          <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="d-flex justify-content-center align-items-center" @click="showDetailsModal">
                            <i class="fas fa-eye"></i>
                          </BButton>
                      </div>
                  </template> -->

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
          items: [ 
          {
              Date: "2024/10/20",
              "Nom & Prénoms": "Dupont Jean",
              Delegué: true,
              TypePiece: "Carte Nationale d'Identité (CNI)",
              Telephone: "0900020319",
              Email: "dupond@gmail.com",
              CNI: "C123456789",
              Société: "Société A",
              "Code visiteur": "VTR-xxx",
              "Code visite": "017",
              Employé: "KOUADIO Konan jean",
              Visite: "RDV",
              "H entrée": "08:30",
              Statut: "Terminé",
              "H Sortie": "12:30",
          },
          {
              Date: "2024/10/10",
              Delegué: false,
              "Nom & Prénoms": "Aka André",
              TypePiece: "Carte Nationale d'Identité (CNI)",
              Telephone: "0700020310",
              Email: "aka@gmail.com",
              CNI: "C000956789",
              Société: "Société B",
              "Code visiteur": "VTR-xxx",
              "Code visite": "006",
              Employé: "Ouattara Khader",
              Visite: "RDV",
              "H entrée": "10:30",
              Statut: "en cours",
              "H Sortie": "11:38",
          }
           ],
          page: 1,
          itemsPerPage: 1,

          detailModal: false,
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
        pageOptions: [1, 2, 5, 20],
        filter: "", 
        sortBy: "age",
        sortDesc: false,
        
        fields: [
            {key: "Date"},
            {key: "Nom & Prénoms"},
            {key: "CNI"},
            {key: "Société"},
            {key: "Code visiteur"},
            {key: "Code visite"},
            {key: "Employé"},
            {key: "Visite"},
            {key: "H entrée"},
            {key: "H Sortie"},
            {key: "Statut"},

        ],
        title: null,
        data: [
          {
              Date: "2024/10/20",
              "Nom & Prénoms": "Dupont Jean",
              CNI: "C123456789",
              Société: "Société A",
              "Code visiteur": "VTR-xxx",
              "Code visite": "017",
              Employé: "KOUADIO Konan jean",
              Visite: "RDV",
              "H entrée": "08:30",
              "H Sortie": "12:30",
              Statut: "Terminé",
          },
          {
              Date: "2024/10/10",
              "Nom & Prénoms": "Aka André",
             
              CNI: "C000956789",
              Société: "Société B",
              "Code visiteur": "VTR-xxx",
              "Code visite": "006",
              Employé: "Ouattara Khader",
              Visite: "RDV",
              "H entrée": "10:30",
              "H Sortie": "11:38",
              Statut: "Terminé",
          }
        ],
    };
  },

    methods: {
        telecharger(typeFichier){
          alert(typeFichier)
        },
        onFiltered(filteredItems) {
          // Update totalRows and reset to first page after filtering
          this.totalRows = filteredItems.length;
          this.currentPage = 1;
        },

        handleEdit(index, data) {
          alert(index)
        },

        showDetailsModal(){
          this.detailModal = !this.detailModal
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
    },
    paginatedData() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end);
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
.dropdown-menu{
  width: 100px;
}
</style>