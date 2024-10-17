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
  height: 100vh;
  background-image: url('/images/bg-qrcode.png'); 
  background-position: center;
}





</style>