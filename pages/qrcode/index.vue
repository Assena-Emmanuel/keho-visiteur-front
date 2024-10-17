<template>
  <div class="qr-page">
    <div class="text-center instruction">
      Veuillez scanner le QR-Code en maintenant l'image au centre
    </div>
    <div class="qr-container">
      <div class="camera-box">
        <qrcode-stream ref="qrcodeStream" @detect="onDetect" @error="onError"></qrcode-stream>
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
  data(){
    return{
      result: null,  // initialisé à null
      error: null,   // initialisé à null
    }
  },
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
  },
  methods: {
    paintBoundingBox(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: { x, y, width, height }
        } = detectedCode;

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#007bff';
        ctx.strokeRect(x, y, width, height);
      }
    },
    onError(err) {
      this.error = `[${err.name}]: `;

      if (err.name === 'NotAllowedError') {
        this.error += 'you need to grant camera access permission';
      } else if (err.name === 'NotFoundError') {
        this.error += 'no camera on this device';
      } else if (err.name === 'NotSupportedError') {
        this.error += 'secure context required (HTTPS, localhost)';
      } else if (err.name === 'NotReadableError') {
        this.error += 'is the camera already in use?';
      } else if (err.name === 'OverconstrainedError') {
        this.error += 'installed cameras are not suitable';
      } else if (err.name === 'StreamApiNotSupportedError') {
        this.error += 'Stream API is not supported in this browser';
      } else if (err.name === 'InsecureContextError') {
        this.error += 'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
      } else {
        this.error += err.message;
      }
    },
    onDetect(detectedCodes) {
      const canvas = this.$refs.qrcodeStream.$el.querySelector('canvas');
      const ctx = canvas.getContext('2d');
      this.paintBoundingBox(detectedCodes, ctx);
      this.result = JSON.stringify(
        detectedCodes.map(code => code.rawValue)
      );
    }
  }
};
</script>


<style scoped>
.qr-page {
  display: flex;
  height: 100vh;
  flex-direction: column;
  
}

.instruction {
  margin-top: 3em;
  font-size: 2.5rem;
  color: white;

  @media (max-width: 1200px) {
    font-size: 2.5rem; 
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 25px;
  }

  @media (max-width: 320px) {
    font-size: 25px;
}
}

.qr-container {
  display: flex;
  justify-content: center;
}

.camera-box {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  border: 4px solid #ccc;
  margin-top: 3em;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(172, 171, 171, 0.1); /* Slight shadow for depth */

  @media (max-width: 768px) {
    width: 220px;
    height: 220px;
    margin-top: 4em;
  }

  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
    margin-top: 6em;
  }

  /* @media (max-width: 320px) {
    width: 200px;
    height: 200px;
    margin-top: 3em;
} */
}




</style>
