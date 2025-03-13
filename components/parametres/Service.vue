<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import apiClient from "~/components/api/intercepteur";
import { useAuthStore } from "~/stores/auth.js";
import { useGestionStore } from "~/stores/gestion.js";

export default {
    setup() {
        const gestionStore = useGestionStore();
        const authStore = useAuthStore();
        const v$ = useVuelidate();

        // Variables réactives
        const title = 'Liste des Services';
        const modal = ref(false);
        const formData = ref({});
        const rowSelect = ref(null);
        const isEditMode = ref(false);
        const selectedIndex = ref(null);
        const data = ref(gestionStore.services);
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

        const services = async () => {
            fields.value = [
                { key: "slug" },
                { key: "code" },
                { key: "libelle" },
                { key: "statut" },
                { key: "Actions" },
            ];

            if (data.value.length === 0) {
                try {
                    isLoading.value = true;
                    const slug = "SRV";
                    const response = await apiClient.get(`/categorie_by_slug/${slug}`, {
                        headers: {
                            'Authorization': `Bearer ${authStore.token}`,
                        },
                    });

                    if (!response.data.error) {
                        gestionStore.setServices(response.data.data);
                    }
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        console.error("Erreur 401 : Jeton invalide ou utilisateur non authentifié.");
                    } else {
                        console.error("Erreur lors de la récupération des départements :", error);
                    }
                } finally {
                    isLoading.value = false;
                }
            }
        };

        // Appeler services au montage du composant
        onMounted(services);

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
            services,
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
            this.selectedRow = payload.id;
            this.modal = true;
            this.isEditMode = !!payload.id;
        },
    },
};
</script>

<template>
    <div>
    <div class="d-flex justify-content-between">
        <div class="mb-0">Gestion des Services</div>
        <BButton variant="primary" @click="openAddModal" style="width: 100px;" class="btn-sm mb-3"> <strong>Créer</strong>  </BButton>
        <FormsFormService
            v-model:isOpen="modal"
            v-model:id="selectedRow"
            v-model:isEditMode="isEditMode"
        />

    </div>
    

    <Tableau 
        :fields="fields" 
        :title="title" 
        :show-addbtn="true" 
        :typeForme="'service'" 
        :is-loading="isLoading"
        @edit="openModal(true, $event)"
        @data-selected="handleDataSelected"
    />
</div>
</template>