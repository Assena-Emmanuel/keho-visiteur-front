// plugins/mosha-toastify.js
import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(moshaToast)
})
