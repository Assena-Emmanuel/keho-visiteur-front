<script>
import Profile from '~/components/forms/Profile.vue';
export default {
  data() {
    return {
      title: "user-profil",
      items: [
        {
          text: "Minible"
        },
        {
          text: "profil",
          active: true
        }
      ]
    };
  },
  components: {
    Profile
  }
};
</script>

<template>
  <SiteHeader :title="title" />
  <Profile />
</template>
