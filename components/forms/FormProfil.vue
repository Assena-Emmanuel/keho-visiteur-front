<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      libelleProfil: "",
      codeProfil: "",
      description: "",
      submitted: false,
      isEditMode: false,
      titre: "",
      pageOptions: [5, 10, 15, 20],
      items: [
        { menu: 'Dashboard', voir: true, modifier: true, supprimer: false, ajouter: false },
        { menu: 'Utilisateurs', voir: true, modifier: false, supprimer: false, ajouter: true },
        // Other items...
      ],
      fields: [
        { key: 'menu', label: 'Menu', sortable: true },
        { key: 'voir', label: 'Voir' },
        { key: 'modifier', label: 'Modifier' },
        { key: 'supprimer', label: 'Supprimer' },
        { key: 'ajouter', label: 'Ajouter' },
        { key: 'accepter', label: 'Accepter' },
        { key: 'rejeter', label: 'Rejeter' },
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      filter: null,
      filterOn: ['menu']
    };
  },
  validations: {
    libelleProfil: {
      required,
    },
    codeProfil: {
      required,
    },
    description: {
      required,
    }
  },
  props: {
    modelValue: Boolean,
    isEditMode: Boolean,
    isDetailMode: Boolean,
    selectedIndex: Number,
    formData: Object,
  },
  mounted() {
    this.totalRows = this.items.length;
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
    },
    onSaveprofil() {
      this.submitted = true;
      this.v$.$touch();
      if (this.v$.libelleProfil.$error || this.v$.codeProfil.$error || this.v$.description.$error) {
        return;
      }
      // Handle the profile save here
    },
    resetForm() {
      this.libelleProfil = '';
      this.codeProfil = '';
      this.description = '';
      this.submitted = false;
      this.v$.$reset();
    },
    saveMenus() {
      const menusWithPermissions = this.items.map(item => ({
        menu: item.menu,
        voir: item.voir,
        modifier: item.modifier,
        supprimer: item.supprimer,
        ajouter: item.ajouter,
      }));
    },
    onCheckboxChange(item) {
      console.log('Permissions modifiées pour:', item);
    },
    getTitle() {
      if (this.isDetailMode) {
        this.titre = "Consultation du profil";
      } else if (this.isEditMode) {
        this.titre = "Modification du profil";
      } else if(!this.isDetailMode && !this.isEditMode) {
        this.titre = "Création du profil";
      }
      return this.titre
    },
    handleHide() {
      // Émettre l'événement pour informer le parent de la fermeture
      this.$emit('update:modelValue', false); // Réinitialiser la modal à fermée
      this.resetForm(); // Réinitialiser les données du formulaire
    },

  }
};
</script>

<template>
  <BModal 
      @hide="handleHide"
      :modelValue="modelValue" 
      @update:modelValue="$emit('update:modelValue', $event)"
      size="lg"
      :title="getTitle()" 
      title-class="font-18" 
      hide-footer
  >
  <template #modal-title>
      <!-- Gestion du titre selon les modes -->
      <div v-if="isEditMode">Modifier le profil</div>
      <div v-else-if="isDetailMode">Détails du profil</div>
      <div v-else>Créer un profil</div>
    </template>
  <BForm class="form-vertical" role="form">

    <BRow>
        <BCol md="4" sm="4">
        <div class="mb-3">
            <label for="code" style="font-size: 12px;">Code Profil <span class="fw-bool text-danger">*</span></label>
            <div class="input-group">
                <input 
                    v-model="codeProfil" 
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
                v-model="libelleProfil" 
                type="text" 
                class="form-control border border-secondary" 
                id="libelle" 
                placeholder="Libellé" 
                :class="{'is-invalid': submitted && v$.libelleProfil.$error }" 
                />
                <div v-if="submitted && v$.libelleProfil.$error" class="invalid-feedback">
                <span v-if="v$.libelleProfil.required.$invalid">Cet champ est obligatoire
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
                    placeholder="Description"
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

        <template #cell(voir)="row">
            <BFormCheckbox class="border border-secondary" v-model="row.item.modifier" @change="onCheckboxChange(row.item)">
            </BFormCheckbox>
        </template>

        <template #cell(supprimer)="row">
            <BFormCheckbox class="border border-secondary" v-model="row.item.supprimer" @change="onCheckboxChange(row.item)">
            </BFormCheckbox>
        </template>
        <template #cell(modifier)="row">
            <BFormCheckbox class="border border-secondary" v-model="row.item.modifier" @change="onCheckboxChange(row.item)">
            </BFormCheckbox>
        </template>

        <template #cell(ajouter)="row">
            <BFormCheckbox class="border border-secondary" v-model="row.item.ajouter" @change="onCheckboxChange(row.item)">
            </BFormCheckbox>
        </template>
        <template #cell(accepter)="row">
            <BFormCheckbox class="border border-secondary" v-model="row.item.accepter" @change="onCheckboxChange(row.item)">
            </BFormCheckbox>
        </template>
        <template #cell(rejeter)="row">
            <BFormCheckbox class="border border-secondary" v-model="row.item.rejeter" @change="onCheckboxChange(row.item)">
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

    <div v-if="!isDetailMode" class="mt-4 d-flex justify-content-center">
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