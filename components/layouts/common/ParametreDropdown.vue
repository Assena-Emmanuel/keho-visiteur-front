<template>
    <BDropdown variant="white" class="dropdown d-inline-block" toggle-class="header-item noti-icon" right menu-class="dropdown-menu-lg dropdown-menu-end p-0">
      <template #button-content>
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
        <!-- <a href="#" class="text-reset notification-item">
          <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                Paramètre 1
              </h6>
            </div>
          </div>
        </a> -->
        <nuxt-link to="/login" class="text-reset notification-item">
            <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                Paramètre 1
              </h6>
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="/login" class="text-reset notification-item">
            <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                Paramètre 2
              </h6>
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="/login" class="text-reset notification-item">
            <div class="media d-flex">
            <div class="media-body">
              <h6 class="mt-0 mb-1">
                Paramètre 3
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
  