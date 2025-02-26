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
    <DashboardNotification
      v-model:afficher-modal-notification="modal"
      v-model:visiteur="visiteur"
    />

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
  
  <!-- <DashboardNotification :afficher-modal-notification="modal" /> -->
</template>

<script setup>

import { computed, onMounted } from "vue";
import { useNotifiedStore } from "~/stores/notified";
import { useAuthStore } from "~/stores/auth.js";
import apiClient from "~/components/api/intercepteur";


const notifiedStore = useNotifiedStore();
const authUser = useAuthStore()
const visiteur = ref({})
const modal = ref(false)



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

  modal.value = true
  visiteur.value = {
    id: data.id,
    nom: data.visitor_nom+" "+data.visitor_prenom ,
    entreprise: 'KEHO GROUPE',
    contact: '07 07 07 07 00',
    nomEmploye: authUser.user.civilite+' '+authUser.user.nom
  }


  
  // Pousser la nouvelle notification dans mynotifs
  notifiedStore.mynotifs.push(newNotification);
});



const showModal = async (notif) =>{
  modal.value = !modal.value
  
  visiteur.value = {
    id: notif.id,
    nom: notif.visitor_nom+" "+notif.visitor_prenom ,
    entreprise: '',
    contact: '',
    nomEmploye: authUser.user.civilite+' '+authUser.user.nom
  }


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

