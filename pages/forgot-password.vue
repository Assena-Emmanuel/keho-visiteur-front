<script>
import ForgotPassword from "~/components/account/ForgotPassword.vue";
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
    ForgotPassword
  }
};
</script>

<template>
  <SiteHeader :title="title" />
  <ForgotPassword />
</template>
