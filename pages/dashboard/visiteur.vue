<script>
import "simplebar";
import Visiteur from "~/components/dashboard/Visiteur.vue";


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
  
  <DashboardVisiteur />
</template>
