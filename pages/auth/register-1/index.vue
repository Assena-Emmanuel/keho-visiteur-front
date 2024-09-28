<script>
import AuthRegisterComponent from "~/components/auth/register/index.vue";
definePageMeta({
  layout: "auth"
});
export default {
  data() {
    return {
      title: "Register"
    };
  },
  components: {
    AuthRegisterComponent
  }
};
</script>

<template>
  <SiteHeader :title="title" />
  <AuthRegisterComponent />
</template>
