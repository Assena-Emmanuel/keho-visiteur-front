<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import apiClient from "~/components/api/intercepteur";
import { useAuthStore } from "~/stores/auth.js";
import {useGestionStore} from "~/stores/gestion.js"

export default{
    setup() {
        const gestionStore = useGestionStore()
        return { v$: useVuelidate(), authStore: useAuthStore(), gestionStore };
    },
    data(){
        return{
        title: 'Liste des Départements',
        modal: false,
        formData: {},
        rowSelect: null,
        isEditMode: false,  // Mode de modification ou ajout
        selectedIndex: null,  // Index de l'élément sélectionné pour la modification
        data: [
        ],

        fields: [

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

    async mounted() {
        await this.departements()
    },

    methods: {
        handleDataSelected(payload){
            this.selectedRow = payload.id
            this.modal = true
            this.isEditMode = !!payload.id;
        },

        openModal(isEditMode, data) {
            this.isEditMode = isEditMode;
            this.modal = true; 
            this.formData = data
        },

        openAddModal(){
            this.modal = !this.modal
            this.isEditMode = false
        },

        async departements() {
        
            this.fields = [
                    {key: "slug"},
                    {key: "code"},
                    {key: "libelle"},
                    {key:"Actions"},
                ]

        if(this.gestionStore.departements.length === 0){

            try {
                this.isLoading = true
                const slug = "DPT"
                const response = await apiClient.get(`/categorie_by_slug/${slug}`, {
                    headers: {
                        'Authorization': `Bearer ${this.gestionStore.token}`
                    }
                });

                if (!response.data.error) {
                    this.gestionStore.setDepartements(response.data.data)
                }

            } catch (error) {
                if (error.response && error.response.status === 401) {
                console.error("Erreur 401 : Jeton invalide ou utilisateur non authentifié.");
                } else {
                console.error("Erreur lors de la récupération des departement :", error);
                }
                this.isLoading = false;
            }finally {
                this.isLoading = false; // Fin du chargement
            }
        }

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
            :isOpen="modal"
            :id="selectedRow"
            @update:isOpen="modal = $event"
            :isEditMode="isEditMode"
            @update:id="modal = $event"
        />

    </div>
    

    <Tableau 
        :fields="fields" 
        :title="title" 
        :show-addbtn="true" 
        :typeForme="'departement'" 
        :is-loading="isLoading"
        @edit="openModal(true, $event)"
        @data-selected="handleDataSelected"
    />
</div>
</template>