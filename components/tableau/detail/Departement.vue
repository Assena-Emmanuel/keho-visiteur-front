<script setup>
import { ref,  onMounted } from 'vue';
import apiClient from "~/components/api/intercepteur";
import { useAuthStore } from "~/stores/auth.js";


// Props
const props = defineProps({
  id : Number,
});

// Reactive
const detailDept = ref({})
const loading = ref(false);

const authStore = useAuthStore()

// recuperer les infos du user
onMounted(async () => {

loading.value = true
try {
    const response = await apiClient.get(`/categorie/${props.id}`, {
      headers: { 
        'Authorization': `Bearer ${authStore.token}`, 
      }
    });

    if (!response.data.error) {
        detailDept.value = response.data.data; 
    }

} catch (error) {
    console.error('Erreur durant la recuperation du departement:', error);
}finally{
    loading.value = false
}
})

</script>

<template>
    <!-- Détail Département -->
    <div v-if="loading" class="loading-ellipses">
        <span class="dot">.</span>
        <span class="dot">.</span>
        <span class="dot">.</span>
    </div>

    <div v-if="detailDept && !loading" class="card shadow-sm border-0">
    
    <div class="card-body p-4">
        <!-- En-tête du département -->
        <div class="mb-4">
        <div class="text-primary h5">
            <i class="fas fa-building me-2"></i> Département: <span class="fw-bold">{{ detailDept.libelle }}</span>
        </div>
        <div class="text-primary h5">
            <i class="fas fa-hashtag me-2"></i> Code: <span class="fw-bold badge text-bg-info">{{ detailDept.code }}</span>
        </div>
        </div>

        <!-- Titre des services -->
        <h5 class="border-bottom pb-3 mb-3">
        <i class="fas fa-list-alt me-2"></i> Services du département 
        <!-- <strong>{{ data.libelle }}</strong> -->
        </h5>

        <!-- Liste des services -->
        <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
            <i class="fas fa-laptop-code me-3 text-muted"></i>
            <strong>Informatique</strong>
            </div>
            <span class="badge bg-secondary rounded-pill">SEV003</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
            <i class="fas fa-code me-3 text-muted"></i>
            <strong>Développement</strong>
            </div>
            <span class="badge bg-secondary rounded-pill">SEV005</span>
        </li>
        <!-- Ajoutez d'autres services ici si nécessaire -->
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

.user-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #3498db;
}

.user-name {
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
