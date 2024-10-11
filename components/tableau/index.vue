<script>
import { tableData } from "~/components/tableau/utils.js";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { capitalize } from "vue";
// import FormService from "../forms/FormService.vue";

/**
 * Advanced-table component
 */
export default {
  setup() {
      return { v$: useVuelidate() };
    },
  data() {
    return {
      preventableModal: false,
      submitted: false,
      titreDetail: "",
      detailModal: false,
      localModal: this.modal,
      tableData,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      libelle: "",
      code: "",
      departement: "",
      isEditMode: false,
      selectDepartement: "",
      departementService: ''
    };
  },
  validations: {
    libelleDepartement: {
        required,
      },
    libelleService: {
        required,
      },
    codeDepartement: {
        required,
      },
    codeService: {
        required,
      },
      selectDepartement: {
        required,
      },
    },
  props: {
    fields: Array,
    title: String,
    showAddbtn: Boolean,
    typeForme: String,
    data: Array,
    modal: Boolean,
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.tableData.length;
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.tableData.length;
  },
  watch: {
    modal(newVal) {
      this.localModal = newVal;  // Mettre à jour la valeur locale lorsque la prop change
    }
  },
  methods: {
    showDetailsModal(libelle, formType, code, departement){
      this.code = code
      this.libelle = libelle
      this.detailModal = true
      this.departementService = departement
    },
    handleEdit(index, data) {
        this.$emit('edit', { index, data });

      },

  
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
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


  }
};
</script>

<template>
  <div>
    <BRow>
      <BCol cols="12">
        <BCard no-body>
          <BCardBody>

            <BModal v-model="detailModal" :title="`Détail ${capitalize(typeForme)}`" hide-footer>
              <div v-if="typeForme === 'service'" class="p-4 bg-light rounded border">
                <!-- En-tête du service -->
                <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                  <div class=" h5">
                    Service : <span class="fw-bold text-primary">{{ libelle }}</span>
                  </div>
                  <div class=" h5">
                    Département : <span class="fw-bold text-primary">{{ departementService }}</span>
                  </div>
                </div>

                <!-- Titre des autres services du département -->
                <h6 class="mb-3">Autres <strong>Services</strong> du département</h6>

                <!-- Liste des autres services -->
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <strong>Développement</strong>
                    <span class="badge bg-secondary">DEP001</span>
                  </li>
                  <!-- Ajouter d'autres services ici si nécessaire -->
                </ul>
              </div>

              <div v-if="typeForme === 'departement'" class="p-4 bg-light rounded border">
                <!-- En-tête du département -->
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <div class="text-primary h5">
                    Département: <span class="fw-bold">{{ libelle }}</span>
                  </div>
                  <div class="text-primary h5">
                    Code: <span class="fw-bold">{{ code }}</span>
                  </div>
                </div>

                <!-- Titre des services -->
                <h5 class="border-bottom pb-3 mb-3">Services du département <strong>{{ libelle }}</strong></h5>

                <!-- Liste des services -->
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <strong>Informatique</strong>
                    <span class="badge bg-secondary">SEV003</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <strong>Développement</strong>
                    <span class="badge bg-secondary">SEV005</span>
                  </li>
                  <!-- Ajoutez d'autres services ici si nécessaire -->
                </ul>
              </div>

               
            </BModal>

            
            <BRow class="mt-4">
              <BCol sm="12" md="6" class="bg-info">
                <!-- <div id="tickets-table_filter" class="dataTables_filter text-md-end">
                  <label class="d-inline-flex align-items-center">
                    <BFormInput placeholder="Rechercher" v-model="filter" type="search" class="form-control border border-black form-control-sm"></BFormInput>
                  </label>
                </div> -->
              </BCol>
              <BCol sm="12" md="6">
                <div id="tickets-table_filter" class="dataTables_filter text-md-end">
                  <label class="d-inline-flex align-items-center">
                    <BFormInput placeholder="Rechercher" v-model="filter" type="search" class="form-control border border-black form-control-sm"></BFormInput>
                  </label>
                </div>
              </BCol>
            </BRow>
            <div class="table-responsive mb-0">
              <BTable :items="data" 
                  :fields="fields" 
                  responsive="sm" 
                  :per-page="perPage" 
                  :current-page="currentPage" 
                  :filter="filter" 
                  :filter-included-fields="filterOn" 
                  @filtered="onFiltered"
              >
              <template #cell(Actions)="row">
                  <div class="d-flex gap-2">
                      <BButton variant="white" size="sm" class="mr-1 text-primary" @click="handleEdit(row.index, data[row.index])">
                          <i class="fas fa-edit" ></i>
                      </BButton>
                      <BButton variant="white" size="sm" class="px-2 text-danger" @click="confirmDelete(row.item.Code)">
                        <i class="uil uil-trash-alt font-size-18"></i>
                      </BButton>
                      <BButton variant="white" size="sm" @click="showDetailsModal(row.item.Libelle, typeForme, row.item.Code, row.item.Département)">
                        <i class="fas fa-eye"></i>
                    </BButton>
                  </div>
              </template>
              </BTable>
            </div>
            <BRow>
              <BCol>
                <div class="dataTables_paginate paging_simple_numbers d-flex justify-content-between">
                  <div id="tickets-table_length" class="dataTables_length">
                    <label class="d-inline-flex align-items-center">
                      Afficher&nbsp;
                      <BFormSelect v-model="perPage" size="sm" :options="pageOptions"></BFormSelect>éléments&nbsp;
                      
                    </label>
                  </div>
                  <ul class="pagination pagination-rounded mb-0">
                    <BPagination v-model="currentPage" :total-rows="rows" :per-page="perPage" />
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
<style>
.custom-header {
  background-color: #4caf50; /* Couleur de fond verte */
  color: white; /* Couleur du texte */
}

</style>
