<template>
    <BDropdown variant="white"  class="dropdown d-inline-block " toggle-class="header-item noti-icon" right menu-class="dropdown-menu-lg dropdown-menu-end p-0">
      <template #button-content >
        <i class="uil-cog toggle-right"></i>
      </template>
  
      <div class="p-3">
        <BRow class="align-items-center">
          <BCol>
            <h4 class="m-0 font-size-16">
              Paramètres
            </h4>
          </BCol>
        </BRow>
      </div>
      
      <div style="max-height: 230px" data-simplebar>
        <nuxt-link to="/parametre-departement" class="text-reset notification-item">
            <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                Gestion des départements 
              </h6>
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="/parametre-service" class="text-reset notification-item">
            <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                Gestion des services 
              </h6>
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="//parametres/menus" class="text-reset notification-item">
            <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                Gestion des menus
              </h6>
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="/login" class="text-reset notification-item">
            <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                Gestion des catégories
              </h6>
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="/login" class="text-reset notification-item">
            <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                Gestion des profils
              </h6>
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="/login" class="text-reset notification-item">
            <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                Gestion des utilisateurs
              </h6>
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="/login" class="text-reset notification-item">
            <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                Gestion des agences
              </h6>
            </div>
          </div>
        </nuxt-link>
        
      </div>
    </BDropdown>
  </template>

  
  <script>
  export default {
    // Votre logique ici
  };
  </script>
  