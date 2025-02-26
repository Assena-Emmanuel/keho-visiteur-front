// plugins/vue3-form-wizard.js
import Vue3FormWizard from 'vue3-form-wizard';
import 'vue3-form-wizard/dist/style.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3FormWizard);
});
