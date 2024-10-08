<script>
import Visiteur from '~/components/dashboard/Visiteur.vue';
export default {
  components: {
    Visiteur
  },
  data() {
    return {
      items: [
        {
          text: "Apps",
        },
        {
          text: "Calendar",
          active: true
        }
      ],
      
    };
  }
};
</script>

<template>
  <SiteHeader :title="title" />
  <PageHeader />
  <Visiteur/>
</template>
