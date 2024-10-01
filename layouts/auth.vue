<script>
export default {
  mounted() {
    document.body.classList.add("authentication-bg");
  }
};
</script>

<template>
  <div>
    <div class="account-pages my-5">
      <BContainer>
        <BRow class="d-flex justify-content-center">
          <BCol cols="12">
            <nuxt-link to="/" class="mb-3 d-block auth-logo">
              <div class="text-center">
                <img src="/images/logo_keho.jpg" alt="" width="70" height="70" class="rounded" />
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
