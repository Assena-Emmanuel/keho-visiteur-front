import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "~/stores/auth.js";

export const useNotifiedStore = defineStore("notified", {
  state: () => ({
    notifications: [],
    mynotifs: [],
  }),
  actions: {
    async getNotification() {
      const authToken = useAuthStore()

      const response = await axios.get(
        `${useRuntimeConfig().public.API_URL}/user/notifs`,
        {
          headers: {
<<<<<<< HEAD
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2tlaG8tdmlzaXRvcnMubG9jYWwvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MzYyNjA2MzQsImV4cCI6MTczNjM0NzAzNCwibmJmIjoxNzM2MjYwNjM0LCJqdGkiOiJTaTVIT2xZcmxXbW5qTDNMIiwic3ViIjoiNjQiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.NrRdPSX1o8W9qC03ehDmpWsRW-DvSSWixW02ebVns8w`, // Ajoutez le token Bearer ici
=======
            Authorization: `Bearer ${authToken.token}`, // Ajoutez le token Bearer ici
>>>>>>> 1711b80159c1652ec637dd733d324dfc391af93a
            Accept: "application/json",
          },
        }
      );

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
