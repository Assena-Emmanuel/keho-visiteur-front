<script>
import "simplebar";


export default {
  data() {
    return {
      title: "Visiteur",
      items: [
        {
          text: "Visiteur"
        },
        {
          text: "Visiteur",
          active: true
        }
      ]
    };
  },
  // components:{
  //   Visiteur,
  // }
};
</script>

<template>
  <SiteHeader :title="title" />
  <PageHeader :title="title" :items="items" />
  
  <DashboardMesVisiteur />
</template>
