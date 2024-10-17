<template>
  <div>
    <QrcodeStream @decode="onDecode" @init="onInit" />
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



<style>
/* Ajoute le style nécessaire si besoin */
</style>

<!-- <style>
.qr-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('/path/to/your/background-image.jpg'); 
  background-position: center;
}


.camera-box {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); 
  border-radius: 8px;
}
</style> -->
