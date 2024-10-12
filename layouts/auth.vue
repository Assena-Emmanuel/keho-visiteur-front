<script>
export default {
  mounted() {
    document.body.classList.add("authentication-bg");
  }
};
</script>

<template>
  <div>
    <div class="background d-flex justify-content-evenly align-items-center">
      <BContainer>
        <BRow >
          <BCol cols="12" md="6" class="d-flex justify-content-center align-items-center mt-5" >
            <div class="text-center">
              <img src="/images/total-sans-arriere-plan.png" class="custom-img-size" alt="" />
            </div>

          </BCol>
          <BCol cols="12" md="6" class="d-flex justify-content-center align-items-center ">
            <slot />
          </BCol>
        </BRow>
        
      </BContainer>
    </div>
  </div>
</template>
<style>
.background {
  background-image: linear-gradient(rgba(255, 254, 254, 0.9), rgba(255, 255, 255, 0.9)),url("/images/total1.jpg");
  background-repeat: no-repeat;
  background-size: contain; 
  background-position: center;
  block-size: 100%;
  height: 90vh;
  inline-size: 100%;
} 

.custom-img-size {
  width: 100%; /* Permet à l'image de s'adapter automatiquement à la taille du parent */
  max-width: 210px; /* Taille maximale de l'image */
}

@media (max-width: 768px) { /* Pour les écrans de tablette */
  .custom-img-size {
    max-width: 150px; /* Réduire la taille de l'image sur les tablettes */
  }
}

@media (max-width: 576px) { /* Pour les écrans de téléphone */
  .custom-img-size {
    max-width: 120px; /* Réduire encore plus la taille sur les petits écrans */
  }
}

</style>


