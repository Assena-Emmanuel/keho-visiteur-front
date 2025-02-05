// stores/editStore.js

import { defineStore } from 'pinia';

export const allUserStore = defineStore('allUserStore', {
  state: () => ({
    users: null,
  }),
  actions: {
    // Méthode pour mettre à jour les données
    setUsers(user) {
      this.users = user;
    },

    // Méthode pour supprimer les données
    deleteData() {
      this.users = null;
    },
  },
});
