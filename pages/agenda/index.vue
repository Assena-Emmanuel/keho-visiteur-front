<script>
import Agenda from '~/components/agenda/Agenda.vue';
export default {
  components: {
    Agenda
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
  <Agenda />
</template>
