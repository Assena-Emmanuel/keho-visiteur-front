<template>
  <div class="qr-page">
    <div class="text-center instruction">
      Veuillez scanner le QR-Code en maintenant l'image au centre
    </div>
    <div class="qr-container">
      <div class="camera-box">
        <QrcodeStream ref="qrcodeStream" @detect="onDetect" />
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
  data() {
    return {
      result: null,  // initialisé à null
      error: null,   // initialisé à null
    };
  },
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
  },
  methods: {
    // Méthode pour dessiner les bordures
    paintBoundingBox(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: { x, y, width, height }
        } = detectedCode;

        // Configuration du style de la bordure
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#007bff'; // Couleur de la bordure
        ctx.strokeRect(x, y, width, height); // Dessiner le rectangle
      }
    },

    onDetect(detectedCodes) {
      // Accéder au canvas de l'élément qrcodeStream
      const canvas = this.$refs.qrcodeStream.$el.querySelector('canvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Effacer le canvas pour éviter que les bordures précédentes restent affichées
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // Dessiner les bordures autour des QR codes détectés
          this.paintBoundingBox(detectedCodes, ctx);
        }
      }
      
      // Pour tester : afficher les codes détectés dans la console
      console.log(detectedCodes);
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
