<template>
  <div class="qr-container">
    <div class="camera-box">
      <QrcodeStream @decode="onDecode" @init="onInit" />
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

<style>
/* Appliquer l'image d'arrière-plan à toute la page */
.qr-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('/images/bg-qrcode.png'); /* Remplacez par le chemin de votre image */
  background-size: cover;
  background-position: center;
}

/* Zone de caméra de 300x300 pixels, centrée */
.camera-box {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); /* Optionnel : Ajouter un fond pour mettre en évidence la zone de la caméra */
  border-radius: 8px; /* Optionnel : coins arrondis */
}
</style>
