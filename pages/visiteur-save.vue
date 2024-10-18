<template>
    <div id="msg">
    <BCard
        no-body 
        class="mx-3 border-0"
        title="Je m'identifie"
        style="background-color: white;"
        id="qr-topbar"
    >
        <BCardBody>
            
            <div class="d-flex justify-content-center">
                <div>
                    <img src="/images/total.jpg" alt="logo-light" height="70" />
                </div>
            </div>
            <div class="text-center" style="margin: 3em 0 4em 0;">
                <h5>Bienvenue chez nous!</h5>
                <div style="margin-top: 3em;">
                    <p>Veuillez patienter, <strong>{{ nomVisite }} </strong> <br>viendra vous chercher sous peu.</p>
                </div>
            </div>
        </BCardBody>
    </BCard>
    </div>
</template>
  
<script>
    definePageMeta({
        layout: "utility"
    });

    import PhotoCamera from '~/components/camera/PhotoCamera.vue';
    export default {
        components: {
            PhotoCamera
        },
        data(){
            return{
                nomVisite: "M. KOUADIO K.",
            }
        },
        methods: {
            handlePhoto(photo) {
                this.form.photo = photo;
            },
        },
    };

</script>

<style>
.bg-card {
    background-color: rgba(204, 200, 200, 0.5); /* Gris avec 50% de transparence */
}
#qr-topbar{
    margin-top: 8em;
}

#msg{
    height: 100vh;
}

@media (max-width: 576px) {
  #qr-topbar{
    margin-top: 10em;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  #qr-topbar{
    margin-top: 8em;
  }
}

@media (min-width: 992px) {
 
}

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
  