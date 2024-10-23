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
          Appareil photo {{ appareilRecto }}
        </BFormCheckbox>
      </div>

      <div class="row align-items-end">
          <div  class="col-lg-5 position-relative"> <!-- Ajout de position-relative ici -->
            <video class="border border-secondary" id="video" ref="video" autoplay style="display: none;"></video>
            <div class="button-container d-flex gap-3 px-3"  style="position: absolute; bottom: 10px; left: 10px; right: 10px;"> <!-- Positionnement absolu -->
                <button class="btn btn-primary"  @click="takeSnapshot()" id="click-photo" :style="{ display: !affichebtn ? 'none' : 'block' }"> 
                    <i class="fas fa-camera-retro"></i> Capturer Recto
                </button>
                
                <button class="btn btn-secondary" @click="reset" id="resetBtn" :style="{ display: !affichebtn ? 'none' : 'block' }">
                    <i class="fas fa-sync-alt"></i> Réinitialisation
                </button>
            </div>
          </div>
          <!-- <div  class="col-lg-5 position-relative"> 
            <video class="border border-secondary" id="videoVerso" ref="videoVerso" autoplay style="display: none;"></video>
            <div class="button-container d-flex gap-3 px-3"  style="position: absolute; bottom: 10px; left: 10px; right: 10px;"> 
                <button class="btn btn-primary"  @click="takeSnapshot()" id="click-photo" :style="{ display: !affichebtn ? 'none' : 'block' }"> 
                    <i class="fas fa-camera-retro"></i> Capturer Verso
                </button>
                
                <button class="btn btn-secondary" @click="reset" id="resetBtn" :style="{ display: !affichebtn ? 'none' : 'block' }">
                    <i class="fas fa-sync-alt"></i> Réinitialisation
                </button>
            </div>
          </div> -->
         
          <div class="col-lg-5">
              <canvas id="canvas" ref="canvas" width="420" height="240" style="display: none;"></canvas>
          </div>
            <!-- <div class="col-lg-5">
                <canvas id="canvasverso" ref="canvasVerso" width="420" height="240" style="display: none;"></canvas>
            </div> -->
      </div>

        <!-- <div class="row justify-content-center mt-2">
          <div class="d-flex gap-3">
            <button class="btn btn-primary" @click="takeSnapshot" id="click-photo" style="display: none;">
              <i class="fas fa-camera-retro"></i> Prendre une photo
            </button>
            <button class="btn btn-secondary" @click="reset" id="resetBtn" style="display: none;">
              <i class="fas fa-sync-alt"></i> Réinitialisation
            </button>
          </div>
        </div> -->


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
          this.affichebtn = !this.affichebtn
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
        if (this.videoVerso) {
          this.videoVerso.srcObject = stream;
          this.videoVerso.style.display = 'block';
          this.video.style.display = 'none';
          this.toggleButtons(true);
          this.affichebtn = !this.affichebtn

          this.appareilRecto = false
          this.appareilVerso = !this.appareilVerso
        }
      } catch (error) {
        alert(error.message);
      }
    },

    takeSnapshot() {
      if (this.canvas && this.video) {
        const ctx = this.canvas.getContext('2d');
        
        // Set canvas size to match the video size
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;

        // Draw the video frame to the canvas
        ctx.drawImage(this.video, 0, 0);

        // Get the image data URL from the canvas
        this.imageDataUrl = this.canvas.toDataURL('image/jpeg');

        // Display the canvas and make it visible
        this.canvas.style.display = 'block'; // Make the canvas visible

        // Display the download section
        document.getElementById('downloadDIV').style.display = 'block'; // Show download options
      }
    },

    takeSnapshotVerso() {
      if (this.canvasVerso && this.video) {
        const ctx = this.canvasVerso.getContext('2d');
        
        // Set canvas size to match the video size
        this.canvasVerso.width = this.video.videoWidth;
        this.canvasVerso.height = this.video.videoHeight;

        // Draw the video frame to the canvas
        ctx.drawImage(this.video, 0, 0);

        // Get the image data URL from the canvas
        this.imageDataUrl = this.canvasVerso.toDataURL('image/jpeg');

        // Display the canvas and make it visible
        this.canvasVerso.style.display = 'block'; // Make the canvas visible

        // Display the download section
        document.getElementById('downloadDIV').style.display = 'block'; // Show download options
      }
    },

    reset() {
      if (this.video) {
        //this.video.style.display = 'none';
        this.afficheCamera = false; // Update afficheCamera when resetting the camera
        this.toggleButtons(false);
        if (this.canvas) {
          this.canvas.style.display = 'none';
        }
        document.getElementById('downloadDIV').style.display = 'none';
        this.fileName = '';
        this.imageDataUrl = null;
      }
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