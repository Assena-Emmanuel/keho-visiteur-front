<script>
import ParametrageProfile from '~/components/forms/ParametrageProfile.vue';
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
    ParametrageProfile
  }
};
</script>

<template>
  <SiteHeader :title="title" />
  <ParametrageProfile />
</template>
