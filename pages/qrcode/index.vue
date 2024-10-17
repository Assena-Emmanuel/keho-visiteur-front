<template>
  <div class="qr-page">
    <div class="text-center instruction">
      Veuillez scanner le QR-Code en maintenant l'image au centre
    </div>
    <div class="qr-container">
      <div class="camera-box">
        <QrcodeStream @decode="onDecode" @init="onInit" />
      </div>
    </div>
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
.qr-page {
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  
}

.instruction {
  margin-top: 4em;
  font-size: 2.5rem;
  color: white;
}

.qr-container {
  display: flex;
}

.camera-box {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Slight shadow for depth */
}

</style>
