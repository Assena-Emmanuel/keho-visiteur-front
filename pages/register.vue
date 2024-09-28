<script>
import Register from "~/components/account/Register.vue";
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
    Register
  }
};
</script>

<template>
  <SiteHeader :title="title" />
  <Register />
</template>
