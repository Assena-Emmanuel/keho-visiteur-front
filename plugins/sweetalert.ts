// plugins/sweetalert.ts
import { defineNuxtPlugin } from '#app'
import Swal from 'sweetalert2'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('swal', Swal)
})
