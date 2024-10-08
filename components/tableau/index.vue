<script>
import { tableData } from "~/components/tableau/utils.js";

/**
 * Advanced-table component
 */
export default {
  data() {
    return {
      tableData,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      
    };
  },
  props: {
    fields: Array,
    title: String,
    showAddbtn: Boolean,
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
  methods: {
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>

<template>
  <div>
    <BRow>
      <BCol cols="12">
        <BCard no-body>
          <BCardBody>
            <BCardTitle>{{title}}</BCardTitle>
            <BButton v-if="showAddbtn"> <strong>+</strong> Ajouter</BButton>
            <BRow class="mt-4">
              <BCol sm="12" md="6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <BFormSelect v-model="perPage" size="sm" :options="pageOptions"></BFormSelect>&nbsp;entries
                  </label>
                  
                </div>
              </BCol>
              <BCol sm="12" md="6">
                <div id="tickets-table_filter" class="dataTables_filter text-md-end">
                  <label class="d-inline-flex align-items-center">
                    Search:
                      <BFormInput v-model="filter" type="search" class="form-control border border-black form-control-sm"></BFormInput>

                  </label>
                </div>
              </BCol>
            </BRow>
            <div class="table-responsive mb-0">
              <BTable :items="tableData" 
                  :fields="fields" 
                  responsive="sm" 
                  :per-page="perPage" 
                  :current-page="currentPage" 
                  v-model:sort-by.sync="sortBy" 
                  v-model:sort-desc.sync="sortDesc" 
                  :filter="filter" 
                  :filter-included-fields="filterOn" 
                  @filtered="onFiltered"
              >
              
              </BTable>
            </div>
            <BRow>
              <BCol>
                <div class="dataTables_paginate paging_simple_numbers float-end">
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
