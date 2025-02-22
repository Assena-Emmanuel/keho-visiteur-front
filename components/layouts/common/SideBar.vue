<script>
import { menuItems } from "~/components/layouts/utils/menu.js";
import MetisMenu from "metismenujs";
import { useAuthStore } from "~/stores/auth.js";
import { useApi } from '~/components/api/useApi';
import apiClient from "~/components/api/intercepteur";


export default {
  setup(){
    const authStore = useAuthStore()
    const { getAll, createResource } = useApi(authStore.token);

    return{
      authStore,getAll, createResource
    }

  },
  data() {
    return {
      menuItems,
      menus: []
    };
  },
  props: {
    type: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: true
    }
  },
  computed: {
    filteredMenus() {
      return this.menus.filter(item => item.type === 'SIDE');
    }
  },

  watch: {
    type: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.body.setAttribute("data-sidebar", "dark");
              document.body.removeAttribute("data-topbar");
              document.body.removeAttribute("data-sidebar-size");
              break;
            case "light":
              document.body.setAttribute("data-sidebar", "light");
              document.body.removeAttribute("data-sidebar-size");
              document.body.classList.remove("vertical-collpsed");
              break;
            case "compact":
              document.body.setAttribute("data-sidebar-size", "small");
              document.body.setAttribute("data-sidebar", "dark");
              document.body.classList.remove("vertical-collpsed");
              document.body.removeAttribute("data-topbar", "dark");
              break;
            case "icon":
              document.body.setAttribute("data-keep-enlarged", "true");
              document.body.classList.add("vertical-collpsed");
              document.body.setAttribute("data-sidebar", "dark");
              document.body.removeAttribute("data-topbar", "dark");
              break;
            case "colored":
              document.body.setAttribute("data-sidebar", "colored");
              document.body.removeAttribute("data-keep-enlarged");
              document.body.classList.remove("vertical-collpsed");
              document.body.removeAttribute("data-sidebar-size");
              break;
            default:
              document.body.setAttribute("data-sidebar", "dark");
              break;
          }
        }
      }
    },
    width: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "boxed":
              document.body.setAttribute("data-layout-size", "boxed");
              break;
            case "fluid":
              document.body.setAttribute("data-layout-mode", "fluid");
              document.body.removeAttribute("data-layout-size");
              break;
            default:
              document.body.setAttribute("data-layout-mode", "fluid");
              break;
          }
        }
      }
    }
  },
  async mounted() {
    const element = document.getElementById("side-menu");
    if (element) {
      new MetisMenu("#side-menu");
      this._activateMenuDropdown();

      this.$router.afterEach((routeTo, routeFrom) => {
        this._activateMenuDropdown();
      });
    }

    
    // Recuperation des menus en fonction du role connecté
    const response = await apiClient.get(`/menu_by_role/${this.authStore.user.role_id}`, 
      {
      headers: {
          'Authorization': `Bearer ${this.authStore.token}`,  // Utilisation du token d'authentification
        },
      })

    if(!response.data.error){
      this.menus = response.data
      console.log("Sidebar--------- "+JSON.stringify(this.menus))

    }else{
      console.error("Menu error: "+response.message)
    }

  },
  methods: {
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    hasItems(item) {
      return item.subItems !== undefined ? item.subItems.length > 0 : false;
    },
    /**
     * remove active and mm-active class
     */
    _removeAllClass(className) {
      const els = document.getElementsByClassName(className);
      while (els[0]) {
        els[0].classList.remove(className);
      }
    },
    _activateMenuDropdown() {
      this._removeAllClass("mm-active");
      this._removeAllClass("mm-show");

      var links = document.getElementsByClassName("side-nav-link-ref");
      var matchingMenuItem = null;
      const paths = [];

      for (var i = 0; i < links.length; i++) {
        paths.push(links[i]["pathname"]);
      }
      var itemIndex = paths.indexOf(window.location.pathname);
      if (itemIndex === -1) {
        const strIndex = window.location.pathname.lastIndexOf("/");
        const item = window.location.pathname.substr(0, strIndex).toString();
        matchingMenuItem = links[paths.indexOf(item)];
      } else {
        matchingMenuItem = links[itemIndex];
      }

      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");
        var parent = matchingMenuItem.parentElement;

        /**
         * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
         * We should come up with non hard coded approach
         */

        if (parent) {
          parent.classList.add("mm-active");
          const parent2 = parent.parentElement.closest("ul");

          if (parent2 && parent2.id !== "side-menu") {
            parent2.classList.add("mm-show");

            const parent3 = parent2.parentElement;
            if (parent3) {
              parent3.classList.add("mm-active");
              var childAnchor = parent3.querySelector(".has-arrow");
              var childDropdown = parent3.querySelector(".has-dropdown");

              if (childAnchor) childAnchor.classList.add("mm-active");

              if (childDropdown) childDropdown.classList.add("mm-active");

              const parent4 = parent3.parentElement;
              if (parent4 && parent4.id !== "side-menu") {
                parent4.classList.add("mm-show");
                const parent5 = parent4.parentElement;

                if (parent5 && parent5.id !== "side-menu") {
                  parent5.classList.add("mm-active");
                  const childanchor = parent5.querySelector(".is-parent");

                  if (childanchor && parent5.id !== "side-menu") {
                    childanchor.classList.add("mm-active");

                  }
                }
              }
            }
          }
        }
      }
      
    }
  }
};
</script>

<template>
  <div class="vertical-menu">
    <div class="navbar-brand-box ">
      <nuxt-link to="/" class="logo logo-dark" style="padding-left: 27%;">
        <span class="logo-sm" >
          <img src="/images/total.jpg" alt height="22" />
        </span>
        <span class="logo-lg">
          <img src="/images/total.jpg" alt height="70" />
        </span>
      </nuxt-link>
    </div>

    <BButton variant="white" style="width: 70px;" type="button" @click="toggleMenu" class="px-3 font-size-16 header-item vertical-menu-btn">
      <i class="fa fa-fw fa-bars"></i>
    </BButton>

    <div data-simplebar class="sidebar-menu-scroll">
      <div id="sidebar-menu">
        <ul class="metismenu list-unstyled" id="side-menu">
          <template v-for="item in filteredMenus" :key="item.id">
            <!-- <li class="menu-title" v-if="item.label" :key="item.id">
              {{ $t(item.label) }}
            </li> -->
            <li v-if="!item.isTitle && !item.isLayout" :key="item.id">
              <a v-if="hasItems(item)" href="javascript:void(0);" class="is-parent" :class="{
                'has-arrow': !item.badge,
                'has-dropdown': item.badge
              }">
                <i :class="`${item.icon}`" v-if="item.icon"></i>
                <span>{{ $t(item.label) }}</span>
                <span :class="`badge rounded-pill bg-${item.badge.variant} float-end`" v-if="item.badge">{{ $t(item.badge.text) }}</span>
              </a>


              <nuxt-link :to="item.link" v-if="!hasItems(item)" class="side-nav-link-ref">
                  <img 
                    v-if="item.icon" 
                    :src="$route.path === item.link ? item.icon+'.png' : item.icon+'-desactive.png'" 
                    width="25px" class="me-2" alt=""
                  >
                  <!-- <img v-else :src="`${item.icon.desactive}`" width="30px" class="me-2" alt=""> -->
                  <span :style="{color : $route.path === item.link ? '#378DEA':'#878787' }">{{ $t(item.label) }}</span>
                  <!-- <span :class="`badge rounded-pill bg-${item.badge.variant} float-end`" v-if="item.badge">{{ $t(item.badge.text) }}</span> -->
              </nuxt-link>


            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
