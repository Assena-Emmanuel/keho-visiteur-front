<template>
    <div>
      <h3>Prendre une photo</h3>
      <video ref="video" autoplay playsinline></video>
      <canvas ref="canvas" style="display:none;"></canvas>
      
      <div>
        <button @click="startCamera">Démarrer la caméra</button>
        <button @click="capturePhoto">Prendre une photo</button>
      </div>
      
      <div v-if="photo">
        <h4>Prévisualisation de la photo</h4>
        <img :src="photo" alt="Photo capturée" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        photo: null
      };
    },
    methods: {
      async startCamera() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          this.$refs.video.srcObject = stream;
        } catch (error) {
          console.error("Erreur d'accès à la caméra :", error);
        }
      },
      capturePhoto() {
        const video = this.$refs.video;
        const canvas = this.$refs.canvas;
  
        // Dessiner l'image vidéo dans le canvas
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
        // Obtenir l'image sous forme de Data URL
        this.photo = canvas.toDataURL('image/png');
  
        // Arrêter le flux vidéo après la capture
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    }
  };
  </script>
  
  <style scoped>
  video {
    width: 100%;
    max-width: 400px;
    border: 2px solid #ccc;
    margin-bottom: 20px;
  }
  
  img {
    width: 100%;
    max-width: 400px;
    border: 2px solid #ccc;
    margin-top: 20px;
  }
  </style>
  