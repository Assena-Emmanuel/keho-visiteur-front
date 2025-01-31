<script>
import { useLayoutStore } from "~/stores/layout";
import apiClient from "~/components/api/intercepteur";
import RadioGroup from "~/components/common/RadioGroup.vue";
import { useAuthStore } from '~/stores/auth'


import {
  layoutOptions,
  widthOptions,
  sideBarTypeOptions,
  topBarOptions,
  layoutModeOptions
} from "~/components/layouts/utils/rightSideBar.js";
// import { NuxtLink } from "#build/components";

export default {
  data() {
    return {
      layoutOptions,
      widthOptions,
      sideBarTypeOptions,
      topBarOptions,
      layoutModeOptions,
      user: authStore.user,
      token: authStore.token,
    };
  },
  components: {
    RadioGroup
  },

  setup() {
    const authStore = useAuthStore()
     // Mettre à jour 'data' avec les valeurs du store

    this.user = authStore.user
    this.token = authStore.token
    return { authStore };
  },
  computed: {
    layoutData() {
      return useLayoutStore() ? useLayoutStore() : {};
    },
    layout: {
      get() {
        return this.layoutData.layoutType;
      },
      set(newVal) {
        useLayoutStore().changeLayoutType(newVal);
      }
    },
    width: {
      get() {
        return this.layoutData.layoutWidth;
      },
      set(newVal) {
        useLayoutStore().changeLayoutWidth(newVal);
      }
    },
    topbar: {
      get() {
        return this.layoutData.topbar;
      },
      set(newVal) {
        useLayoutStore().changeTopBar(newVal);
      }
    },
    sidebarType: {
      get() {
        return this.layoutData.leftSidebarType;
      },

      set(newVal) {
        useLayoutStore().changeLeftSideBarType(newVal);
      }
    },
    mode: {
      get() {
        const mode = this.layoutData.mode;
        document.body.setAttribute("data-bs-theme", mode);
        return this.layoutData.mode;
      },

      set(newVal) {
        useLayoutStore().changeLayoutMode(newVal);
        useLayoutStore().changeLeftSideBarType(newVal);
        useLayoutStore().changeTopBar(newVal);
        document.body.setAttribute("data-bs-theme", newVal);
      }
    }
  },

  
  mounted() {
    this.addEventListener();
    // const authStore = useAuthStore();
    // this.user = authStore.user
    // this.token = authStore.token

  },


  methods: {
    async deconnexion(){
      try {
          const authStore = useAuthStore();
          await  apiClient.post('/auth/logout', {}, {
              headers: {
                Authorization: `Bearer ${token}`, // Utiliser le token dans l'en-tête Authorization
              },
            }).then(response => {
              authStore.logout()
 
              // Rediriger vers la page enregistrée ou vers /dashboard par défaut
              this.$router.push('/login');

            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });

      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        throw error;
      }
      
  },
    profil(){
      this.$router.push({path: "/forms/parametrage-profile"})
      this.hide()
    }, 
    resetPassword(){
      this.$router.push({path: "/forms/new-password"})
      this.hide()
    },
    hide() {
      this.$parent.toggleRightSidebar();
    },
    addEventListener() {
      document.body.addEventListener("click", this.hideRightBar);
    },
    hideRightBar(event) {
      const classes = event.target.classList;

      if (classes.contains("rightbar-overlay")) {
        this.$parent.hideRightSidebar();
      }
    }
  },
  beforeUnmount() {
    document.body.removeEventListener("click", this.hideRightBar);
  }
};
</script>

<template>
  <ClientOnly>
    <div class="right-bar">
      <div data-simplebar class="h-100">
        <div class="rightbar-title px-3 py-4">
          <a href="#" class="right-bar-toggle float-end" @click="hide">
            <i class="mdi mdi-close noti-icon"></i>
          </a>
        </div>
        <div class="p-3">
          <div class="text-center">
            <img class="rounded-circle header-profile-user" style="width: 100px; height: 100px;" :src="`data:${user.imageType};base64,${user.image}`" alt="Header Avatar" />
            <div class="ms-1 fw-medium font-size-12">{{ user.nom +' '+ user.prenom}}</div>
            <div class="ms-1 fw-medium font-size-12 text-primary">{{user.email}}</div>
            <div><BBadge variant="secondary">{{ user.role.libelle }}</BBadge></div>
          </div>
          <div class="mt-5">
            <button class="btn  btnParam" @click="profil">
              <div class="row ms-1">
                <div class="col-2 bg rounded-3 d-flex justify-content-center align-items-center icone">
                  <span class="font-size-20" ><i class="uil uil-user"></i></span>
                </div>
                <div class="col-9 text-start">
                  <div><span class="font-size-12 ">Mon profil</span></div>
                  <div><span class="font-size-12 text-primary">Parametrage du profil</span></div>
                </div>
              </div>
            </button>
            <button class="btn btnParam" @click="resetPassword">
              <div class="row ms-1">
                <div class="col-1 rounded-3 d-flex justify-content-center align-items-center icone">
                  <span ><i class="uil uil-lock"></i></span>
                </div>
                <div class="col-9 text-start">
                  <div><span class="font-size-12 ">Mot de passe </span></div>
                  <div><span class="font-size-12 text-primary">Changer de mot de passe</span></div>
                </div>
              </div>
            </button>
          </div>
          <div class="text-center mt-5">
            <BButton variant="outline-danger" @click="deconnexion">
              <i class="uil uil-sign-out-alt font-size-18 align-middle me-1"></i>
              <span class="align-middle">Déconnexion</span>
            </BButton>
          </div>
        
      </div>
    </div>
    </div>
  </ClientOnly>
  <div class="rightbar-overlay"></div>
</template>

<style lang="scss">
.right-sidebar-radio-group .form-check {
  margin-bottom: 10px !important;
}
</style>

<style>
.icone{
  background: linear-gradient(rgba(135, 206, 235, 0.6), rgba(135, 206, 235, 0.6));
  width: 50px;
  height: 50px;
}
.btnParam {
  width: 230px;
}

</style>
