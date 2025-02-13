import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "~/stores/auth.js";
import apiClient from "~/components/api/intercepteur";

export const useNotifiedStore = defineStore("notified", {
  state: () => ({
    notifications: [],
    mynotifs: [],
  }),
  actions: {
    async getNotification() {
      const authToken = useAuthStore()
      const response = await apiClient.get(`user/notifs`,
        {
          headers: {
            Authorization: `Bearer ${authToken.token}`, // Ajoutez le token Bearer ici
            Accept: "application/json",
          },
        }
      );

      this.notifications = []
      this.mynotifs = []

      if (response.status === 200) {
       // this.notifications = response.data;
       
       let notifs = JSON.parse(JSON.stringify(response.data));

       if(parseInt(notifs.code)===1){
        this.notifications.push(...notifs.data);
        this.mynotifs = this.notifications.map(notification => notification.data);
     
       }
    
      } else {
        console.error("Error fetching notifications: " + response.status);
      }

     
    },


  },
});
