import Pusher from 'pusher-js';

export default defineNuxtPlugin((nuxtApp) => {
  // Enable Pusher logging (optional)
  Pusher.logToConsole = true;

  // Initialize Pusher
  const pusher = new Pusher('33192152cf2987e88028', {
    cluster: 'ap2',
  });

  nuxtApp.provide('pusher', pusher);
});