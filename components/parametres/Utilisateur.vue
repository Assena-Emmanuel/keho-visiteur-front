<script>
import apiClient from "~/components/api/intercepteur";


export default{
    data(){
        return{
        all_users: {},
        token: null,
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
        this.token = useCookie('token')
        this.user = JSON.parse(localStorage.getItem("user"))
        await this.allUsers()
    },
    props:{
        typeForme: String,
    },

    methods: {
        openModal(isEditMode, row=null, index = null, type) {
            this.isEditMode = isEditMode;
            this.selectedIndex = index;
            this.selectedRow = row;
            this.modal = true;
            this.typeForme = type
        },

        openAddModal(){
            this.modal = !this.modal
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
            console.log("Liste des utilisateurs récupérée :", response.data);
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
            :modelValue="modal"
            @update:modelValue="modal = $event"
            :isEditMode="isEditMode"
            :selectedIndex="selectedIndex" 
            :data="selectedRow"
        />

    </div>
    

    <Tableau 
        :fields="fields" 
        :data="data" 
        :title="title" 
        :show-addbtn="true" 
        :typeForme="'utilisateur'" 
        :is-loading="isLoading"
        @edit="openModal(true, $event.row, $event.index)"
    />
</div>
</template>