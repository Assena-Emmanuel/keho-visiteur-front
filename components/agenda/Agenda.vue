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
          />
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
            <BButton v-if="isEditing" class="mt-2" @click="deleteEvent" variant="danger">
              <span v-if="!loading">Supprimer</span>
              <ScaleLoader v-if="loadingDelete" :loading="processing" height="20px" color="#FFFFFF" />
            </BButton>
            <BButton class="mt-2" type="submit" variant="primary" @click="updateEvent">
              <span v-if="!loading">Modifier</span>
              <ScaleLoader v-if="loading" :loading="processing" height="20px" color="#FFFFFF" />
            </BButton>
          </div>
          <div class="d-flex justify-content-end" v-if="!isEditing">
            <BButton class="mt-2" type="submit" variant="primary">
              <span v-if="!loading">Ajouter</span>
              <ScaleLoader v-if="loading" :loading="processing" height="20px" color="#FFFFFF" />
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
import apiClient from '~/components/api/intercepteur';
import { useAuthStore } from "~/stores/auth.js";
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue' 

export default {
  components: { VueCal, ScaleLoader },
  setup(){
      return {
        authStore: useAuthStore()
      }
    },
  data() {
    return {
      heureDebut: 8,
      heureFin: 20,
      selectedDate: null,
      modalVisible: false,
      eventTitle: '',
      eventStartTime: null,
      eventEndTime: null,
      error: false,
      errorMsg: null,
      loading:false,
      uuid : null,
      events: [
        { title: 'Réunion', start: '2024-10-28 09:00', end: '2024-10-28 10:00', class: 'event-1' },
        { title: 'Déjeuner', start: '2024-11-1 12:00', end: '2024-11-1 13:00', class: 'event-9' },
        { title: 'Atelier', start: '2024-10-29 14:00', end: '2024-10-29 15:30', class: 'event-5' }
      ],
      isEditing: false,
      editingIndex: null,
    };
  },

  mounted() {
      this.getEven()
  },

  methods: {
    async getEven(){
      try{
        const response = await apiClient.get("/fvisites/evenements", {
          params: {
            sort_type: 2,
            code_employe: this.authStore.user.visite?.code_visite
          },
          headers: {
            Authorization: `Bearer ${this.authStore.token}` // Utiliser "headers" et non "Autorization"
          }
        });

        if(!response.data.error){
          this.events = response.data.data.particular_event
        }else{
          console.error(response.data.message)
        }

      }catch(e){
        console.error(e)
      }finally{

      }
    },
    onCellFocus(date) {
      this.selectedDate = new Date(date);
    },
    formatTime(datetime) {
      const date = new Date(datetime);
      const hours = String(date.getHours()).padStart(2, '0'); // Assurez-vous d'avoir 2 chiffres
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    },
    openEventModal(event) {
      if (event._eid) {
        this.eventTitle = event.title;
        this.eventStartTime = this.formatTime(event.start) // Extraire l'heure
        this.eventEndTime = this.formatTime(event.end) // Extraire l'heure
        this.isEditing = true;
        let obj = {
          title: this.eventTitle,
          start: this.eventStartTime,
          end: this.eventEndTime,
          class: event.class
        }
        this.uuid = event.uuid
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
          this.errorMsg = "L'heure de début doit être antérieure à l'heure de fin. Merci de vérifier les horaires."

          setTimeout(() => {
            this.error = false;
          }, 2000); // 2000 ms = 2 secondes

          return;
        }

        // Formatage des dates au format souhaité
        const startFormatted = `${startDateTime.toISOString().split('T')[0]} ${startDateTime.toTimeString().split(' ')[0]}`;
        const endFormatted = `${endDateTime.toISOString().split('T')[0]} ${endDateTime.toTimeString().split(' ')[0]}`;

        this.loading = true
        try{
          const response = await apiClient.post("/event",{
            titre:this.eventTitle,
            debut: startFormatted,
            fin: endFormatted
          }, {
            headers: {
              Authorization: `Bearer ${this.authStore.token}` // Utiliser "headers" et non "Autorization"
            }
          });

          if(!response.data.error){
            this.getEven()
            this.loading = false
            this.resetForm();
          }else{
            console.error(response.data.message)
          }
        }catch(e){
          console.error("error lors de l'enregistrement de l'venement: "+e)
        }finally{
          this.loading = false
        }

        
  }
},


    async updateEvent() {
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
          this.errorMsg = "L'heure de début doit être antérieure à l'heure de fin. Merci de vérifier les horaires."

          setTimeout(() => {
            this.error = false;
          }, 2000); // 2000 ms = 2 secondes

          return;
        }

        // Formatage des dates au format souhaité
        const startFormatted = `${startDateTime.toISOString().split('T')[0]} ${startDateTime.toTimeString().split(' ')[0]}`;
        const endFormatted = `${endDateTime.toISOString().split('T')[0]} ${endDateTime.toTimeString().split(' ')[0]}`;

        this.loading = true
        if(this.uuid){
          try{
            const response = await apiClient.put(`/event/${this.uuid}`,{
              titre:this.eventTitle,
              debut: startFormatted,
              fin: endFormatted
            }, {
              headers: {
                Authorization: `Bearer ${this.authStore.token}` // Utiliser "headers" et non "Autorization"
              }
            });

            if(!response.data.error){
              this.getEven()
              this.loading = false
              this.resetForm();
            }else{
              console.error(response.data.message)
              this.error= true
              this.errorMsg = response.data.message

              setTimeout(() => {
                this.error = false;
              }, 2000); // 2000 ms = 2 secondes

            }
          }catch(e){
            console.error("error lors de la modification de l'venement: "+e)
          }finally{
            this.loading = false
          }

        }else{
          console.error("error uuid obligatoire: ")
        }



      }
    },

    async deleteEvent() {
      this.loading = true
        if(this.uuid){
          try{
            const response = await apiClient.delete(`/event/${this.uuid}`,{
              headers: {
                Authorization: `Bearer ${this.authStore.token}` // Utiliser "headers" et non "Autorization"
              }
            });

            if(!response.data.error){
              this.getEven()
              this.loading = false
              this.resetForm();
            }else{
              this.error= true
              this.errorMsg = response.data.message

              setTimeout(() => {
                this.error = false;
              }, 2000); // 2000 ms = 2 secondes

            }
          }catch(e){
            console.error("error lors de la modification de l'venement: "+e)
          }finally{
            this.loading = false
          }

        }else{
          console.error("error uuid obligatoire: ")
        }
      
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
.event-1 {
  background-color: rgba(232, 245, 233, 0.7) !important;
}
.event-2 {
  background-color: rgba(226, 242, 253, 0.7) !important;
}
.event-3 {
  background-color: rgba(255, 243, 224, 0.7) !important;
}
.event-4 {
  background-color: rgba(255, 204, 204, 0.7) !important;
}
.event-5 {
  background-color: rgba(204, 255, 204, 0.7) !important;
}
.event-6 {
  background-color: rgba(204, 204, 255, 0.7) !important;
}
.event-7 {
  background-color: rgba(255, 255, 204, 0.7) !important;
}
.event-8 {
  background-color: rgba(255, 235, 238, 0.7) !important;
}
.event-9 {
  background-color: rgba(255, 204, 255, 0.7) !important;
}
.event-10 {
  background-color: rgba(204, 255, 255, 0.7) !important;
}


.calendrier-court {
  height: 300px;
  overflow: hidden;
}
</style>
