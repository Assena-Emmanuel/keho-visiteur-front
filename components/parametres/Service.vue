<script>
import { useVuelidate } from "@vuelidate/core";
    export default{
        setup() {
            return { v$: useVuelidate() };
        },
        data(){
            return{
            title: 'Liste des Services',
            isEditMode: false,
            dataUpdate: null,
            modal: false,
            data: [
                { Code: 'DEP001', Libelle: 'Informatique', Département: 'Technologie', 'Ajouté le': '2024-01-10', Actions: 'Modifier/Supprimer' },
                { Code: 'DEP002', Libelle: 'Ressources Humaines', Département: 'Administration', 'Ajouté le': '2024-02-15', Actions: 'Modifier/Supprimer' },
                { Code: 'DEP003', Libelle: 'Marketing', Département: 'Commercial', 'Ajouté le': '2024-03-22', Actions: 'Modifier/Supprimer' },
                { Code: 'DEP004', Libelle: 'Comptabilité', Département: 'Finance', 'Ajouté le': '2024-04-05', Actions: 'Modifier/Supprimer' },
                { Code: 'DEP005', Libelle: 'Développement', Département: 'Technologie', 'Ajouté le': '2024-05-18', Actions: 'Modifier/Supprimer' }
            ],
            fields: [
                {
                key: "Code",
                },
                {
                key: "Libelle",

                },{
                key: "Département",

                },
                {
                key: "Ajouté le",

                },
                {
                key: "Actions",

                },
            ]
            }
        },
        mounted() {
        },
        props:{
            typeForme: String,
        },
        methods:{
            openModal(isEditMode, data) {
            this.isEditMode = isEditMode;
            this.dataUpdate = data;
            this.modal = true;  // Ouvre la modale
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
            <div class="mb-0">Gestion des Services</div>
            <BButton variant="primary" @click="openAddModal" class="btn-sm mb-3" style="width: 6%;"> <strong>Créer
            </strong> </BButton>
            <FormsFormService 
                :modelValue="modal"
                @update:modelValue="modal = $event"
                :isEditMode="isEditMode"
                :dataUpdate="dataUpdate" 
            />
        </div>

        <Tableau 
            :fields="fields" 
            :data="data" 
            :title="title" 
            :show-addbtn="true" 
            :typeForme=typeForme 
            @edit="openModal(true, $event.data)"
        />
    </div>
</template>