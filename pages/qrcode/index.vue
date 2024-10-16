<template>
  <div>
    <QrcodeStream @decode="onDecode" @init="onInit" />
    <!-- Autres composants QR code si nécessaires -->
  </div>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';

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
/* Ajoute le style nécessaire si besoin */
</style>
