<template>
    <BDropdown variant="white"  class="dropdown d-inline-block " toggle-class="header-item noti-icon" right menu-class="dropdown-menu-lg dropdown-menu-end p-0">
      <template #button-content >
        <i class="uil-cog toggle-right"></i>
      </template>
  
      <div class="p-3">
        <BRow class="align-items-center">
          <BCol>
            <h4 class="m-0 font-size-16 text-primary">
              Paramètres
            </h4>
          </BCol>
        </BRow>
      </div>
      
      <div style="max-height: 230px" data-simplebar>
        <nuxt-link v-for="menu in menus" :key="menu.id" :to="menu.link" class="text-reset notification-item">
            <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                {{ menu.label }}
              </h6>
            </div>
          </div>
        </nuxt-link>
        <!-- <nuxt-link to="/parametre-service" class="text-reset notification-item">
            <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                Gestion des services 
              </h6>
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="/parametre-profil" class="text-reset notification-item">
            <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                Gestion des profils
              </h6>
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="/parametre-utilisateur" class="text-reset notification-item">
            <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                Gestion des utilisateurs
              </h6>
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="/parametre-agence" class="text-reset notification-item">
            <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                Gestion des agences
              </h6>
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="parametre-menu" class="text-reset notification-item">
            <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                Gestion des menus
              </h6>
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="/parametre-categorie" class="text-reset notification-item">
            <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                Gestion des catégories
              </h6>
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="/parametre-action" class="text-reset notification-item">
            <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                Gestion des actions
              </h6>
            </div>
          </div>
        </nuxt-link> -->
        
        
      </div>
    </BDropdown>
  </template>

  
  <script setup>
  import { defineModel } from "vue";

  const menus = defineModel('menusParam')

  </script>
  