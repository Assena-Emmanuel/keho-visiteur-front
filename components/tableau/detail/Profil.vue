<script setup>
import { ref, onMounted } from 'vue';
import apiClient from "~/components/api/intercepteur";
import { useAuthStore } from "~/stores/auth.js";
import { useApi } from '~/components/api/useApi';


// Props
const props = defineProps({
  id: Number,
});

// Reactive variables
const profileDetail = ref({});
const loading = ref(false);
const errorMessage = ref(""); // Nouvelle variable pour gérer les erreurs

const authStore = useAuthStore();
const { getById } = useApi(authStore.token);

// Récupérer les infos du user au montage du composant
onMounted(async () => {
  loading.value = true;
  errorMessage.value = ""; // Réinitialiser le message d'erreur
  try {
    const response = await getById("role", props.id)
    console.log("--------------------! ",response)
    if (!response.data.error) {
      profileDetail.value = { ...response.data }; // Copier les données de manière sécurisée
    console.log("--------------------! ",profileDetail.value)
    }

  } catch (error) {
    console.error('Erreur durant la récupération du département:', error);
    errorMessage.value = "Une erreur est survenue lors de la récupération des données.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
    <!-- Détail Profil -->
    <div v-if="loading" class="loading-ellipses">
      <span class="dot">.</span>
      <span class="dot">.</span>
      <span class="dot">.</span>
    </div>
  
    <div v-if="profileDetail && !loading" class="card shadow-sm border-0">
      <div class="card-body p-4">
        <!-- En-tête du Profil -->
        <div class="mb-4">
          <div class="text-primary">
            <i class="fas fa-user-circle me-2"></i><span class="fw-bold h4 text-primary">{{ profileDetail.libelle }}</span>
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
        <ul class="list-group">
          <li v-if="profileDetail.permissions && profileDetail.permissions.length" 
              v-for="permission in profileDetail.permissions" 
              :key="permission.id" 
              class="list-group-item d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <span>*</span>
              <strong>{{ permission.libelle }}</strong>
            </div>
            <span class="badge bg-secondary rounded-pill">{{ permission.code }}</span>
          </li>
          <li v-else class="list-group-item">
            <span>Aucune permission attribuée à ce profil.</span>
          </li>
        </ul>
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
  