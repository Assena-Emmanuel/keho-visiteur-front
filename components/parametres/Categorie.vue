<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default{
    setup() {
        return { v$: useVuelidate() };
    },
    data(){
        return{
        title: 'Liste des Catégories',
        modal: false,
        isEditMode: false,  // Mode de modification ou ajout
        selectedIndex: null,  // Index de l'élément sélectionné pour la modification
        data: [
  {
    "Slug": "homepage",
    "Code": "HP001",
    "Libellé": "Accueil",
    "Catégorie": "Page",
    "Position": 1,
    "Statut": "Actif"
  },
  {
    "Slug": "about-us",
    "Code": "AB002",
    "Libellé": "À propos",
    "Catégorie": "Page",
    "Position": 2,
    "Statut": "Actif"
  },
  {
    "Slug": "contact",
    "Code": "CT003",
    "Libellé": "Contact",
    "Catégorie": "Page",
    "Position": 3,
    "Statut": "Inactif"
  },
  {
    "Slug": "services",
    "Code": "SV004",
    "Libellé": "Services",
    "Catégorie": "Section",
    "Position": 4,
    "Statut": "Actif"
  },
  {
    "Slug": "blog",
    "Code": "BL005",
    "Libellé": "Blog",
    "Catégorie": "Section",
    "Position": 5,
    "Statut": "Inactif"
  },
  {
    "Slug": "careers",
    "Code": "CR006",
    "Libellé": "Carrières",
    "Catégorie": "Section",
    "Position": 6,
    "Statut": "Actif"
  }
]
,
        fields: [
            {key: "Slug"},
            {key: "Code"},
            {key: "Libellé"},
            {key: "Catégorie"},
            {key: "Position"},
            {key: "Statut"},
            {key: "Actions"},
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
        <div class="mb-0">Gestion des Catégories</div>
        <BButton variant="primary" @click="openAddModal" style="width: 100px;" class="btn-sm mb-3"> <strong>Créer</strong>  </BButton>
        <FormsFormCategorie 
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
        :typeForme="'categorie'" 
        @edit="openModal(true, $event.index, $event.type)"
    />
</div>
</template>