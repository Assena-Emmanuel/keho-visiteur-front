<script>

import AjouterProfil from '~/components/forms/AjouterProfil.vue'

export default {
  data() {
    return {
      title: "Nouveau profil"
    };
  },
  components: {
    AjouterProfil
  }
};
</script>

<template>
  <SiteHeader :title="title" />
  <AjouterProfil />
</template>
