<script>
import "simplebar";

export default {
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
  <DashboardVisiteur />
</template>
