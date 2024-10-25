<script>
import "simplebar";
import Dashboard from "~/components/dashboard/DashBoard.vue";


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
  components:{
    Dashboard,
  }
};
</script>

<template>
  <SiteHeader :title="title" />
  <PageHeader :title="title" :items="items" />
  <Dashboard />
</template>
