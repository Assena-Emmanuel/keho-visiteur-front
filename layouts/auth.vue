<script>
export default {
  mounted() {
    document.body.classList.add("authentication-bg");
  }
};
</script>

<template>
  <div>
    <div class="background d-flex justify-content-between align-items-center">
      <BContainer>
        <BRow >
          <BCol cols="4" md="6" class="d-flex justify-content-between" >
            <div class="text-center" style="margin-top: 110px; margin-left: 140px;">
              <img src="/images/total-sans-arriere-plan.png" alt="" width="230" height="230" />
            </div>

          </BCol>
          <BCol cols="12" md="6" class="">
            <slot />
          </BCol>
        </BRow>
        
      </BContainer>
    </div>
  </div>
</template>
<style>
.background {
  background-image: linear-gradient(rgba(255, 254, 254, 0.8), rgba(255, 255, 255, 0.8)),url("/images/total1.jpg");
  background-repeat: no-repeat;
  background-size: contain; 
  background-position: center;
  block-size: 100%;
  height: 90vh;
  inline-size: 100%;
} 
</style>


