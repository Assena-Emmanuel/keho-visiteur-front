<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default{
    setup() {
        return { v$: useVuelidate() };
    },
    data(){
        return{
        title: 'Liste des Menus',
        modal: false,
        formData: {},
        isEditMode: false,  // Mode de modification ou ajout
        selectedIndex: null,  // Index de l'élément sélectionné pour la modification
        data: [
        {
            "Target": "Homepage",
            "Libelle": "Accueil",
            "Type": "Page",
            "Icon": "home",
            "Position": 1,
            "Name": "Home",
            "Menu": "Main"
        },
        {
            "Target": "Settings",
            "Libelle": "Paramètres",
            "Type": "Page",
            "Icon": "settings",
            "Position": 2,
            "Name": "Settings",
            "Menu": "Main"
        },
        {
            "Target": "Profile",
            "Libelle": "Profil",
            "Type": "Page",
            "Icon": "user",
            "Position": 3,
            "Name": "Profile",
            "Menu": "User"
        }
        ],
        fields: [
            {key: "Target"},
            {key: "Libelle" },
            {key: "Type"},
            {key: "Icon"},
            {key: "Position"},
            {key: "Name"},
            {key: "Menu"},
            {key: "Actions"},
        ]
    }
    },
    props:{
            typeForme: String,
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
        <div class="mb-0">Gestion des Menu</div>
        <BButton variant="primary" @click="openAddModal" style="width: 100px;" class="btn-sm mb-3"> <strong>Créer</strong>  </BButton>
        <FormsFormMenu 
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
        :typeForme="'menu'" 
        @edit="openModal(true, $event)"
    />
</div>
</template>