<script>
definePageMeta({
  layout: "auth"
});
import Otp from "~/components/account/Otp.vue";

export default {
  data() {
    return {
      title: "verify-otp-code"
    };
  },
  components: {
    Otp
  }
};
</script>

<template>
  <SiteHeader :title="title" />
  <Otp />
</template>
