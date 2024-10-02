<script>
import { useLayoutStore } from "~/stores/layout";
import RadioGroup from "~/components/common/RadioGroup.vue";
import {
  layoutOptions,
  widthOptions,
  sideBarTypeOptions,
  topBarOptions,
  layoutModeOptions
} from "~/components/layouts/utils/rightSideBar.js";

export default {
  data() {
    return {
      layoutOptions,
      widthOptions,
      sideBarTypeOptions,
      topBarOptions,
      layoutModeOptions
    };
  },
  components: {
    RadioGroup
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
  },
  methods: {
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
            <img class="rounded-circle header-profile-user" style="width: 100px; height: 100px;"src="/images/users/avatar-4.jpg" alt="Header Avatar" />
            <div class="ms-1 fw-medium font-size-12">Assena Emanuel yao</div>
            <div class="ms-1 fw-medium font-size-12 text-primary">assenaemmanuel3@outlook.com</div>
          </div>
          <div class="mt-5">
            <button class="btn">
              <div class="row ms-3">
                <div class="col-2 border border-info-1 d-flex justify-content-center align-items-center ">
                  <span >ICON</span>
                </div>
                <div class="col-9 text-start">
                  <div><span class="font-size-12 ">Mon profil</span></div>
                  <div><span class="font-size-12">Parametrage du profile</span></div>
                </div>
              </div>
            </button>
            <button class="btn">
              <div class="row ms-3">
                <div class="col-2 border border-info-1 d-flex justify-content-center align-items-center ">
                  <span >ICON</span>
                </div>
                <div class="col-9 text-start">
                  <div><span class="font-size-12 ">Mot de passe </span></div>
                  <div><span class="font-size-12">Changer de mot de passe</span></div>
                </div>
              </div>
            </button>
          </div>
          <!-- <h6 class="mb-0">Layout</h6>
          <hr class="border-1 border-top border-secondary mt-2" />
          <BFormRadioGroup class="right-sidebar-radio-group" v-model="layout" :options="layoutOptions" stacked />

          <h6 class="mb-0 mt-4">Layout mode</h6>
          <hr class="border-1 border-top border-secondary mt-2" />
          <BFormRadioGroup class="right-sidebar-radio-group" v-model="mode" :options="layoutModeOptions" stacked />

          <h6 class="mb-0 mt-4">Width</h6>
          <hr class="border-1 border-top border-secondary mt-2" />
          <BFormRadioGroup class="right-sidebar-radio-group" v-model="width" :options="widthOptions" stacked />
          <div v-if="layout === 'vertical'">
            <h6 class="mb-0 mt-4">Sidebar</h6>
            <hr class="border-1 border-top border-secondary mt-2" />
            <BFormRadioGroup class="right-sidebar-radio-group" v-model="sidebarType" :options="sideBarTypeOptions" stacked />
          </div>
          <div v-if="layout === 'horizontal'">
            <h6 class="mb-0 mt-4">Top Bar</h6>
            <hr class="border-1 border-top border-secondary mt-2" />
            <BFormRadioGroup class="right-sidebar-radio-group" v-model="topbar" :options="topBarOptions" stacked />
          </div> -->
        
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
