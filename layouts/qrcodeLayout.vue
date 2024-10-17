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
        <TopBarQrCode />
        <div>
            <slot />
        </div>
    </div>
</template>

<style>
.qr-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/bg-qrcode.png');
  background-position: center;
}





</style>