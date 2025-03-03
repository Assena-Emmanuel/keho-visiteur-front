import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    setUser(userData) {
      this.user = userData;
    },
    setToken(token) {
      this.token = token;
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
  persist: true, // Sauvegarde les données dans localStorage
});

