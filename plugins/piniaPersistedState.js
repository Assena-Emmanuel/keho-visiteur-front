import { defineNuxtPlugin } from '#app'
import { usePinia } from '#imports'
import piniaPersistedState from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = usePinia() // Utilisation correcte de Pinia avec Nuxt

  if (!pinia._p.includes(piniaPersistedState)) {
    pinia.use(piniaPersistedState) // Ajouter le plugin une seule fois
  }
})
