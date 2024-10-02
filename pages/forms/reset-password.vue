<script>

import ResetPassword from '~/components/forms/ResetPassword.vue';

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
