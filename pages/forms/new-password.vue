<script>

import NewPassword from '~/components/forms/NewPassword.vue';

export default {
  data() {
    return {
      title: "reset-password"
    };
  },
  components: {
    NewPassword
  }
};
</script>

<template>
  <SiteHeader :title="title" />
  <NewPassword />
</template>
