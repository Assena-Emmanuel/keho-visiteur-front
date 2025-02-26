<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useAuthStore } from "~/stores/auth.js";
import { useGestionStore } from "~/stores/gestion.js";
import { useApi } from '~/components/api/useApi';

export default {
    setup() {
        const gestionStore = useGestionStore();
        const authStore = useAuthStore();
        const v$ = useVuelidate();
        const  { getAll,  } = useApi(authStore.token)

        // Variables réactives
        const title = 'Liste des categories';
        const modal = ref(false);
        const formData = ref({});
        const rowSelect = ref(null);
        const isEditMode = ref(false);
        const selectedIndex = ref(null);
        const data = ref([]);
        const fields = ref([]);
        const isLoading = ref(false);

        const openModal = (isEditMode, data) => {
            isEditMode.value = isEditMode;
            modal.value = true;
            formData.value = data;
        };

        const openAddModal = () => {
            modal.value = !modal.value;
            isEditMode.value = false;
        };

        const categories = async () => {
        fields.value = [
            {key: "slug"},
            {key: "libelle" },
            {key: "code"},
            {key: "statut"},
            {key: "Actions"},
        ]

            if (gestionStore.categories.length === 0) {
              try {
                  isLoading.value = true;
                  const response = await getAll("categorie")

                  if (!response.error) {
                    gestionStore.setCategories(response.data);

                  }
              } catch (error) {
                  if (error.response && error.response.status === 401) {
                      console.error("Erreur 401 : Jeton invalide ou utilisateur non authentifié.");

                  } else {
                      console.error("Erreur lors de la récupération des profild :", error);

                  }
              } finally {
                  isLoading.value = false;
                  
              }
            }
        };

        // Appeler categories au montage du composant
        onMounted(categories);

        return {
            v$,
            authStore,
            gestionStore,
            title,
            modal,
            formData,
            rowSelect,
            isEditMode,
            selectedIndex,
            data,
            fields,
            isLoading,
            openModal,
            openAddModal,
            categories,
        };
    },

    props: {
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

    methods: {
        handleDataSelected(payload) {
            this.selectedIndex = payload.id;
            this.modal = true;
            this.isEditMode = !!payload.id;

        },

        updateEditMode(value) {
            this.isEditMode = value;
        },

        
    },
};
</script>

<template>
    <div>
    <div class="d-flex justify-content-between">
        <div class="mb-0">Gestion des Categories</div>
        <BButton variant="primary" @click="openAddModal" style="width: 100px;" class="btn-sm mb-3"> <strong>Créer</strong> </BButton>

        <FormsFormCategorie
            v-model:isOpen="modal"
            v-model:id="selectedIndex"
        />

    </div>
    

    <Tableau 
        :fields="fields" 
        :title="title" 
        :show-addbtn="true" 
        :typeForme="'categorie'" 
        :is-loading="isLoading"
        @edit="openModal(true, $event)"
        @data-selected="handleDataSelected"
    />
</div>
</template>





