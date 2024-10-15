<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";


export default{
  setup() {
    return { v$: useVuelidate() };
  },
  data(){
    return{
      libelleProfil: "",
      codeProfil: "",
      submitted: false,
      isEditMode: false,
      pageOptions: [5, 10, 15, 20],
      items: [
            { menu: 'Dashboard', voir: true, modifier: true, supprimer: false, ajouter: false },
            { menu: 'Utilisateurs', voir: true, modifier: false, supprimer: false, ajouter: true },
            { menu: 'Produits', voir: true, modifier: true, supprimer: true, ajouter: true },
            { menu: 'Commandes', voir: true, modifier: false, supprimer: false, ajouter: false },
            { menu: 'Rapports', voir: true, modifier: true, supprimer: true, ajouter: false },
            { menu: 'Paramètres', voir: false, modifier: false, supprimer: false, ajouter: false },
            { menu: 'Notifications', voir: true, modifier: true, supprimer: true, ajouter: true },
            { menu: 'Factures', voir: true, modifier: false, supprimer: true, ajouter: true },
            { menu: 'Catégories', voir: false, modifier: true, supprimer: false, ajouter: false },
            { menu: 'Logs', voir: true, modifier: false, supprimer: true, ajouter: false }
        ],

      fields: [
        { key: 'menu', label: 'Menu', sortable: true },
        { key: 'voir', label: 'Voir' },
        { key: 'modifier', label: 'Modifier' },
        { key: 'supprimer', label: 'Supprimer' },
        { key: 'ajouter', label: 'Ajouter'},
        { key: 'accepter', label: 'Accepter'},
        { key: 'rejeter', label: 'Rejeter'},
      ],
      fieldsList:[
        'menu', 'voir', 'modifier', 'supprimer', 'ajouter', 'accepter', 'rejeter'
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      filter: null,
      filterOn: ['menu']

    }
  },
  validations: {
    libelleProfil: {
      required,
    },
    codeProfil: {
      required,
    },
  },

  props: {
    modelValue: Boolean,
    isEditMode: Boolean,
    selectedIndex: Number,  // L'index de l'élément à éditer
    data: Array,
  
  },
  mounted() {
    this.totalRows = this.items.length;
  },
  methods:{
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
    },
    onCheckboxChange(item) {
      // Gérer les modifications sur les cases à cocher
      console.log('Changement des permissions :', item);
    },
    onSaveprofil() {
      this.submitted = true;
      this.v$.$touch();
      if (this.v$.libelleProfil.$error || this.v$.codeProfil.$error) {
        return;
      }
    },
    resetForm() {
      // Reset all form fields and validation state
      this.libelleProfil = '';
      this.codeProfil = '';
      this.submitted = false;
      // Reset validation (if using Vuelidate or similar)
      if (this.$v) {
        this.$v.$reset();
      }
    },

    saveMenus() {
      // Crée un tableau d'items avec les habilitations sélectionnées
      const menusWithPermissions = this.items.map(item => ({
        menu: item.menu,
        voir: item.voir,
        modifier: item.modifier,
        supprimer: item.supprimer,
        ajouter: item.ajouter
      }));
    },

    // Méthode pour gérer le changement dans les checkboxes
    onCheckboxChange(item) {
      console.log('Permissions modifiées pour:', item);
    }
  }
}
</script>
<template>
  <BModal 
      @hide="resetForm" 
      :modelValue="modelValue" 
      @update:modelValue="$emit('update:modelValue', $event)"
      size="lg"
      :title="isEditMode ? `Modifier le profil ${selectedIndex}` : 'Création du profil'" 
      title-class="font-18" 
      hide-footer
  >
  <BForm class="form-vertical" role="form">
    <div class="mb-3 fw-bold font-size-15">Création du profil</div>

    <BRow>
        <BCol md="4" sm="4">
        <div class="mb-3">
            <label for="code" style="font-size: 12px;">Code Profil <span class="fw-bool text-danger">*</span></label>
            <div class="input-group">
                <input 
                    v-model="code" 
                    type="text" 
                    class="form-control border border-secondary" 
                    id="code" 
                    placeholder="Code"
                    :class="{ 'is-invalid': submitted && v$.code.$error }" 
                />
                <div v-if="submitted && v$.code.$error" class="invalid-feedback">
                    <span v-if="v$.code.required.$invalid">Ce champ est obligatoire</span>
                </div>
            </div>
            
            </div>
        </BCol>
        <BCol md="4" sm="4">
        <div class="mb-3">
            <label for="libelle" style="font-size: 12px;">Libellé <span class="fw-bool">*</span></label>
            <div class="input-group">
                <input 
                v-model="libelle" 
                type="text" 
                class="form-control border border-secondary" 
                id="libelle" 
                placeholder="Libellé" 
                :class="{'is-invalid': submitted && v$.libelle.$error }" 
                />
                <div v-if="submitted && v$.libelle.$error" class="invalid-feedback">
                <span v-if="v$.libelle.required.$invalid">Cet champ est obligatoire
                </span>
                </div>
            </div>
            
        </div>
        </BCol>
        <BCol md="4" sm="4">
        <div class="mb-3">
            <label for="description" style="font-size: 12px;">Description</label>
            <div class="input-group">
                <input 
                    v-model="description" 
                    type="text"
                    class="form-control border border-secondary" 
                    id="description" 
                    placeholder="MDescription"
                    :class="{ 'is-invalid': submitted && v$.description.$error }" 
                />
                <div v-if="submitted && v$.description.$error" class="invalid-feedback">
                <span v-if="v$.description.required.$invalid">Ce champ est obligatoire
                </span>
                </div>
            </div>
            
        </div>
        </BCol>
    </BRow>

    <!-- Tableau Habilitation -->
    <div class="border border-secondary p-2 rounded-3">
    <BRow class="">
        <BCol sm="12" md="6" class="">
            <div id="tickets-table_length" class="dataTables_length">
            <label class="d-inline-flex align-items-center" style="font-size: 12px;">
                Afficher&nbsp;
                <BFormSelect v-model="perPage" size="sm" :options="pageOptions"></BFormSelect>éléments&nbsp;
            </label>
            </div>
        </BCol>
        <BCol sm="12" md="6">
        <div id="tickets-table_filter" class="dataTables_filter text-md-end">
            <label class="d-inline-flex align-items-center">
            <BFormInput placeholder="Rechercher" v-model="filter" type="search" class="form-control border border-black form-control-sm"></BFormInput>
            </label>
        </div>
        </BCol>
    </BRow>
    <div class="table-responsive mb-0 my-3">
    <BTable
      :items="items"
      :fields="fields"
      responsive="sm"
      :per-page="perPage"
      :current-page="currentPage"
      @filtered="onFiltered"
    >

        <!-- Itération à partir du deuxième élément dans fields -->
        <template #cell([field.key])="row" v-for="(field, index) in fields.slice(1)" :key="index" >
            <!-- Création dynamique des checkboxes pour chaque champ -->
            <BFormCheckbox

            >
            </BFormCheckbox>
        </template>

        <!-- <template #cell(modifier)="row">
            <BFormCheckbox class="border border-secondary" v-model="row.item.modifier" @change="onCheckboxChange(row.item)">
            </BFormCheckbox>
        </template>

        <template #cell(supprimer)="row">
            <BFormCheckbox class="border border-secondary" v-model="row.item.supprimer" @change="onCheckboxChange(row.item)">
            </BFormCheckbox>
        </template> -->
        <template #cell(accepter)="row">
            <BFormCheckbox class="border border-secondary" v-model="row.item.ajouter" @change="onCheckboxChange(row.item)">
            </BFormCheckbox>
        </template>

    </BTable>
    <!-- Pagination placée après le tableau -->
    <BRow>
        <BCol>
        <div class="dataTables_paginate paging_simple_numbers d-flex justify-content-between pb-2" style="font-size: 12px;">
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
    </div>
    </div>

    <div class="mt-4 d-flex justify-content-center">
      <BButton v-if="!isEditMode" @click="onSaveprofil" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        Enregistrer
      </BButton>
      <BButton v-if="isEditMode" @click="onUpdateprofil" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        Modifier
      </BButton>
    </div>
  </BForm>
</BModal>
</template>