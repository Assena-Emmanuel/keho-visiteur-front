<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  setup() {
    const formData = {
      libelleDepartement: "",
      codeDepartement: ""
    };

    const v$ = useVuelidate();

    return {
      v$,
      formData
    };
  },
  data() {
    return {
      title: "Liste des Profils",
      modal: false,
      isDetailMode: false,
      isEditMode: false, // Mode de modification ou ajout
      selectedIndex: null, // Index de l'élément sélectionné pour la modification
      data: [
        {
          "Code profil": "ADMIN",
          Libelle: "ADMINISTRATEUR",
          "Ajouté le": "2024-09-30",
          Description: "Description 1"
        },
        {
          "Code profil": "EMPLO",
          Libelle: "EMPLOYE",
          "Ajouté le": "2024-10-01",
          Description: "Description 2"
        },
        {
          "Code profil": "ASSIS",
          Libelle: "ASSISTANTE",
          "Ajouté le": "2024-10-05",
          Description: "Description 3"
        }
      ],
      fields: [
        {
          key: "Code profil"
        },
        {
          key: "Libelle"
        },
        {
          key: "Ajouté le"
        },
        {
          key: "Actions"
        }
      ]
    };
  },
  props: {
    typeForme: {
      type: String,
      required: false
    }
  },
  validations() {
    return {
      formData: {
        libelleDepartement: { required },
        codeDepartement: { required }
      }
    };
  },
  methods: {
  openModal(isEditMode, data) {
    this.isDetailMode = false;
    this.isEditMode = isEditMode;
    this.modal = true;
    this.formData = { ...data };  // Cloner les données pour éviter les modifications directes
  },
  openModalDetail(isDetailMode, data) {
    this.isEditMode = false;
    this.isDetailMode = isDetailMode;
    this.modal = true;
    this.formData = { ...data };
  },
  openAddModal() {
    this.modal = true;
    this.isEditMode = false;
    this.isDetailMode = false;
    this.formData = {
      libelleDepartement: "",
      codeDepartement: ""
    };  // Réinitialiser le formulaire
  }
}

};
</script>

<template>
    <div>
    <div class="d-flex justify-content-between">
        <div class="mb-0">Gestion des Profils</div>
        <BButton variant="primary" @click="openAddModal" style="width: 100px;" class="btn-sm mb-3"> <strong>Créer</strong>  </BButton>
        <FormsFormProfil 
            :modelValue="modal"
            @update:modelValue="modal = $event"
            :isEditMode="isEditMode"
            :isDetailMode="isDetailMode"
            :formData="formData"
        />

    </div>
    

    <Tableau 
        :fields="fields" 
        :data="data" 
        :title="title" 
        :show-addbtn="true" 
        :typeForme="'profil'" 
        @edit="openModal(true, $event)"
        @detail="openModalDetail(true, $event)"
    />
</div>
</template>