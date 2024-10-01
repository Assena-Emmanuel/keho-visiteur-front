<script>
export default {
  mounted() {
    document.body.classList.add("authentication-bg");
  }
};
</script>

<template>
  <div>
    <!-- <div class="home-btn d-none d-sm-block p-3 text-end">
      <nuxt-link to="/" class="text-dark"><i class="mdi mdi-home-variant h2"></i></nuxt-link>
    </div> -->
    <div class="account-pages my-5">
      <BContainer>
        <BRow class="d-flex justify-content-center">
          <BCol cols="12">
            <nuxt-link to="/" class="mb-5 d-block auth-logo">
              <div class="text-center">
                <img src="/images/logo_keho.jpg" alt="" width="80" height="80" class="rounded" />
              </div>
              <!-- <img src="/images/logo_keho.jpg" alt="" height="100" class="logo logo-dark img-thumbnail" />
              <img src="/images/logo_keho.jpg" alt="" height="100" class="logo logo-light" /> -->
            </nuxt-link>
          </BCol>
        </BRow>
        <slot />
      </BContainer>
    </div>
  </div>
</template>
