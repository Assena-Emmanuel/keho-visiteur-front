import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null, // Charger depuis localStorage au départ
  }),
  actions: {
    setUser(newUser) {
      this.user = newUser;
      localStorage.setItem('user', JSON.stringify(newUser)); // Mettre à jour localStorage
    },
    clearUser() {
      this.user = null;
      localStorage.removeItem('user'); // Supprimer de localStorage
    },
  },
});
