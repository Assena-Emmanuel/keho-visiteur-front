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
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useNotifiedStore } from "~/stores/notified";

const notifiedStore = useNotifiedStore();

// Définir une propriété calculée pour obtenir les notifications
const myNotifs = computed(() => notifiedStore.mynotifs);

const userId = 64;

const pusher = useNuxtApp().$pusher;
let channel;

onMounted(() => {
  // Uncomment to subscribe to the channel
  notifiedStore.getNotification();
});

channel = pusher.subscribe(`App.User.${userId}`);
channel.bind("visitor.notified", (data) => {
  const newNotification = {
    id: data.id,
    visitor_code: data.visitor_code,
    message: data.message,
  };

  // Pousser la nouvelle notification dans mynotifs
  notifiedStore.mynotifs.push(newNotification);
});
</script>
