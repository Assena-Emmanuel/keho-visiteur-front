<script>
definePageMeta({
  layout: "auth"
});

import AuthLockScreenComponent from "~/components/auth/LockScreen/index.vue";
export default {
  data() {
    return {
      title: "Lock screen"
    };
  },
  components: {
    AuthLockScreenComponent
  }
};
</script>

<template>
  <SiteHeader :title="title" />
  <AuthLockScreenComponent />
</template>
