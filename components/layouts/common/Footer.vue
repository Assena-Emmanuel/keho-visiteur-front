<script>
/**
 * Footer component
 */
export default {};
</script>

<template>
  <footer class="footer">
    <BContainer fluid>
      <BRow class="justify-content-end">
        <BCol sm="6" class="text-end">{{ new Date().getFullYear() }} © KEHO-GROUP</BCol>
        <!-- <BCol sm="6">
          <div class="text-sm-end d-none d-sm-block">
            Crafted with
            <i class="mdi mdi-heart text-danger"></i> by
            <nuxt-link href="https://themesbrand.com/" target="_blank" class="text-reset">Themesbrand</nuxt-link>
          </div>
        </BCol> -->
      </BRow>
    </BContainer>
  </footer>
</template>
