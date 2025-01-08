<script>
import "simplebar";
import Dashboard from "~/components/dashboard/DashBoard.vue";


export default {
  data() {
    return {
      title: "Dashboard",
      items: [
        {
          text: ""
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
<script setup>
// Définir les métadonnées de la page avec un middleware
definePageMeta({
  middleware: ['auth'] // Le middleware 'auth' sera appliqué
})
</script>