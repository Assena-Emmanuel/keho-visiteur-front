<template>
  <div>
    <h5 class="text-center">Joindre la pièce</h5>
    
    <div class="mb-2">
      <div v-if="afficheCamera==false" class="row">
        <div class="col-md-6">
          <label for="rectoFile" class="form-label">Recto</label>
          <input class="form-control form-control-sm" @change="handleFileChange('rectoFile')" type="file" id="rectoFile">
          <!-- <input class="form-control form-control-sm" v-model="rectoFile" type="file" id="rectoFile"> -->
        </div>
        <div class="col-md-6">
          <label for="versoFile" class="form-label">Verso</label>
          <input class="form-control form-control-sm" @change="handleFileChange('versoFile')" type="file" id="rectoFile">
          <!-- <input class="form-control form-control-sm" v-model="versoFile" type="file" id="versoFile"> -->
        </div>
      </div>

      <div v-if="afficheCamera" class="row text-center">
        <div class="col-6">
          <button class="btn btn-primary mb-2" @click="rectoStartCamera" id="start-camera">
            <i class="fas fa-camera"></i> Recto
          </button>
        </div>
        <div class="col-6">
          <button class="btn btn-primary mb-2" @click="versoStartCamera" id="start-camera">
            <i class="fas fa-camera"></i> Verso
          </button>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-4">
        <BFormCheckbox
            v-model="afficheCamera"
            name="camera"
            @click="choisirAppareil"
            class="border border-secondary"
        >
          Appareil photo 
        </BFormCheckbox>
      </div>

      <div class="row align-items-end">
          <div  class="col-lg-5 position-relative"> <!-- Ajout de position-relative ici -->
            <video class="border border-secondary" id="video" ref="video" autoplay style="display: none;"></video>
            <div class="button-container d-flex gap-3 px-3"  style="position: absolute; bottom: 10px; left: 10px; right: 10px;"> <!-- Positionnement absolu -->
                <button class="btn btn-primary" @click="takeSnapshot('canvas', 'rectoFichiercache')" id="click-photo" :style="{ display: !appareilRecto ? 'none' : 'block' }"> 
                    <i class="fas fa-camera-retro"></i> <span class="d-md-block d-none">Capturer Recto</span><span class="d-md-none d-block">Recto</span>
                </button>
                <button class="btn btn-primary" @click="takeSnapshot('canvasVerso', 'versoFichiercache')" id="click-photo" :style="{ display: !appareilVerso ? 'none' : 'block' }"> 
                    <i class="fas fa-camera-retro"></i> <span class="d-md-block d-none">Capturer Verso</span><span class="d-md-none d-block">Verso</span>
                </button>
                
                <button class="btn btn-secondary" @click="reset('canvas')" id="resetBtn" :style="{ display: !appareilRecto  ? 'none' : 'block' }">
                    <i class="fas fa-sync-alt"></i> <span class="d-md-block d-none">Réinitialisation</span>
                </button>
                <button class="btn btn-secondary" @click="reset('canvasVerso')" id="resetBtn" :style="{ display: !appareilVerso ? 'none' : 'block' }">
                    <i class="fas fa-sync-alt"></i> <span class="d-md-block d-none">Réinitialisation</span>
                </button>
              
            </div>
          </div>

         
          <div class="col-lg-5">
              <canvas id="canvas" ref="canvas" width="420" height="240" style="display: none;"></canvas>
              <input type="hidden" v-model="rectoFichiercache">
          </div>
          <div class="col-lg-5 mt-2">
              <canvas id="canvasVerso" ref="canvasVerso" width="420" height="240" style="display: none;"></canvas>
              <input type="hidden" v-model="versoFichiercache">
          </div>
      </div>

    <div class="row justify-content-end p-3" id="downloadDIV" style="display: none;">
      <div class="col-md-6">
        <input class="form-control" type="text" v-model="fileName" placeholder="Enter File Name" />
      </div>
      <div class="col-md-6 text-end">
        <a :href="imageDataUrl" class="btn btn-link" id="downloadID" :download="`${fileName}.jpeg`">Download</a>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      video: null,
      videoVerso: null,
      canvas: null,
      canvasVerso: null,
      imageDataUrl: null,
      fileName: '',
      afficheCamera: false, 
      affichebtn: false,
      rectoFile: '',
      versoFile: '',
      appareilRecto: false,
      appareilVerso: false,
      rectoFichiercache: null,
      versoFichiercache: null
    };
  },

  methods: {
    handleFileChange(event, typeFile) {
      this[typeFile] = event.target.files[0];
    },
    choisirAppareil(){
      if(this.afficheCamera){
        this.video.style.display = 'none';
        this.affichebtn = false
        this.appareilRecto = false
        this.appareilVerso = false
        this.reset('canvasVerso')
        this.reset('canvas')
      }
      this.afficheCamera=!this.afficheCamera
    },
    isMobileDevice() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    async rectoStartCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: this.isMobileDevice() ? "environment" : "user" // Rear camera on mobile, front on desktop
          }
        });

        if (this.video) {
          this.video.srcObject = stream;
          this.video.style.display = 'block';
          this.toggleButtons(true);
          this.affichebtn = true
          this.appareilRecto = !this.appareilRecto
          this.appareilVerso = false
        }

      } catch (error) {
        alert(error.message);
      }
    },

    async versoStartCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: this.isMobileDevice() ? "environment" : "user" // Rear camera on mobile, front on desktop
          }
        });
        if (this.video) {
          this.video.srcObject = stream;
          this.video.style.display = 'block'
          this.toggleButtons(true);
          this.affichebtn = true

          this.appareilRecto = false
          this.appareilVerso = !this.appareilVerso
        }
      } catch (error) {
        alert(error.message);
      }
    },

    takeSnapshot(canvas, hiddenInput) {
        if (this[canvas] && this.video) {
            const ctx = this[canvas].getContext('2d');
            // Ajuster la taille du canvas à la vidéo
            this[canvas].width = this.video.videoWidth;
            this[canvas].height = this.video.videoHeight;
            // Dessiner la vidéo sur le canvas
            ctx.drawImage(this.video, 0, 0);
            // Obtenir l'image sous forme de data URL (Base64)
            const imageDataUrl = this[canvas].toDataURL('image/jpeg');
            // Affecter la valeur à l'input hidden correspondant
            this[hiddenInput] = imageDataUrl;
            // Afficher le canvas
            this[canvas].style.display = 'block';
        }
    },

    reset(canvas) {
        // Réinitialiser l'image du canvas
        this[canvas].getContext('2d').clearRect(0, 0, this[canvas].width, this[canvas].height);
        this[canvas].style.display = 'none';

    },

    toggleButtons(show) {
      const displayStyle = show ? 'block' : 'none';
      document.getElementById('click-photo').style.display = displayStyle;
      document.getElementById('resetBtn').style.display = displayStyle;
    },
  },

  mounted() {
    this.video = this.$refs.video; // Access the video ref
    this.canvas = this.$refs.canvas; // Access the canvas ref
    this.canvasVerso = this.$refs.canvasVerso; // Access the canvas ref
  },
};
</script>

<style scoped>
button {
  width: 100%;
}
video, canvas {
  width: 100%; /* Ensure both video and canvas take full width */
  border-radius: 5px; /* Optional: add some rounded corners */
}
</style>