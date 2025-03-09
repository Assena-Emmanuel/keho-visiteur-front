// middleware/network-status.js
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css';

export default defineNuxtRouteMiddleware((to, from) => {

    // Vérifier si nous sommes côté client avant d'ajouter les écouteurs
    if (process.client) {
        // Ajouter un écouteur pour l'événement 'offline' au cas où l'utilisateur perde sa connexion
        let offlineNotificationTimeout = null

        // Fonction pour afficher la notification "offline"
        const showOfflineNotification = () => {
          createToast('Vous êtes hors ligne, vérifiez votre connexion Internet.', {
            type: 'danger',
            hideProgressBar: true,
            showIcon: true,
          })
        }

        // Ajouter un écouteur pour l'événement 'online' au cas où l'utilisateur se reconnecte
        window.addEventListener('online', () => {
          createToast('Connexion rétablie, vous êtes de nouveau en ligne.', {
            type: 'success',
            hideProgressBar: true,
            showIcon: true,
          })

           // Rafraîchir la page une fois la connexion rétablie
          location.reload();
        })

        window.addEventListener('offline', () => {
          // Afficher immédiatement la notification quand l'utilisateur est hors ligne
          showOfflineNotification()
    
          // Vérifier toutes les 2 minutes (120000 ms) si la connexion est toujours hors ligne
          offlineNotificationTimeout = setInterval(() => {
            if (!window.navigator.onLine) {
              showOfflineNotification()  // Afficher à nouveau la notification toutes les 2 minutes
            } else {
              // Si l'utilisateur est de nouveau en ligne, arrêter l'intervalle
              clearInterval(offlineNotificationTimeout)
            }
          }, 10000)  // 2 minutes = 120000 ms
        })
    }
})
