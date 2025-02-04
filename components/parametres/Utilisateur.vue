<script>
import apiClient from "~/components/api/intercepteur";
import { useAuthStore } from "~/stores/auth.js";


export default{
    setup(){
        const authStore = useAuthStore();
        const config = useRuntimeConfig(); 

        return { authStore, config };
    },
    data(){
        return{
        all_users: {},
        token: this.authStore.token,
        title: 'Liste des Utilisateurs',
        isEdit: false,
        isLoading: true,
        modal: false,
        isEditMode: false,  // Mode de modification ou ajout
        selectedIndex: null,  // Index de l'élément sélectionné pour la modification
        selectedRow: null,
        data: [
            
        ],

        fields: []
    }
    },
    async mounted() {
        await this.allUsers()
    },
    props:{
        typeForme: String,
    },

    methods: {
        handleDataSelected(payload){
            this.selectedRow = payload.uuid
            this.modal = true
            this.isEditMode = !!payload.uuid;
        },

        openAddModal(){
            this.modal = true
            this.isEditMode = false
        },

        async allUsers() {
        try {
            this.isLoading = true
            this.fields = [
                {key: "civilite"},
                {key: "nom"},
                {key: "prenom"},
                {key: "email"},
                {key: "telephone1"},
                {key: "telephone2"},
                {key: "statut"},
                {key:"Actions"},
            ]
            const response = await apiClient.get(`/user`, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
            },
            });

            if (!response.data.error) {
                this.data = response.data.data
                console.log("---------------Liste des utilisateurs récupérée :", JSON.stringify(response.data));
            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
            console.error("Erreur 401 : Jeton invalide ou utilisateur non authentifié.");
            } else {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
            }

        }finally {
            this.isLoading = false; // Fin du chargement
        }

        }
    
}


}
</script>
<template>
    <div>
    <div class="d-flex justify-content-between">
        <div class="mb-0">Gestion des Utilisateurs</div>
        <BButton variant="primary" style="width: 100px;" @click="openAddModal" class="btn-sm mb-3"> <strong>Créer</strong>  </BButton>
        <FormsFormUser 
            :isOpen="modal"
            :isEditMode="isEditMode"
            :uuid="selectedRow"
            @update:isOpen="modal = $event"
            @update:uuid="modal = $event"
            @close="selectedUserId = null"
        />
    </div>


    <Tableau 
        :fields="fields" 
        :data="data" 
        :title="title" 
        :show-addbtn="true" 
        :typeForme="'utilisateur'" 
        :is-loading="isLoading"
        @data-selected="handleDataSelected"
    />
</div>
</template>