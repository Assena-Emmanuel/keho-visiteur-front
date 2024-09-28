<script>
export default {
  mounted() {
    document.body.classList.add("authentication-bg");
  }
};
</script>

<template>
  <div>
    <div class="home-btn d-none d-sm-block p-3 text-end">
      <nuxt-link to="/" class="text-dark"><i class="mdi mdi-home-variant h2"></i></nuxt-link>
    </div>
    <div class="account-pages my-5">
      <BContainer>
        <BRow class="d-flex justify-content-center">
          <BCol cols="12">
            <nuxt-link to="/" class="mb-5 d-block auth-logo">
              <img src="/images/logo-dark.png" alt="" height="22" class="logo logo-dark" />
              <img src="/images/logo-light.png" alt="" height="22" class="logo logo-light" />
            </nuxt-link>
          </BCol>
        </BRow>
        <slot />
      </BContainer>
    </div>
  </div>
</template>
