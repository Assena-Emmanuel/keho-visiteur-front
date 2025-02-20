<script>
import TopBarQrCode from '~/components/layouts/vertical/TopBarQrCode.vue';
export default {
  mounted() {
    document.body.classList.add("authentication-bg");
  },
  components: {
    TopBarQrCode
  }
};

</script>

<template>
    <div class="qr-container">
        <header id="page-topbar-qr">
            <div class="text-center">
                <h2 style="color: red;">Recapitulatif</h2>
            </div>
        </header>
        <div>
            <slot />
        </div>
    </div>
</template>

<style>
.qr-container {
  display: flex;
  justify-content: center;
  height: 100%;
  background-image: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('/images/bg-qrcode.png');
  background-position: center;
}

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