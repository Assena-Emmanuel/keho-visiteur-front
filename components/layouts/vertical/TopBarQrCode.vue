<script>
import HederLogo from "~/components/layouts/common/HeaderLogo.vue";

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
  },

};
</script>

<template>
    <header id="page-topbar-qr">
      <div class="navbar-header-qr">
        <div class="d-flex justify-content-end gap-3">
          <div class="navbar-brand-box-qr">
            <div>
              <span class="logo-sm d-md-none d-sm-block">
                <img src="/images/total.jpg" alt="logo-sm" height="32" />
              </span>
              <span class="logo-lg d-md-block d-sm-none">
                <img src="/images/total.jpg" alt="logo-dark" height="70" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
</template>

<style scoped>
#page-topbar-qr {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #fff; /* Changez cette couleur selon vos besoins */
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-header-qr {
  width: 100%;
}

.navbar-brand-box-qr {
  display: flex;
  align-items: center;
}

</style>
