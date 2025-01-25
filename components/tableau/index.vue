<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { capitalize } from "vue";
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

  }
};
</script>


<template>
  <div>
    <BRow>
      <BCol cols="12">
        <BCard no-body>
          <BCardBody>
            <BCardTitle>{{ title }}</BCardTitle>

            <!-- Modal Détail -->
            <BModal v-model="detailModal" :title="`Détail ${capitalize(typeForme)}`" hide-footer>
                <TableauDetail :data="dataDetail" />
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
              <div v-if="isLoading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Chargement...</span>
                </div>
              </div>
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
                  <!-- <span v-if="row.item.statut" class="badge rounded-pill text-bg-success">activé</span>
                  <span v-if="!row.item.statut" class="badge rounded-pill text-bg-danger">Désactivé</span> -->
                  <BFormCheckbox v-model="row.item.statut" class="custom-switch" :checked="row.item.statut" switch></BFormCheckbox>
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
  .spinner-border {
  width: 3rem;
  height: 3rem;
}
.text-center {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>