<script>
import "simplebar";
import Stat from "~/components/dashboard/Stat.vue";

export default {
  data() {
    return {
      title: "Dashboard",
      items: [
        {
          text: "Minible"
        },
        {
          text: "Dashboard",
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
  
</template>
