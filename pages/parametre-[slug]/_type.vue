<script>
import Parametre from '~/components/layouts/common/Parametre.vue';
export default {
  components: {
    Parametre
  },
  data() {
    return {
      title: "Mon Agenda",
      items: [
        {
          text: "Apps",
        },
        {
          text: "Calendar",
          active: true
        }
      ]
    };
  }
};
</script>

<template>
  <SiteHeader :title="title" />
  <PageHeader :title="title" :items="items" />
  <Parametre />
</template>
