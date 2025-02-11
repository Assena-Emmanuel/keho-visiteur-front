<script setup>
import { ref, onMounted } from 'vue';
import apiClient from "~/components/api/intercepteur";
import { useAuthStore } from "~/stores/auth.js";
import {useGestionStore} from "~/stores/gestion.js"

// Définition des variables réactives
const authStore = useAuthStore();
const gestionStore = useGestionStore()

const title = 'Liste des Utilisateurs';
const isEdit = ref(false);
const isLoading = ref(true);
const modal = ref(false);
const isEditMode = ref(false);
const selectedRow = ref(null);
const data = ref([]);
const fields = ref([
    {key: "civilite"},
    {key: "nom"},
    {key: "prenom"},
    {key: "email"},
    {key: "telephone1"},
    {key: "telephone2"},
    {key: "statut"},
    {key: "Actions"},
]);

const handleDataSelected = (payload) => {
    selectedRow.value = payload.uuid;
    modal.value = true;
    isEditMode.value = !!payload.uuid;
};

const openAddModal = () => {
    modal.value = true;
    isEditMode.value = false;
};

// Fonction pour récupérer tous les utilisateurs
const allUsers = async () => {
    try {
        isLoading.value = true;
        const response = await apiClient.get(`/user`, {
            headers: {
                'Authorization': `Bearer ${authStore.token}`,
            },
        });

        if (!response.data.error) {
            data.value = response.data.data;
            gestionStore.setUsers(data.value)
            console.log("All--------------------------------------: "+JSON.stringify(data.value))
            
        }

    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error("Erreur 401 : Jeton invalide ou utilisateur non authentifié.");
        } else {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
        }
    } finally {
        isLoading.value = false;
    }
};

onMounted(async () => {
    await allUsers();
});
</script>


<template>
    <div>
    <div class="d-flex justify-content-between">
        <div class="mb-0">Gestion des Utilisateurs</div>
        <BButton variant="primary" style="width: 100px;" @click="openAddModal" class="btn-sm mb-3"> <strong>Créer</strong>  </BButton>
        <FormsFormUser 
            v-if="selectedRow"
            :isOpen="modal"
            :isEditMode="isEditMode"
            :uuid="selectedRow"
            @update:isOpen="modal = $event"
            @update:uuid="modal = $event"

        />
    </div>


    <Tableau 
        :fields="fields" 
        :title="title" 
        :show-addbtn="true" 
        :typeForme="'user'" 
        :is-loading="isLoading"
        @data-selected="handleDataSelected"
    />
    <!-- <Tableau 
        :fields="fields" 
        :data="data" 
        :title="title" 
        :show-addbtn="true" 
        :typeForme="'user'" 
        :is-loading="isLoading"
        @data-selected="handleDataSelected"
    /> -->
</div>
</template>