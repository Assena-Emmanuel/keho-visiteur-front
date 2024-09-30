<script>
definePageMeta({
  layout: "auth"
});
import ResetPassword from "~/components/account/ResetPassword.vue";

export default {
  data() {
    return {
      title: "reset-password"
    };
  },
  components: {
    ResetPassword
  }
};
</script>

<template>
  <SiteHeader :title="title" />
  <ResetPassword />
</template>
