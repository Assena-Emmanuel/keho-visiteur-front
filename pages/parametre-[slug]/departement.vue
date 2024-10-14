<script>
import Departement from '~/components/parametres/Departement.vue';
export default {
  components: {
    Departement
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
  <Departement />
</template>
