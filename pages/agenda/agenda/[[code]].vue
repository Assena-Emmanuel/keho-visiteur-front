<script>
import AgendaS from '~/components/agenda/AgendaSecretaire.vue';
export default {
  components: {
    AgendaS
  },
  setup() {
    const route = useRoute();
    const code = route.params.code; // Récupérer le paramètre uuid

    return { code: code}
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
  <AgendaS :code="this.code" />
</template>
