<script>
import HederLogo from "~/components/layouts/common/HeaderLogo.vue";
// import AppSearch from "~/components/layouts/common/AppSearch.vue";
// import MobileAppSearch from "~/components/layouts/common/MobileAppSearch.vue";
import AppList from "~/components/layouts/common/AppList.vue";
import Notifications from "~/components/layouts/common/Notifications.vue";
import Profile from "~/components/layouts/common/Profile.vue";


export default {
  data() {
    return {
      parametres: ["Paramètre des Visités, Paramètre des Visiteurs, "],
      value: null,
      config: useRuntimeConfig()
    };
  },
  components: {
    HederLogo,
    // AppSearch,
    // MobileAppSearch,
    // LanguageDropdown,
    AppList,
    Notifications,
    Profile
  },
  // mounted() {
  //   this.value = this.languages.find((x) => x.language === this.$i18n.locale);
  //   this.text = this.value.title;
  //   this.flag = this.value.flag;
  // },
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
    logoutUser() {
      const auth = this.config.public.auth;
      if (auth === "firebase") {
        // this.$store.dispatch("auth/logOut");
      } else if (auth === "fakebackend") {
        // this.$store.dispatch("authfack/logout");
      }
      navigateTo({ path: "/login" });
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
          <LayoutsCommonParametreDropdown/>
          <Notifications />
           <div class="d-flex align-items-center">
            <button @click="toggleRightSidebar" class="btn btn-outline-secondary "  style="width: 100%; padding: 1px 3px;">
              <img class="rounded-circle header-profile-user" src="/images/users/avatar-4.jpg" alt="Header Avatar" />
              <span class="d-none d-xl-inline-block ms-1 fw-medium font-size-15">Assena emmanuel</span>
           </button>
           </div>

        </div>
      </div>
    </header>
    
  </ClientOnly>
</template>
