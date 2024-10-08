<template>
    <div>
      <h1>Gestion des {{ type }}</h1>
      <div v-if="type === 'departements'">
        <!-- Logique pour la gestion des départements -->
      </div>
      <div v-else-if="type === 'services'">
        <!-- Logique pour la gestion des services -->
      </div>
      <!-- Ajouter des conditions pour d'autres types -->
    </div>
  </template>
  
  <script>
  export default {
    async asyncData({ params }) {
      return {
        type: params.type
      }
    }
  }
  </script>