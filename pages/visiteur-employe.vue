<script>
import "simplebar";

export default {
  data() {
    return {
      items: [
        {
          text: "Visiteur-Employé",
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
  <DetailVisiteurEmploye />
</template>
