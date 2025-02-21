<script setup>
import { ref, onMounted } from 'vue';
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useAuthStore } from "~/stores/auth.js";
import { useGestionStore } from "~/stores/gestion.js";
import { useApi } from '~/components/api/useApi';

// Stores
const gestionStore = useGestionStore();
const authStore = useAuthStore();
const v$ = useVuelidate();

// Variables réactives
const title = 'Liste des Profils';
const modal = ref(false);
const formData = ref({});
const rowSelect = ref(null);
const isEditMode = ref(false);
const selectedIndex = ref(null);
const data = ref([]);
const fields = ref([]);
const isLoading = ref(false);

// Methods
const openModal = (isEditMode, data) => {
  isEditMode.value = isEditMode;
  modal.value = true;
  formData.value = data;

};

const openAddModal = () => {
    isEditMode.value = false;
    modal.value = true
  
};

const profils = async () => {
  fields.value = [
    { key: "libelle" },
    { key: "description" },
    { key: "Actions" },
  ];

  if (gestionStore.profils.length === 0) {
    try {
      isLoading.value = true;
      const response = await useApi(authStore.token).getAll("role");

      if (!response.error) {
        gestionStore.setProfils(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Erreur 401 : Jeton invalide ou utilisateur non authentifié.");
      } else {
        console.error("Erreur lors de la récupération des profils :", error);
      }
    } finally {
      isLoading.value = false;
    }
  }
};

onMounted(profils);

// Props
defineProps({
  typeForme: String,
});

// Validation
const validations = {
  libelleDepartement: {
    required,
  },

  codeDepartement: {
    required,
  },

};

// Methods (Handling data selection)
const handleDataSelected = (payload) => {
  selectedIndex.value = payload.id;
  
  // Open modal only if we have a valid id
//   modal.value = !!payload.id;
  isEditMode.value = !!payload.id;
  console.log("--------------------index: "+selectedIndex.value+" ---edit :"+isEditMode.value)
};

</script>

<template>
    <div>
    <div class="d-flex justify-content-between">
        <div class="mb-0">Gestion des profils</div>
        <BButton variant="primary" @click="openAddModal" style="width: 100px;" class="btn-sm mb-3"> <strong>Créer {{ modal }}</strong>  </BButton>
        <DashboardNotifWeb />
        <FormsFormProfil
            v-model:isOpen="modal"
            v-model:id="selectedIndex"
        />
    </div>
    

    <Tableau 
        :fields="fields" 
        :title="title" 
        :show-addbtn="true" 
        :typeForme="'profil'" 
        :is-loading="isLoading"
        @data-selected="handleDataSelected"
    />
    <!-- @edit="openModal(true, $event)" -->
</div>
</template>
