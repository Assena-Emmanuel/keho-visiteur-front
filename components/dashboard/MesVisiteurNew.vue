<template>
    <DashboardCommonStat />
  
    <BCard style="min-height: 10em;">
      <BCardBody>
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-3xl">Mes Visites enregistrées</h3>
          </div>
  
            <BRow class="mb-3">
                <BCol sm="12" md="3">
                Debut
                <BFormInput
                    type="datetime-local"
                    v-model="dateDebut"
                    class="border border-secondary"
                    size="sm"
                />
                </BCol>
                <BCol sm="12" md="3">
                Fin
                <BFormInput
                    type="datetime-local"
                    v-model="dateFin"
                    class="border border-secondary"
                    size="sm"
                />
                </BCol>
                <BCol sm="12" md="5">
                    <div>
                        <div class="input-group mt-4 border border-secondary rounded-1">
                        <span class="input-group-text">
                            <i class="fas fa-search font-size-10"></i>
                        </span>
                        <BFormInput
                            v-model="searchValue"
                            type="search"
                            id="input-small"
                            size="sm"
                            placeholder="Rechercher..."
                        />
                        </div>
                    </div>
                </BCol>
                <BCol sm="12" md="1">
                    <BButton class="mt-4" size="sm">Rechercher</BButton>
                </BCol>
            </BRow>
  
          <!-- Table avec pagination -->
          <EasyDataTable
            v-model:server-options="serverOptions"
            :server-items-length="serverItemsLength"
            :loading="loading"
            :headers="headers"
            :items="filteredData"
            rows-of-page-separator-message="sur"
            buttons-pagination
            table-class-name="customize-table"
            header-text-direction="center"
            body-text-direction="center"
            :rows-items="range"
            :rows-per-page="range[0]"
            empty-message="Aucune donnée disponible"
            rows-per-page-message="Ligne par page"
            :search-field="searchField"
            :search-value="searchValue"

            >

            <template #item-actions="item">
              <div class="d-flex gap-1">
                <!-- Bouton d'affichage (show) -->
                <BButton 
                  v-if="permissions.some(perm => perm.show)" 
                  style="width: 15px; height: 15px;" 
                  variant="white" 
                  size="sm" 
                  class="d-flex text-primary justify-content-center align-items-center" 
                  @click="showDetailsModal(row.item)"
                >
                  <i class="fas fa-eye"></i>
                </BButton>

                <!-- Bouton d'impression (prt) -->
                <BButton 
                  v-if="permissions.some(perm => perm.prt)" 
                  style="width: 15px; height: 15px;" 
                  variant="white" 
                  size="sm" 
                  class="d-flex text-primary justify-content-center align-items-center" 
                  @click="showTicket(row.item)"
                >
                  <i class="uil uil-print font-size-15"></i>
                </BButton>

                <!-- Bouton de modification (edit) -->
                <BButton 
                  v-if="permissions.some(perm => perm.edit)" 
                  style="width: 15px; height: 15px;" 
                  variant="white" 
                  size="sm" 
                  class="mr-1 fw-bold text-warning d-flex justify-content-center align-items-center" 
                  @click="handleEdit(row.index, data)" 
                  v-b-tooltip.hover.bottom="'rejeter'"
                >
                  <i class="uil uil-ban font-size-15 annuler"></i>
                </BButton>

                <!-- Bouton de suppression (del) -->
                <BButton 
                  v-if="permissions.some(perm => perm.del)" 
                  style="width: 15px; height: 15px;" 
                  variant="white" 
                  size="sm" 
                  class="px-2 text-danger d-flex justify-content-center align-items-center" 
                  @click="confirmDelete(row.item.Code)"
                >
                  <i class="uil uil-trash-alt font-size-15"></i>
                </BButton>
              </div>
            </template>

            <template #item-heure_fin="item">
                <div>
                    <span>----</span>
                </div>
            </template>

            <!-- Personnaliser le loading -->
            <template #loading>
                <ScaleLoader :loading="loading" style="margin: 10em 0;" :height="'30px'" :color="'#FE0201'" />
            </template>
            

            </EasyDataTable>
        </div>
      </BCardBody>
    </BCard>
  </template>
  
  <script setup>
  import { useAuthStore } from "~/stores/auth.js";
  import apiClient from "../api/intercepteur";
  import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
  
  const authStore = useAuthStore();
  
  const headers = [
    { text: "Date", value: "created_at", sortable: true },
    { text: "Nom & Prénoms", value: "visiteur" },
    { text: "CNI", value: "numero_piece"},
    { text: "Société", value: "entreprise"},
    { text: "Code visiteur", value: "code_visiteur" },
    { text: "Code visite", value: "code_visite" },
    { text: "Employé", value: "employe" },
    { text: "Visite", value: "lib_visite" },
    { text: "H entrée", value: "heure_entree" },
    { text: "Statut", value: "lib_statut" },
    { text: "H Sortie", value: "heure_fin" },
    { text: "Actions", value: "Actions" },
  ];
  
  const permissions = ref([])
  const range = ref([5,10,15,20])
  const items = ref([]);
  const loading = ref(false);
  const serverItemsLength = ref(0);
  const searchField = ["visiteur", "entreprise", "numero_piece", "code_visite", "code_visiteur", "employe", "lib_visite"];
  const searchValue = ref("");
  const serverOptions = ref({
    page: 1,
    rowsPerPage: 5,
    sortBy: 2,
  });
  const filteredItems = ref([]);

  
  // Fonction pour charger les données depuis le serveur
  const loadFromServer = async () => {
    loading.value = true;
    console.log("Code visite---------------: "+authStore.user.visite.code_visite)
    try {
        const response = await apiClient.get("/fvisites/lvisite", {
        params: {
          page: serverOptions.value.page,
          limit: serverOptions.value.rowsPerPage,
          sort_type: serverOptions.value.sortBy,
          code_employe: authStore.user.visite.code_visite,
        },
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },

      });

      if (!response.data.error) {
        const data = response.data.data;
        items.value = data?.data;
        serverItemsLength.value = response.data.data.total;

      }

    } catch (e) {
      console.error("Erreur lors de la récupération des données: " + e);

    } finally {
      loading.value = false;

    }
  };
  
  // Appel initial pour charger les données
  onMounted( async () => {
    loadFromServer();

    // Recuperation des permissions en fonction du role connecté
    const code = "mes_visiteurs"
    const response = await apiClient.get(`/permissions/menu_action/${authStore.user.role_id}/${code}`, 
        {
        headers: {
            'Authorization': `Bearer ${authStore.token}`,  // Utilisation du token d'authentification
            },
        })

        if(!response.data.error){
        permissions.value = response.data
        console.log("permission----------------: "+JSON.stringify(permissions.value))

        }else{
        console.error("Menu error: "+response.message)
        }
  });
  
  const filteredData = computed(() => {
  if (!searchValue.value) {
    return items.value;
  }
  return items.value.filter(item =>
    searchField.some(field =>
      String(item[field]).toLowerCase().includes(searchValue.value.toLowerCase())
    )
  );
});

// Watch pour surveiller les modifications sur les options du serveur (pagination, tri)
watch(serverOptions, () => {
  loadFromServer();  // Recharger les données lors du changement de pagination/tri
}, { deep: true });
    

</script>

<style>
    .customize-table{
        --easy-table-header-font-size: 14px;
        --easy-table-body-row-height: 30px;
        --easy-table-body-row-font-size: 14px;

        --easy-table-header-item-padding: 10px 15px;

        --easy-table-body-item-padding: 12px 5px;

        
    }
</style>