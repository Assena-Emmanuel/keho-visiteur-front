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

};
</script>

<template>
  <SiteHeader :title="title" />
  <PageHeader :title="title" :items="items" />
  <Reporting />
</template>