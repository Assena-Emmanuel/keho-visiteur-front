<template>
  <BCard no-body>
    <BCardBody>
      <BRow>
        <BCol md="3">
          <vue-cal
            xsmall
            :time="false"
            locale="fr"
            hide-view-selector
            active-view="month"
            @cell-focus="onCellFocus"
            class="mb-4 vuecal--blue-theme vuecal--rounded-theme calendrier-court"
          />
        </BCol>
        <BCol md="9">
          <vue-cal
            small
            :time-from="heureDebut * 60"
            :time-to="heureFin * 60"
            locale="fr"
            hide-weekends
            active-view="week"

            :selected-date="selectedDate"
            :events="events" 
            :eventsCountOnYearView=true
            class="vuecal--blue-theme calendrier-long"
            @cell-focus="onCellFocus"
            @cell-click="openEventModal($event)"
            @event-click="openEventModal($event)"
          >

          </vue-cal>

        </BCol>
      </BRow>

      <!-- Modal pour ajouter ou modifier un événement -->
      <BModal v-model="modalVisible" :title="isEditing ? 'Modifier l\'événement' : 'Ajouter un événement'" hide-footer>
        <div>
          <BAlert variant="danger"v-model="error" dismissible>
            {{ errorMsg }}
          </BAlert>
        </div>
        <BForm @submit.prevent="isEditing ? updateEvent() : addEvent()">
          <BFormGroup label="Titre de l'événement">
            <BFormInput v-model="eventTitle" required class="border border-secondary" />
          </BFormGroup>
          <BRow class="mt-3 mb-3">
            <BCol md="6" sm="6" cols="6">
              <BFormGroup label="Heure de début">
                <BFormInput :min="8" :max="17" type="time" v-model="eventStartTime" required class="border border-secondary" />
              </BFormGroup>
            </BCol>
            <BCol md="6" sm="6" cols="6">
                <BFormGroup label="Heure de fin">
                  <BFormInput :min="heureDebut" :max="heureFin" type="time" v-model="eventEndTime" required class="border border-secondary" />
                </BFormGroup>
            </BCol>
          </BRow>
          
          <div class="d-flex justify-content-between" v-if="isEditing">
            <BButton v-if="isEditing" class="mt-2" @click="deleteEvent" variant="danger">Supprimer</BButton>
            <BButton class="mt-2" type="submit" variant="primary">
              <span v-if="!loading">Modifier</span>
              <ScaleLoader :loading="loading" :height="'20px'" :color="'#FFFFFF'" />
            </BButton>
          </div>
          <div class="d-flex justify-content-end" v-if="!isEditing">
            <BButton class="mt-2" type="submit" variant="primary">
              <span v-if="!loading">Ajouter</span>
              <ScaleLoader :loading="loading" :height="'20px'" :color="'#FFFFFF'" />
            </BButton>
          </div>

          
        </BForm>
      </BModal>
    
    </BCardBody>
  </BCard>
</template>

<script>
import { title } from 'process';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { useAuthStore } from "~/stores/auth.js";
import apiClient from "../api/intercepteur";
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

