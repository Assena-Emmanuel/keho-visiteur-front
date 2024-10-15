<script>
export default{
    data(){
        return{
        title: 'Liste des Utilisateurs',
        modal: false,
        isEditMode: false,  // Mode de modification ou ajout
        selectedIndex: null,  // Index de l'élément sélectionné pour la modification
        data: [
            {
                "Civilité": "M.",
                "Nom": "Dupont",
                "Prénoms": "Jean Michel",
                "E-mail": "jean.dupont@example.com",
                "Tel 1": "0712131415",
                "Tel 2": "0505060607",
                "Département": "Technologie",
                "Service": "Informatique",
                "Matricule": "AAA111",
                "Code Visite": "U001",
                "Statut": true,
            },
            {
                "Civilité": "Mme",
                "Nom": "Durand",
                "Prenoms": "Sophie Anne",
                "E-mail": "sophie.durand@example.com",
                "Tel 1": "0598765432",
                "Tel 2": "0123546789",
                "Département": "Technologie",
                "Service": "Informatique",
                "Matricule": "AAA111",
                "Code Visite": "U001",
                "Statut": false,
            }
        ],

        fields: [
            {key: "Civilité"},
            {key: "Nom"},
            {key: "Prenoms"},
            {key: "E-mail"},
            {key: "Tel 1"},
            {key: "Tel 2"},
            {key: "Statut"},
            {key:"Actions"},

        ]
    }
    },
    props:{
        typeForme: String,
    },

    methods: {
        openModal(isEditMode, index = null, type) {
            this.isEditMode = isEditMode;
            this.selectedIndex = index;
            this.modal = true; 
            this.typeForme = type
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
        <div class="mb-0">Gestion des Utilisateurs</div>
        <BButton variant="primary" style="width: 100px;" @click="openAddModal" class="btn-sm mb-3"> <strong>Créer</strong>  </BButton>
        <FormsFormUser 
            :modelValue="modal"
            @update:modelValue="modal = $event"
            :isEditMode="isEditMode"
            :selectedIndex="selectedIndex" 
        />

    </div>
    

    <Tableau 
        :fields="fields" 
        :data="data" 
        :title="title" 
        :show-addbtn="true" 
        :typeForme="'utilisateur'" 
        @edit="openModal(true, $event.index, $event.type)"
    />
</div>
</template>