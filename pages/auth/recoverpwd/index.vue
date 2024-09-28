<script>
import AuthRecoverPswdComponent from "~/components/auth/recoverPassword/index.vue";
definePageMeta({
  layout: "auth"
});
export default {
  data() {
    return {
      title: "Recoverpwd"
    };
  },
  components: {
    AuthRecoverPswdComponent
  }
};
</script>

<template>
  <SiteHeader :title="title" />
  <AuthRecoverPswdComponent />
</template>