export default {
  components: { VueCal, ScaleLoader },
  setup(){
    return{
      authStore:useAuthStore()
    }
  },

  data() {
    return {
      heureDebut: 8,
      heureFin: 24,
      selectedDate: null,
      modalVisible: false,
      eventTitle: '',
      eventStartTime: null,
      eventEndTime: null,
      error: false,
      errorMsg: null,
      loading: false,

      events: [
      ],

      isEditing: false,
      editingIndex: null,
    };
  },

  async mounted() {
    this.getEvents(this.authStore.user.visite?.code_visite)
  },

  methods: {
    async getEvents(code){
      try{
          const response = await apiClient.get("/fvisites/evenements", {
            params: {
            sort_type: 2,
            code_employe: code
          },
          headers: {
              Authorization: `Bearer ${this.authStore.token}`
          }
        });

        if(!response.data.error){
          this.events = response.data.data.particular_event

        }else{
            console.log("Erreur: "+response.data.message)
        }

      }catch(e){
        console.log("Erreur :"+e)
      }finally{

      }
    },

    onCellFocus(date) {
      this.selectedDate = new Date(date);
    },

    openEventModal(event) {
      // console.log(Array.isArray(this.events));  // Vérifie si c'est un tableau
      // console.log(this.events);
      // const eventFound = this.events.find(e => e.start === event.start && e.end === event.end);
      console.log("----------------eventttt"+JSON.stringify(event))
      if (event._eid) {
        this.eventTitle = event.title;
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);
        
        // Extraire l'heure et les minutes au format HH:mm
        this.eventStartTime = startDate.toISOString().slice(11, 16); // Extrait l'heure (HH:mm)
        this.eventEndTime = endDate.toISOString().slice(11, 16); // Extrait l'heure (HH:mm)
  
        this.isEditing = true;
        let obj = {
          title: this.eventTitle,
          start: this.eventStartTime,
          end: this.eventEndTime,
          class: event.class
        }
        this.editingIndex = this.events.indexOf(obj);
      } else {
        const eventStartTime = new Date(event.start).toTimeString().slice(0, 5); // Extract HH:mm
        this.eventTitle = '';
        this.eventStartTime = eventStartTime
        this.eventEndTime = null;
        this.isEditing = false;
        this.editingIndex = null;
      }
      this.modalVisible = true;
    },
    
    async addEvent() {
      if (this.eventTitle && this.eventStartTime && this.eventEndTime) {
        if (!this.selectedDate) {
          alert("Veuillez sélectionner une date.");
          return;
        }

        // Récupération des valeurs de l'heure
        const [startHour, startMinute] = this.eventStartTime.split(':').map(Number);
        const [endHour, endMinute] = this.eventEndTime.split(':').map(Number);

        // Création des objets Date en utilisant les valeurs de l'année, du mois, du jour, de l'heure et des minutes
        const startDateTime = new Date(this.selectedDate);
        startDateTime.setHours(startHour, startMinute, 0, 0); // Définir l'heure de début

        const endDateTime = new Date(this.selectedDate);
        endDateTime.setHours(endHour, endMinute, 0, 0); // Définir l'heure de fin

        // Vérification que l'heure de début est avant l'heure de fin
        if (startDateTime >= endDateTime) {
          this.error= true
          this.errorMsg = "L'heure de début doit être antérieure à l'heure de fin."
          setTimeout(() => {
            this.error = false;
          }, 2000);  // 5000 ms = 5 secondes
          return;
        }

        // Formatage des dates au format souhaité
        const startFormatted = `${startDateTime.toISOString().split('T')[0]} ${startDateTime.toTimeString().split(' ')[0]}`;
        const endFormatted = `${endDateTime.toISOString().split('T')[0]} ${endDateTime.toTimeString().split(' ')[0]}`;

        // Enregistrement de l'evenement
        try{
          this.loading = true
          const response = await apiClient.post("/event", {
            titre: this.eventTitle,
            debut: startFormatted,
            fin: endFormatted
          }, {
            headers: {
              Authorization: `Bearer ${this.authStore.token}`
            }
          });

          if(!response.data.error){
            console.log("--------------data : "+JSON.stringify(response.data))

            if(response.data.data){
              this.events.push(response.data.data)
              this.resetForm();
            }else{
              this.error= true
              this.errorMsg = response.data.message
              setTimeout(() => {
                this.error = false;
              }, 2000);  // 5000 ms = 5 secondes
            }
            

          }else{
              console.log("Erreur: "+response.data.message)
          }

        }catch(e){
          console.log("Erreur :"+e)
        }finally{
          this.loading = false
        }

        
      }
    },

    async updateEvent() {
      if (this.eventTitle && this.eventStartTime && this.eventEndTime) {

        // Récupération des valeurs de l'heure
        const [startHour, startMinute] = this.eventStartTime.split(':').map(Number);
        const [endHour, endMinute] = this.eventEndTime.split(':').map(Number);

        // Création des objets Date en utilisant les valeurs de l'année, du mois, du jour, de l'heure et des minutes
        const startDateTime = new Date(this.selectedDate);
        startDateTime.setHours(startHour, startMinute, 0, 0); // Définir l'heure de début

        const endDateTime = new Date(this.selectedDate);
        endDateTime.setHours(endHour, endMinute, 0, 0); // Définir l'heure de fin

        // Vérification que l'heure de début est avant l'heure de fin
        if (startDateTime >= endDateTime) {
          this.error= true
          this.errorMsg = "L'heure de début doit être antérieure à l'heure de fin."
          setTimeout(() => {
            this.error = false;
          }, 2000);  // 5000 ms = 5 secondes
          return;
        }

        const startFormatted = `${startDateTime.toISOString().split('T')[0]} ${startDateTime.toTimeString().split(' ')[0]}`;
        const endFormatted = `${endDateTime.toISOString().split('T')[0]} ${endDateTime.toTimeString().split(' ')[0]}`;

        // Enregistrement de l'evenement
        try{
          this.loading = true
          const response = await apiClient.post("/event", {
            titre: this.eventTitle,
            debut: startFormatted,
            fin: endFormatted
          }, {
            headers: {
              Authorization: `Bearer ${this.authStore.token}`
            }
          });

          if(!response.data.error){
            console.log("--------------data : "+JSON.stringify(response.data))

            if(response.data.data){
              this.events.push(response.data.data)
              this.resetForm();
            }else{
              this.error= true
              this.errorMsg = response.data.message
              setTimeout(() => {
                this.error = false;
              }, 2000);  // 5000 ms = 5 secondes
            }
            

          }else{
              console.log("Erreur: "+response.data.message)
          }

        }catch(e){
          console.log("Erreur :"+e)
        }finally{
          this.loading = false
        }





      }
    },

    deleteEvent() {
      this.events.splice(this.editingIndex, 1);
      this.resetForm();
    },

    resetForm() {
      this.eventTitle = '';
      this.eventStartTime = null;
      this.eventEndTime = null;
      this.modalVisible = false;
      this.isEditing = false;
      this.editingIndex = null;
      this.error = false
      this.errorMsg = null
    },

    onCellClick(event) {

    // Extraire l'heure de l'événement cliqué
    const startHour = event.date.getHours();
    const startMinute = event.date.getMinutes();

    // Pré-remplir les heures de début et de fin
    this.eventStartTime = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
    return this.eventStartTime
  },

  confirmDeleteEvent(event) {
      if (confirm(`Voulez-vous vraiment supprimer "${event.title}" ?`)) {
        this.deleteEvent(event.id); // Appelez la méthode de suppression
      }
    },
    deleteEvent(eventId) {
      this.events = this.events.filter(event => event.id !== eventId); // Supprimez l'événement
    }

  }
};
</script>

<style>


.vuecal .event-1 {
    background-color: rgba(240, 187, 65, 0.76) !important;
}

.vuecal .event-2 {
    background-color: rgba(239, 58, 58, 0.76) !important;
}

.vuecal .event-3 {
    background-color: rgba(65, 241, 68, 0.76) !important;
}


.calendrier-court {
  height: 300px;
  overflow: hidden;
}
</style>
