<script>
import "simplebar";

export default {
  data() {
    return {
      items: [
        {
          text: "Historique",
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
  <DashboardHistorique />
</template>
