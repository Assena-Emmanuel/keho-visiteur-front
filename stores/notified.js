import { defineStore } from "pinia";
import axios from "axios";

export const useNotifiedStore = defineStore("notified", {
  state: () => ({
    notifications: [],
    mynotifs: [],
  }),
  actions: {
    async getNotification() {
      const response = await axios.get(
        `${useRuntimeConfig().public.API_URL}/user/notifs`,
        {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2tlaG8tdmlzaXRvcnMubG9jYWwvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MjkxOTI3ODgsImV4cCI6MTcyOTI3OTE4OCwibmJmIjoxNzI5MTkyNzg4LCJqdGkiOiJYMmRhbmNtR2JDNnhFN0dNIiwic3ViIjoiNjQiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.jKXb74xWwRg1BhktSaYGXUavgMjvU4_QVxVe_exmnUM`, // Ajoutez le token Bearer ici
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
        console.log("extractedData : ",this.mynotifs);


       }
    
        
       
      } else {
        console.error("Error fetching notifications: " + response.status);
      }

     
    },
  },
});
