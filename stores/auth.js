// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,  // Valeur initiale du token
    user: null,   // Valeur initiale de l'utilisateur
  }),
  actions: {
    // Action pour définir le token
    setToken(token) {
      this.token = token
    },
    // Action pour définir l'utilisateur
    setUser(user) {
      this.user = user
    },
    // Action pour effacer les informations (se déconnecter)
    logout() {
      this.token = null
      this.user = null
    },
  },
})
