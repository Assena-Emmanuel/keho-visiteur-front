<script>
import AgendaS from '~/components/agenda/AgendaSecretaire.vue';
export default {
  components: {
    AgendaS
  },
  data() {
    return {
      title: "Agenda",
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
  <AgendaS />
</template>
