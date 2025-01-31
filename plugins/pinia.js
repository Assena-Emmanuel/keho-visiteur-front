// plugins/pinia.js

import { createPinia } from 'pinia'
import PiniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(nuxtApp => {
  const pinia = createPinia()

  // Utiliser PiniaPluginPersistedstate dans le bon contexte
  pinia.use(PiniaPluginPersistedstate)

  // Appliquer le store Pinia à l'application Vue
  nuxtApp.vueApp.use(pinia)
})
