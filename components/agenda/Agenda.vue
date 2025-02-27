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

          <!-- <template #event="{ event, view }">

            <div class="vuecal__event-title" v-html="event.title" />

            <div class="vuecal__event-title vuecal__event-title--edit"
                contenteditable
                @blur="event.title = $event.target.innerHTML"
                v-html="event.title" />

            <small class="vuecal__event-time">

              <strong>H debut:</strong> <span>{{ event.start.getMinutes() }}</span><br/>
              <strong>H fin:</strong> <span>{{ event.end.formatTime("h O'clock") }}</span>
            </small>
          </template> -->
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
            <BButton class="mt-2" type="submit" variant="primary">Modifier</BButton>
          </div>
          <div class="d-flex justify-content-end" v-if="!isEditing">
            <BButton class="mt-2" type="submit" variant="primary">Ajouter</BButton>
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

export default {
  components: { VueCal },
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

      events: [
        { title: 'Réunion', start: '2025-02-27 09:00', end: '2025-02-27 10:00', class: 'event-1' },
        { title: 'Déjeuner', start: '2025-02-27 12:00', end: '2025-02-27 13:00', class: 'event-2' },
        { title: 'Atelier', start: '2025-02-27 14:00', end: '2025-02-27 15:30', class: 'event-3' }
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
          console.log("Event: ------------------: "+JSON.stringify(response.data.data))
          this.events = response.data.data 

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
      const eventFound = this.events.find(e => e.start === event.start && e.end === event.end);
      console.log(event.start)
      if (event._eid) {
        this.eventTitle = event.title;
        this.eventStartTime = event.start // Extraire l'heure
        this.eventEndTime = event.end // Extraire l'heure
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
    
    addEvent() {
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
          this.errorMsg = "L\'heure de début doit être avant l\'heure de fin."
          return;
        }

        // Formatage des dates au format souhaité
        const startFormatted = `${startDateTime.toISOString().split('T')[0]} ${startDateTime.toTimeString().split(' ')[0]}`;
        const endFormatted = `${endDateTime.toISOString().split('T')[0]} ${endDateTime.toTimeString().split(' ')[0]}`;

        console.log(`Start: ${startFormatted}, End: ${endFormatted}`);

        // Choisir une couleur aléatoire et ajouter l'événement
        const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.events.push({
          title: this.eventTitle,
          start: startFormatted,
          end: endFormatted,
          class: randomColor,
        });

        this.resetForm();
      }
    },

    // updateEvent() {
    //   if (this.eventTitle && this.eventStartTime && this.eventEndTime) {
    //     const startDateTime = `${this.selectedDate.toISOString().split('T')[0]} ${this.eventStartTime}`;
    //     const endDateTime = `${this.selectedDate.toISOString().split('T')[0]} ${this.eventEndTime}`;

    //     this.events[this.editingIndex] = {
    //       title: this.eventTitle,
    //       start: startDateTime,
    //       end: endDateTime,
    //       class: this.getEventClass(this.eventTitle),
    //     };

    //     this.resetForm();
    //   }
    // },

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

  // confirmDeleteEvent(event) {
  //     if (confirm(`Voulez-vous vraiment supprimer "${event.title}" ?`)) {
  //       this.deleteEvent(event.id); // Appelez la méthode de suppression
  //     }
  //   },
  //   deleteEvent(eventId) {
  //     this.events = this.events.filter(event => event.id !== eventId); // Supprimez l'événement
  //   }

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
