<template>
  <BDropdown
    variant="white"
    class="dropdown d-inline-block"
    toggle-class="header-item noti-icon"
    right
    menu-class="dropdown-menu-lg dropdown-menu-end p-0"
  >
    <template #button-content>
      <i class="uil-bell"></i>
      <span class="badge bg-danger rounded-pill">{{ myNotifs.length }}</span>
    </template>


    <div class="p-3">
      <BRow class="align-items-center">
        <BCol>
          <h5 class="m-0 font-size-16">
            {{ $t("navbar.dropdown.notification.text") }}
          </h5>
        </BCol>
      </BRow>
    </div>

    <!-- Popup de la notification -->
    <DashboardNotification :afficherModalNotification="false" />

    <div style="max-height: 230px" data-simplebar class="bg-danger">
      <template v-if="myNotifs.length > 0">
        <a
          v-for="notif in myNotifs"
          :key="notif.id"
          href="#"
          class="text-reset notification-item"
          @click="showModal(notif)"
        >
          <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">{{ notif.visitor_code }}</h6>
              <div class="font-size-12 text-muted">
                <p class="mb-1">{{ notif.message }}</p>
              </div>
            </div>
          </div>
        </a>
      </template>
      <template v-else>
        <div class="text-muted text-center">No notifications</div>
      </template>
    </div>
  </BDropdown>

  <!-- Modal détail visiteur -->
  <BModal 
    v-model="modal" 
    hide-footer
  > 

    <div class="notification-container">

      <div class="notification-message text-center">
          Visite <strong>N° {{ notifDetail.visitor_code }}</strong> 
          <p>de</p> 
          <div><strong> {{ notifDetail.visitor_nom }} {{ notifDetail.visitor_prenom }} </strong></div> 
      </div>

      <div class="d-flex justify-content-between mt-5">
        <div><button class="btn text-danger">Rejeter</button></div>
        <div><button class="btn btn-primary">Accepter</button></div>
      </div>

    </div>

    
  </BModal>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useNotifiedStore } from "~/stores/notified";
import { useAuthStore } from "~/stores/auth.js";
import apiClient from "~/components/api/intercepteur";

const notifiedStore = useNotifiedStore();
const authUser = useAuthStore()

// Définir une propriété calculée pour obtenir les notifications
const myNotifs = computed(() => notifiedStore.mynotifs);
   
// Utilisateur connecté
const userId = parseInt(authUser.user.id, 10);

const pusher = useNuxtApp().$pusher;
let channel;
   
onMounted(() => {
  // Uncomment to subscribe to the channel
  notifiedStore.getNotification();
});

channel = pusher.subscribe(`App.Models.User.${userId}`);
channel.bind("visitor.notified", (data) => {
  const newNotification = {
    id: data.id,
    visitor_code: data.visitor_code,
    message: data.message,
  };

  // Pousser la nouvelle notification dans mynotifs
  notifiedStore.mynotifs.push(newNotification);
});

const modal = ref(false)
const notifDetail = ref({})

const showModal = async (notif) =>{
  modal.value = !modal.value
  notifDetail.value = notif

  const response = await apiClient.get(`/user/notifs/${notif.id}/mark-as-read`, {
      headers: {
        'Authorization': `Bearer ${authUser.token}`,  
      },
  });

  if(response.data.error){
    console.log("Erreur "+response.data.message)
  }else{
    notifiedStore.getNotification();
  }

}



</script>

<style>

.notification-container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      font-size: 16px;
      line-height: 1.6;
  }

  .notification-header {
      font-size: 20px;
      font-weight: bold;
      color: #2c3e50;
      margin-bottom: 10px;
  }

  .notification-subheader {
      font-size: 14px;
      color: #7f8c8d;
      margin-bottom: 15px;
  }

  .notification-details {
      margin: 10px 0;
  }

  .notification-details span {
      font-weight: bold;
      color: #34495e;
  }

  .notification-message {
      background-color: #ecf0f1;
      padding: 10px;
      border-radius: 5px;
      color: #2c3e50;
      font-style: italic;
  }

  .notification-footer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #bdc3c7;
  }
  
  .notification-button {
      display: inline-block;
      padding: 10px 15px;
      background-color: #2980b9;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 15px;
      font-weight: bold;
  }

  .notification-button:hover {
      background-color: #3498db;
  }

</style>