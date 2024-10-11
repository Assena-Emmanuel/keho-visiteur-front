<script setup>
import { useRoute } from 'vue-router';
import Service from '~/components/parametres/Service.vue';
import Departement from '~/components/parametres/Departement.vue';

const route = useRoute();
const title = route.params.slug;
const typeForm = route.params.slug;

</script>

<template>
  <SiteHeader :title="title" />
  <PageHeader />
  <Service :typeForme="'service'" v-if="typeForm == 'service'" />
  <Departement v-if="typeForm == 'departement'" />
</template>
