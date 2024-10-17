<template>
  <div class="qr-container">
    <div class="camera-box">
      <QrcodeStream @decode="onDecode" @init="onInit" />
    </div>
    <!-- Autres composants QR code si nécessaires -->
  </div>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';

definePageMeta({
  layout: "utility"
});

export default {
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
  },
  methods: {
    onDecode(result) {
      console.log(result);
    },
    onInit(promise) {
      promise
        .then(() => {
          console.log('Successfully initialized!');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
/* Container for the QR code scanner */
.qr-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-position: center;
}

/* Styling the camera box where the QR scanner appears */
.camera-box {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); /* Couleur de fond semi-transparente */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombre pour effet 3D */
}
</style>
