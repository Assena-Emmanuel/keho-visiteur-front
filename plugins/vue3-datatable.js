import Vue3Datatable from '@bhplugin/vue3-datatable'
import '@bhplugin/vue3-datatable/dist/style.css'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('Vue3Datatable', Vue3Datatable)
})
