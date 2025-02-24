<script>
import HederLogo from "~/components/layouts/common/HeaderLogo.vue";
// import AppSearch from "~/components/layouts/common/AppSearch.vue";
// import MobileAppSearch from "~/components/layouts/common/MobileAppSearch.vue";
import AppList from "~/components/layouts/common/AppList.vue";
import Notifications from "~/components/layouts/common/Notifications.vue";
import Profile from "~/components/layouts/common/Profile.vue";
import { useAuthStore } from '~/stores/auth';
import apiClient from "~/components/api/intercepteur";


export default {
  setup(){
    const authStore = useAuthStore(); // Initialisation du store
    const config = useRuntimeConfig(); // Récupération de la config Nuxt

    return { authStore, config };
  },
  data() {
    


    return {
      parametres: ["Paramètre des Visités, Paramètre des Visiteurs, "],
      value: null,
      config: useRuntimeConfig(),
      user: null,
      menus: [],
    };
  },
  components: {
    HederLogo,
    AppList,
    Notifications,
    Profile
  },
  async mounted() {
    this.user = this.authStore.user;

    // Recuperation des menus en fonction du role connecté
    const response = await apiClient.get(`/menu_by_role/${this.authStore.user.role_id}`, 
      {
      headers: {
          'Authorization': `Bearer ${this.authStore.token}`,  // Utilisation du token d'authentification
        },
      })

    if(!response.data.error){
      this.menus = response.data.filter(item => item.type === 'PARA');

    }else{
      console.error("Menu error: "+response.message)
    }
  },

  computed: {
    // Accéder à l'utilisateur sans mutation
    user() {
      return this.authStore.user;
    },
    
  },



  methods: {
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    }
  }
};
</script>

<template>
  <ClientOnly>
    <header id="page-topbar">
      <div class="navbar-header">
        <div class="d-flex">
          <HederLogo />
          <BButton variant="white"style="width: 25px;"type="button" class="btn-sm px-1 font-size-16 header-item vertical-menu-btn" @click="toggleMenu">
            <i class="fa fa-fw fa-bars"></i>
          </BButton>
          <!-- <AppSearch /> -->
        </div>
    
        <div class="d-flex gap-3">
          <LayoutsCommonParametreDropdown v-model:menusParam="menus" v-if="menus.length != 0" />
          <Notifications />
           <div class="d-flex align-items-center">
            <button @click="toggleRightSidebar" class="btn btn-outline-secondary" v-if="user"  style="width: 100%; padding: 1px 3px;">

              <img v-if="user.image" class="rounded-circle header-profile-user" :src="`data:${user.imageType};base64,${user.image}`" alt="Header Avatar" />
              <img v-else-if="!user.image && user.civilite == 'M.' " class="rounded-circle header-profile-user" src="/public/images/office-man.png" alt="Header Avatar" />
              <img v-else-if="!user.image && user.civilite != 'M.' " class="rounded-circle header-profile-user" src="/public/images/woman.png" alt="Header Avatar" />

              <span class="d-none d-xl-inline-block ms-1 fw-medium font-size-15">{{ user.nom + ' ' + user.prenom }}</span>

           </button>
           </div>

        </div>
      </div>
    </header>
    
  </ClientOnly>
</template>
