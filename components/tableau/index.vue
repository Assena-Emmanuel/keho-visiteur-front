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
      preventableModal: false,
      submitted: false,
      modal: false,
      titreDetail: "",
      detailModal: false,
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
      isEditMode: false,
      selectDepartement: "",
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
    showDetailsModal(formType){
      this.detailModal = true
    },
    showModal(isEdit, formType, id) {
        this.isEditMode = isEdit; 
  
        if(formType == "departement"){
          this.libelleDepartement = this.data[id].Libelle
          this.codeDepartement = this.data[id].Code
        }
        if(formType == "service"){
          this.libelleService = this.data[id].Libelle
          this.codeService = this.data[id].Code
          this.selectDepartement = this.data[id].Département
        }
        this.modal = !this.modal;
      },

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
                <!-- <BButton v-if="typeForme=='departement' || typeForme=='service'" variant="primary" class="waves-effect waves-light btn-sm" v-b-modal.modal-sm>
                  <strong>+</strong> Ajouter
                </BButton> -->
                <BButton variant="primary" @click="modal = !modal" > <strong>+</strong> Ajouter  </BButton>
              </div>


            
              <BModal 
                @hide="resetForm" 
                v-model="modal" 
                v-if="typeForme=='departement'" size="md"
                :title="isEditMode ? 'Modifier le département' : 'Création du département'" 
                title-class="font-18" 
                hide-footer
              > 

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

                      <div class="mt-4 d-flex justify-content-center">
                        <BButton @click="onSaveDepartement" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
                        Enregistrer
                        </BButton>
                      </div>
                </BForm>
              
              </BModal>

              <BModal 
                @hide="resetForm" 
                v-model="modal" 
                v-if="typeForme=='service'" size="md"
                :title="isEditMode ? 'Modifier le Service' : 'Création du Service'"
                title-class="font-18" 
                hide-footer
              > 

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
                  <div class="mb-3">
                    <label for="selectDepartement" style="font-size: 12px">Département</label>
                    <div class="input-group">
                      <select 
                        v-model="selectDepartement" 
                        id="selectDepartement" 
                        class="form-select form-select-sm border border-black rounded-2" 
                        aria-label="Default select example" 
                        :class="{
                        'is-invalid': submitted && v$.selectDepartement.$error,
                        'border border-danger': submitted && v$.selectDepartement.$error,
                        'border border-dark': !(submitted && v$.selectDepartement.$error)
                      }">
                        <option value="" selected>Département...</option>
                        <option value="Informatique">Informatique</option>
                        <option value="RH">RH</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                      <div v-if="submitted && v$.selectDepartement.$error" class="invalid-feedback">
                        <span v-if="v$.selectDepartement.required.$invalid">champ obligatoire
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="mt-4 d-flex justify-content-center">
                    <BButton @click="onSaveService" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
                      Enregistrer
                    </BButton>
                  </div>
                </BForm>

            </BModal>
            
            <!-- Modal détail -->
            <BModal v-model="detailModal" :title="`Détail ${typeForme === 'departement' ? 'Département' : 'Service'}`" hide-footer>
              
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
                  <div class="d-flex gap-2">
                      <BButton variant="white" size="sm" class="mr-1 text-primary" @click="showModal(true, typeForme, row.index)">
                          <i class="fas fa-edit" ></i>
                      </BButton>
                      <BButton variant="white" size="sm" class="text-danger" @click="confirmDelete(row.item.Code)">
                          <i class="fas fa-trash"></i>
                      </BButton>
                      <BButton variant="white" size="sm" @click="showDetailsModal(row.item.Libelle)">
                        <i class="fas fa-eye"></i>
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
