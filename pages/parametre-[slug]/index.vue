<script setup>
import { useRoute } from 'vue-router';
import Service from '~/components/parametres/Service.vue';
import Departement from '~/components/parametres/Departement.vue';
import Profil from '~/components/parametres/Profil.vue';
import Utilisateur from '~/components/parametres/Utilisateur.vue'
import Agence from '~/components/parametres/Agence.vue';
import Menu from '~/components/parametres/Menu.vue';
import Categorie from '~/components/parametres/Categorie.vue'
import Action from '~/components/parametres/Action.vue'

const route = useRoute();
const title = route.params.slug;
const typeForm = route.params.slug;


</script>

<template>
  <SiteHeader :title="title" />
  <PageHeader />
  <Service :typeForme="'service'" v-if="typeForm == 'service'" />
  <Departement v-if="typeForm == 'departement'" />
  <Profil v-if="typeForm == 'profil'" />
  <Utilisateur v-if="typeForm == 'utilisateur'" />
  <Agence v-if="typeForm == 'agence'" />
  <Menu v-if="typeForm == 'menu'" />
  <Categorie v-if="typeForm == 'categorie'" />
  <Action v-if="typeForm == 'action'" />
</template>
