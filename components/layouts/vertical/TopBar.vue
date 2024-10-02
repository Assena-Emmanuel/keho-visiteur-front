<script>
import { LanguagesWithFlag } from "~/components/layouts/utils/topBar.js";
import HederLogo from "~/components/layouts/common/HeaderLogo.vue";
import AppSearch from "~/components/layouts/common/AppSearch.vue";
import MobileAppSearch from "~/components/layouts/common/MobileAppSearch.vue";
import LanguageDropdown from "~/components/layouts/common/LanguageDropdown.vue";
import AppList from "~/components/layouts/common/AppList.vue";
import Notifications from "~/components/layouts/common/Notifications.vue";
import Profile from "~/components/layouts/common/Profile.vue";

export default {
  data() {
    return {
      languages: LanguagesWithFlag,
      current_language: this.$i18n.locale,
      text: null,
      flag: null,
      value: null,
      config: useRuntimeConfig()
    };
  },
  components: {
    HederLogo,
    AppSearch,
    MobileAppSearch,
    LanguageDropdown,
    AppList,
    Notifications,
    Profile
  },
  mounted() {
    this.value = this.languages.find((x) => x.language === this.$i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
  },
  methods: {
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    setLanguage(data) {
      const { language, country, flag } = data;
      this.$i18n.locale = language;
      this.current_language = language;
      this.text = country;
      this.flag = flag;
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

          <button type="button" class="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn" id="vertical-menu-btn" @click="toggleMenu">
            <i class="fa fa-fw fa-bars"></i>
          </button>
          <AppSearch />
        </div>

        <div class="d-flex align-items-center">
          <!-- <MobileAppSearch />
          <LanguageDropdown :flag="flag" :languages="languages" :current_language="current_language" @onChange="setLanguage" />
          <AppList />

          <div class="dropdown d-none d-lg-inline-block ms-1">
            <button type="button" class="btn header-item noti-icon waves-effect" data-toggle="fullscreen" @click="initFullScreen">
              <i class="uil-minus-path"></i>
            </button>
          </div> -->
          <Notifications />
          <!-- <Profile @logoutUser="logoutUser"  /> -->
           <button @click="toggleRightSidebar" class="btn btn-outline-secondary " right  style="width: 100%; padding: 1px 3px;">
            <div class="px-1">
              <img class="rounded-circle header-profile-user" src="/images/users/avatar-4.jpg" alt="Header Avatar" />
              <span class="d-none d-xl-inline-block ms-1 fw-medium font-size-15">Assena emmanuel</span>
            </div>
           </button>
         
          <!-- <div class="dropdown d-inline-block">
            <button type="button" class="btn header-item noti-icon right-bar-toggle toggle-right" @click="toggleRightSidebar">
              <i class="uil-cog toggle-right"></i>
            </button>
          </div> -->
        </div>
      </div>
    </header>
  </ClientOnly>
</template>
