<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default{
    setup() {
        return { v$: useVuelidate() };
    },
    data(){
        return{
        title: 'Liste des Départements',
        modal: false,
        formData: {},
        isEditMode: false,  // Mode de modification ou ajout
        selectedIndex: null,  // Index de l'élément sélectionné pour la modification
        data: [
            {
                Code: "DPT001",
                Libelle: "Informatique",
                "Ajouté le": "2024-09-30",
            },
            {
                Code: "DPT002",
                Libelle: "Ressources Humaines",
                "Ajouté le": "2024-10-01",
            },
            {
                Code: "DPT003",
                Libelle: "Marketing",
                "Ajouté le": "2024-10-05",
            }
        ],
        fields: [
            {key: "Code"},
            {key: "Libelle" },
            {key: "Ajouté le"},
            {key: "Actions"},
        ]
    }
    },
    props:{
            typeForme: String,
        },

    validations: {
        libelleDepartement: {
            required,
        },
        codeDepartement: {
            required,
        },
    },
    methods: {
        openModal(isEditMode, data) {
            this.isEditMode = isEditMode;
            this.modal = true; 
            this.formData = data
        },

        openAddModal(){
            this.modal = !this.modal
            this.isEditMode = false
        }

    }
    
}
</script>
<template>
    <div>
    <div class="d-flex justify-content-between">
        <div class="mb-0">Gestion des Départements</div>
        <BButton variant="primary" @click="openAddModal" style="width: 100px;" class="btn-sm mb-3"> <strong>Créer</strong>  </BButton>
        <FormsFormDepartement 
            :modelValue="modal"
            @update:modelValue="modal = $event"
            :isEditMode="isEditMode"
            :formData="formData" 
        />

    </div>
    

    <Tableau 
        :fields="fields" 
        :data="data" 
        :title="title" 
        :show-addbtn="true" 
        :typeForme="'departement'" 
        @edit="openModal(true, $event)"
    />
</div>
</template>