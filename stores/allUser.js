// stores/editStore.js

import { defineStore } from 'pinia';

export const useallUserStore = defineStore('allUserStore', {
  state: () => ({
    users: [],
  }),
  actions: {
    // Méthode pour mettre à jour les données
    setUsers(user) {
      this.users = user;
    },

    // Méthode pour supprimer les données
    deleteData() {
      this.users = [];
    },
  },
});
