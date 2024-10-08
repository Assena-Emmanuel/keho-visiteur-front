<script>
import { tableData } from "~/components/tableau/utils.js";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
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
      submitted: false,
      tableData,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      libelleDepartement: "",
      libelleService: "",
      codeDepartement: "",
      codeService: "",
      
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
    },
  props: {
    fields: Array,
    title: String,
    showAddbtn: Boolean,
    typeForme: String,
    data: Array,
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
    onSaveDepartement() {
      this.submitted = true;
      this.v$.$touch();
      if (this.v$.libelleDepartement.$error || this.v$.codeDepartement.$error) {
        return;
      }
    },
    onSaveService() {
      this.submitted = true;
      this.v$.$touch();
      if (this.v$.libelleService.$error || this.v$.codeService.$error) {
        return;
      }
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    resetForm() {
      // Reset all form fields and validation state
      this.libelleDepartement = '';
      this.codeDepartement = '';
      this.libelleService= "";
      this.codeService= ""
      this.submitted = false;
      // Reset validation (if using Vuelidate or similar)
      if (this.$v) {
        this.$v.$reset();
      }
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
            <div class="d-flex justify-content-between">
              <BCardTitle>{{title}}</BCardTitle>
                <BButton variant="primary" class="waves-effect waves-light btn-sm" v-b-modal.modal-sm>
                  <strong>+</strong> Ajouter
                </BButton>
            </div>
            
            <BModal @hide="resetForm" v-if="typeForme=='departement'" id="modal-sm" size="sm" title="Création du département " title-class="font-18" hide-footer>
                <BForm class="form-vertical" role="form">
                    <div class="mb-3">
                      <label for="departement" style="font-size: 12px;">Libellé</label>
                      <input 
                        v-model="libelleDepartement" 
                        type="text" class="form-control form-control-sm" 
                        id="departement" 
                        placeholder="" 
                        :class="{
                        'is-invalid': submitted && v$.libelleDepartement.$error,
                        'border border-danger': submitted && v$.libelleDepartement.$error,
                        'border border-dark': !(submitted && v$.libelleDepartement.$error)
                        }"
                      />
                      <div v-if="submitted && v$.libelleDepartement.$error" class="invalid-feedback">
                          <span v-if="v$.libelleDepartement.required.$invalid" class="font-size-12">champ obligatoire
                          </span>
                        </div>
                    </div>

                    <div class="mb-3">
                      <label for="code" style="font-size: 12px;">Code </label>
                      <div>
                        <input 
                          v-model="codeDepartement" 
                          id="code" 
                          class="form-control form-control-sm"  
                          type="text"
                          :class="{
                          'is-invalid': submitted && v$.codeDepartement.$error,
                          'border border-danger': submitted && v$.codeDepartement.$error,
                          'border border-dark': !(submitted && v$.codeDepartement.$error)
                        }">
                        <div v-if="submitted && v$.codeDepartement.$error" class="invalid-feedback">
                          <span v-if="v$.codeDepartement.required.$invalid" class="font-size-12">champ obligatoire
                          </span>
                        </div>
                      </div>

                    </div>

                    <div class="mt-4 ">
                      <BButton @click="onSaveDepartement" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
                      Enregistrer
                      </BButton>
                    </div>
                </BForm>

            </BModal>
            <BModal v-if="typeForme=='service'" id="modal-sm" size="sm" title="Création du Service" title-class="font-18" hide-footer>
                <BForm>
                  <div class="mb-3">
                    <label for="service" style="font-size: 12px;">Libellé</label>
                    <input 
                      v-model="libelleService" 
                      type="text" 
                      class="form-control form-control-sm" 
                      id="departement" 
                      :class="{
                        'is-invalid': submitted && v$.libelleService.$error,
                        'border border-danger': submitted && v$.libelleService.$error,
                        'border border-dark': !(submitted && v$.libelleService.$error)
                        
                        }" 
                    />
                    <div v-if="submitted && v$.libelleService.$error" class="invalid-feedback">
                      <span v-if="v$.libelleService.required.$invalid" class="font-size-12">champ obligatoire
                      </span>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="code" style="font-size: 12px;">Code</label>
                    <div>
                      <input 
                        v-model="codeService" 
                        id="code" 
                        class="form-control form-control-sm" 
                        type="text" 
                        :class="{
                        'is-invalid': submitted && v$.codeService.$error,
                        'border border-danger': submitted && v$.codeService.$error,
                        'border border-dark': !(submitted && v$.codeService.$error)
                        }">
                      <div v-if="submitted && v$.codeService.$error" class="invalid-feedback">
                        <span v-if="v$.codeService.required.$invalid" class="font-size-12">champ obligatoire
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="mt-4 ">
                    <BButton @click="onSaveService" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
                      Enregistrer
                    </BButton>
                  </div>
                </BForm>
            </BModal>

            <BRow class="mt-4">
              <BCol sm="12" md="6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Afficher&nbsp;
                    <BFormSelect v-model="perPage" size="sm" :options="pageOptions"></BFormSelect>&nbsp;
                  </label>
                  
                </div>
              </BCol>
              <BCol sm="12" md="6">
                <div id="tickets-table_filter" class="dataTables_filter text-md-end">
                  <label class="d-inline-flex align-items-center">
                    Recherche
                      <BFormInput v-model="filter" type="search" class="form-control border border-black form-control-sm"></BFormInput>

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
                  <div class="d-flex gap-3">
                      <BButton variant="white" size="sm" class="mr-1" @click="editItem(row.item)">
                          <i class="fas fa-edit"></i>
                      </BButton>
                      <BButton variant="white" size="sm" class="text-danger" @click="deleteItem(row.item.Code)">
                          <i class="fas fa-trash"></i>
                      </BButton>
                  </div>
              </template>
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
