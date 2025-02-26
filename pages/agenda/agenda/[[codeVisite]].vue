<script>
import AgendaS from '~/components/agenda/AgendaSecretaire.vue';
export default {
  setup() {
    const route = useRoute();
    const uuid = route.params.codeVisite; // Récupérer le paramètre uuid

    return { uuid: uuid}
  },
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
