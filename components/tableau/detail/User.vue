<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { capitalize } from "vue";
import apiClient from "~/components/api/intercepteur";
import { useAuthStore } from "~/stores/auth.js";
import Swal from 'sweetalert2';

// Props
const props = defineProps({
  uuid : String,
});

// Reactive
const detailUser = ref({})
const loadingDetail = ref(false);

const authStore = useAuthStore()

// recuperer les infos du user
onMounted(async () => {

loadingDetail.value = true
try {
    const response = await apiClient.get(`/user/${props.uuid}`, {
      headers: { 
        'Authorization': `Bearer ${authStore.token}`, 
      }
      
    });

    if (!response.data.error) {
        detailUser.value = response.data.data; 

    }

} catch (error) {
    console.error('Erreur durant la recuperation du user:', error);

}finally{
  loadingDetail.value = false

}
})

</script>

<template>
    <div v-if="loadingDetail" class="loading-ellipses">
        <span class="dot">.</span>
        <span class="dot">.</span>
        <span class="dot">.</span>
    </div>
    <div v-if="detailUser && !loadingDetail" class="detail-container">
        <div class="row align-items-center mb-3">
            <div class="col-md-4 text-center">
            <img 
                :src="`data:${detailUser.imageType};base64,${detailUser.image}`"  
                alt="Photo" 
                class="user-image"
            >
            </div>
            <div class="col-md-8">
            <h4 class="user-name">{{ detailUser.civilite }} {{ detailUser.nom }} {{ detailUser.prenom }}</h4>
            <div class="mb-2">
                <span class="badge badge-role">
                <i class="fas fa-user-tie"></i> {{ detailUser.role ? detailUser.role.libelle : "" }}
                </span>
            </div>
            <BBadge :variant="detailUser.statut ? 'success' : 'danger'" class="status-badge">
                {{ detailUser.statut ? 'Activé' : 'Désactivé' }}
            </BBadge>
            </div>
        </div>

        <div class="separator"></div>

        <div class="row">
            <div class="col-md-6 info-item">
            <i class="fas fa-mobile-alt"></i> <strong>Mobile 1:</strong> {{ detailUser.telephone1 }}
            </div>
            <div class="col-md-6 info-item">
            <i class="fas fa-mobile-alt"></i> <strong>Mobile 2:</strong> {{ detailUser.telephone2 }}
            </div>
            <div class="col-md-12 info-item">
            <i class="fas fa-envelope"></i> <strong>Email:</strong> {{ detailUser.email }}
            </div>
        </div>

        <div class="separator"></div>

        <div class="row">
            <div class="col-md-6 info-item">
            <i class="fas fa-building"></i> <strong>Département:</strong> {{ detailUser.visite ? detailUser.visite.departement.libelle : "" }}
            </div>
            <div class="col-md-6 info-item">
            <i class="fas fa-briefcase"></i> <strong>Service:</strong> {{detailUser.visite ? detailUser.visite.service.libelle : "" }}
            </div>
        </div>

        <div class="separator"></div>

        <div class="row">
            <div class="col-md-6 info-item">
            <i class="fas fa-qrcode"></i> <strong>Code Visite:</strong> {{detailUser.visite ?  detailUser.visite.code_visite : "" }}
            </div>
            <div class="col-md-6 info-item">
            <i class="fas fa-id-card"></i> <strong>Matricule:</strong> {{detailUser.visite ?  detailUser.visite.matricule : "" }}
            </div>
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
