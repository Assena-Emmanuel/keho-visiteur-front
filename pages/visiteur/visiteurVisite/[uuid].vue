<script>
import "simplebar";


export default {
  setup() {
    const route = useRoute();
    const uuid = route.params.uuid; // Récupérer le paramètre uuid

    return { uuid: uuid}
  },
  data() {
    return {
      items: [
        {
          text: "Visiteur",
          active: true
        }
      ]
    };
  },
//   components:{
//     Visiteur,
//   }
};
</script>

<template>
  <SiteHeader :title="title" />
  <PageHeader :title="title" :items="items" />
  <DashboardVisiteurVisite :uuid="this.uuid" />
</template>
