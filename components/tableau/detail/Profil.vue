<script setup>
import { ref, onMounted } from 'vue';
import apiClient from "~/components/api/intercepteur";
import { useAuthStore } from "~/stores/auth.js";
import { useApi } from '~/components/api/useApi';


// Props
// const props = defineProps({
//   id: Number,
// });

const id = defineModel('id')

// Reactive variables
const currentPage = ref(1);
const perPage = ref(5);
const menus = ref([])
const permissions = ref({})
const dataRole = ref({})
const profileDetail = ref({});
const fields = ref([])
const loading = ref(false);
const totalRows = ref(1);
const libelle = ref(null)
const formData = ref({})
const errorMessage = ref(""); // Nouvelle variable pour gérer les erreurs

const authStore = useAuthStore();
const { getById } = useApi(authStore.token);

// Récupérer les infos du user au montage du composant
onMounted(async () => {
  loading.value = true;
  errorMessage.value = ""; // Réinitialiser le message d'erreur
  try {
    const response = await getById("role", id.value)
    if (!response.data.error) {
      profileDetail.value = { ...response.data }
      getPermissions(profileDetail.value.id)
    }

  } catch (error) {
    console.error('Erreur durant la récupération du département:', error);
    errorMessage.value = "Une erreur est survenue lors de la récupération des données.";
  } finally {
    loading.value = false;
  }
});

// recuperer permission
const getPermissions = async (id) => {
  const response = await apiClient.get(`/permissions/${id}`,{
    headers: {
      'Authorization': `Bearer ${authStore.token}`,
    },
  });

  if(!response.data.error){

    dataRole.value = response.data

    // Mappage des menus et permissions
    menus.value = dataRole.value.menus;
    totalRows.value = menus.value.length

    // Définir les actions comme les fields pour la table
    fields.value = extractActionFields(menus.value);


      menus.value.map((menu) => {
        menu.permissions.map((perm) => {
          formData.value[`${menu.resourceId}-${perm.action_id}`] = perm.habilitation;
        });
      });

  }else{
    console.error("error lors de la recuperation des permission: "+response.data.message)
  }

}

const paginatedMenus = computed(() => {
    const start = (currentPage.value - 1) * perPage.value
    const end = start + perPage.value
    return menus.value.slice(start, end)

});

const filterOn = computed(() => props.fields.map(field => field.key));

// Extraire les actions pour créer les fields du tableau
const extractActionFields = (menus) => {
      let actions = new Set();
      menus.forEach(menu => {
        menu.permissions.forEach(permission => {
          actions.add(permission.action_lib);
        });
      });
      return Array.from(actions);
};

watch(
  () => id.value,  
  async (newid) => {  
    if (newid) {
      
      // isOpen.value = false
      // recuperation du profil
      try{
          // isOpen.value = true
          isEditMode.value = true
         
          const profil = await getById("role", newid);
          console.log("profil:------------------------- "+JSON.stringify(profil))
          
        
        if(!profil.data.error){

          libelle.value = profil.data.libelle
          ancienLibelle.value = profil.data.libelle
          description.value = profil.data.description


          

        }else{
          console.error("recuperation Profil error: "+profil.data.message)
        }
        
        
      }catch(e){
        console.error("Erreur: "+e)
      }finally{
        loading.value = false
      }
      
    }
  },
  { immediate: true }  // Lance le watch dès que possible, même si la prop est déjà présente
);
</script>

<template>
    <!-- Détail Profil -->
    <ScaleLoader :loading="loading" style="margin: 10em 0;" :height="'30px'" :color="'#FE0201'" />
    <div v-if="!loading" class="card border-0">
      <div class="card-body p-4">
        <!-- En-tête du Profil -->
        <div class="mb-4">
          <div class="text-primary">
            <i class="fas fa-user-circle me-2"></i><span class="fw-bold h4 text-primary">{{ (profileDetail.libelle)?.toUpperCase() }}</span>
          </div>
          <div class="">
            <div style="margin-left: 30px;">
              <span class="">{{ profileDetail.description }}</span>
            </div>
          </div>
        </div>
  
        <!-- Titre des Permissions -->
        <h6 class="border-bottom pb-3 mb-3 me-5">
          <i class="fas fa-shield-alt "></i> Permissions associées au profil
        </h6>
  
        <!-- Liste des Permissions -->


        <table class="table" v-if="id">
          <thead class="table-dark">
            <tr>
              <th>Menu</th>
              <th v-for="action in fields" :key="action.id">
                <th>{{ action }}</th>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="menu in paginatedMenus" :key="menu.resourceId">
              <td>{{ menu.resourceName }}</td>
              <td class="text-center" v-for="action in menu.permissions" :key="action.action_id">
                <input
                  type="checkbox"
                  disabled
                  :name="`${menu.resourceId}-${action.action_id}`"
                  :checked="action.habilitation ? true : false"
                  v-model="formData[`${menu.resourceId}-${action.action_id}`]"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <BRow>
        <BCol>
          <div class="dataTables_paginate paging_simple_numbers d-flex justify-content-between pb-2" style="font-size: 12px;">
              <div id="tickets-table_length" class="dataTables_length">
              <label class="d-inline-flex align-items-center">
                  Afficher de 1 à {{ perPage }} sur {{ totalRows }} éléments
              </label>
              </div>
              <ul class="pagination pagination-rounded mb-0">
              <BPagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" />
              </ul>
          </div>
        </BCol>
      </BRow>

      </div>
    </div>
  </template>
  
  <style scoped>
  .detail-container {
    background: #f8f9fa; /* Gris clair */
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .profile-image {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid #3498db;
  }
  
  .profile-name {
    font-weight: bold;
    font-size: 1.5rem;
  }
  
  .badge-role {
    background: #6c757d;
    padding: 8px 12px;
    font-size: 0.9rem;
    border-radius: 10px;
    color: white;
  }
  
  .status-badge {
    font-size: 0.9rem;
    padding: 6px 10px;
  }
  
  .info-item {
    margin-bottom: 10px;
    font-size: 1rem;
  }
  
  .info-item i {
    color: #3498db;
    margin-right: 6px;
  }
  
  .separator {
    border-top: 2px dashed #ddd;
    margin: 15px 0;
  }
  </style>
  
  <!-- Loading css -->
  <style scoped>
  .loading-ellipses {
    font-size: 40px; /* Taille augmentée */
    color: #3498db;
    text-align: center;
    font-weight: bold;
  }
  
  .dot {
    animation: blink 1s infinite;
    margin: 0 5px; /* Espacement entre les points */
  }
  
  .dot:nth-child(1) {
    animation-delay: 0s;
  }
  
  .dot:nth-child(2) {
    animation-delay: 0.3s;
  }
  
  .dot:nth-child(3) {
    animation-delay: 0.6s;
  }
  
  @keyframes blink {
    0%, 20% {
      opacity: 0;
    }
    50%, 100% {
      opacity: 1;
    }
  }
  </style>
  