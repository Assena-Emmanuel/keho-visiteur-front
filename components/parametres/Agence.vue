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
        isEditMode: false,  // Mode de modification ou ajout
        selectedIndex: null,  // Index de l'élément sélectionné pour la modification
        data: [
  {
    "Code": "HP001",
    "Libellé": "Accueil",
    "Statut": "Actif"
  },
  {
    "Code": "AB002",
    "Libellé": "À propos",
    "Statut": "Actif"
  },
  {
    "Code": "CT003",
    "Libellé": "Contact",
    "Statut": "Inactif"
  },
  {
    "Code": "SV004",
    "Libellé": "Services",
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
    "Code": "CR006",
    "Libellé": "Carrières",
    "Statut": "Actif"
  }
]
,
        fields: [
            {key: "Code"},
            {key: "Libellé"},
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
        <div class="mb-0">Gestion des Agences</div>
        <BButton variant="primary" @click="openAddModal" style="width: 100px;" class="btn-sm mb-3"> <strong>Créer</strong>  </BButton>
        <FormsFormAgence 
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
        :typeForme="'agence'" 
        @edit="openModal(true, $event.index, $event.type)"
    />
</div>
</template>