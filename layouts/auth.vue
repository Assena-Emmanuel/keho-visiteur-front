<script>
export default {
  mounted() {
    document.body.classList.add("authentication-bg");
  }
};
</script>

<template>
  <div>
    <div class="background">
      <BContainer>
        <BRow >
          <BCol cols="12" md="6" class="d-flex justify-content-center align-items-center mt-3" >
            <div class="text-center">
              <img src="/images/total-sans-arriere-plan.png" class="custom-img-size" alt="" />
            </div>

          </BCol>
          <BCol cols="12" md="6" class="d-flex justify-content-center align-items-center mt-3">
            <slot />
          </BCol>
        </BRow>
        
      </BContainer>
    </div>
  </div>
</template>
<style>




</style>


