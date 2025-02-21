<script setup lang="ts">
import type { UseWebNotificationOptions } from '@vueuse/core'
import { useWebNotification } from '@vueuse/core'

const options: UseWebNotificationOptions = {
  title: 'Hello, world from VueUse!',
  dir: 'auto',
  lang: 'fr',
  renotify: true,
  tag: 'test',
}

const {
  isSupported,
  show,
} = useWebNotification(options)

const showNotification = async () => {
  // Attendre que la notification soit créée (résolution de la promesse)
  const notification = await show(); // Affiche la notification

  
  if (notification) {
    // Ajouter un événement de clic pour fermer la notification
    notification.addEventListener('click', () => {
      notification.close(); // Ferme la notification lorsque l'utilisateur clique dessus
    });
  }
};
</script>

<template>
  <div>
    <p>
      Supported: <BooleanDisplay :value="isSupported" />
    </p>
  </div>

  <div v-if="isSupported">
    <button @click="showNotification">
      Show Notification
    </button>
  </div>

</template>
