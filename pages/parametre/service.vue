<script>
import Service from '~/components/parametres/Service.vue';
export default {
  components: {
    Service
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
  <PageHeader />
  <Service />
</template>
