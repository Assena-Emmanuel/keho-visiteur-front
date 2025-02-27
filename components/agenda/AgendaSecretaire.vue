<template>
    <BCard no-body>
      <BCardBody>
        <div class="mt-3 mb-3 ">
            <multiselect 
                v-model="codeVisite" 
                class="w-50"
                :options="options" 
                :option-height=31
                :custom-label="nameWithLib" 
                placeholder="Selectionnez un employé" 
                label="code"
                track-by="code"
                :select-label="'sélectionner'"
                :deselect-label="'désélectionner'"
                @select="searEven"
            ></multiselect>
        </div>
        <BRow>
          <BCol md="">
            <vue-cal
                small
                :time-from="heureDebut * 60"
                :time-to="heureFin * 60"
                locale="fr"
                hide-weekends
                :disable-views="['years', 'year', 'month', 'week']"
                :selected-date="selectedDate"
                :events="events" 
                :eventsCountOnYearView=true
                class="vuecal--blue-theme calendrier-long"
                @cell-focus="onCellFocus"
                :minDate="date"
                :maxDate="date"
                
            />
          </BCol>
        </BRow>
  

      </BCardBody>
    </BCard>
  </template>
  
  <script>
  import { title } from 'process';
  import VueCal from 'vue-cal';
  import 'vue-cal/dist/vuecal.css';
  import Multiselect from 'vue-multiselect'
import apiClient from '../api/intercepteur';
import { useAuthStore } from "~/stores/auth.js";
import { options } from '@fullcalendar/core/preact.js';

  
  export default {
    components: { VueCal, Multiselect },
    setup() {
        return {authStore:useAuthStore()}
    },
    data() {
      return {
        date: "2025-02-26",
        heureDebut: 8,
        heureFin: 17,
        selectedDate: null,
        modalVisible: false,
        eventTitle: '',
        eventStartTime: null,
        eventEndTime: null,
        error: false,
        errorMsg: null,
        colors: [
        'event-1', 'event-2',
        'event-3',
        ],
        events: [
          { title: 'Réunion', start: '2025-02-27 09:00', end: '2025-02-27 10:00', class: 'event-1' },
          { title: 'Déjeuner', start: '2025-02-27 12:00', end: '2025-02-27 13:00', class: 'event-2' },
          { title: 'Atelier', start: '2025-02-27 14:00', end: '2025-02-27 15:30', class: 'event-3' }
        ],
        isEditing: false,
        editingIndex: null,
        codeVisite: null,
        options: [
          {code: 'VTR-001', libelle: '(VTR-001) - YAO  EMmanuel'},

        ]  
      };
    },


    props: {
        codeVsiste: String,
    },

    async mounted() {
        const response = await apiClient.get("user/employes", {
                headers:{
                    Authorization: `Bearer ${this.authStore.token}`
                }
            }
        )

        if(!response.data.error){
            response.data.data.filter((user) => {
                this.options.push({code: user.visite?.code_visite, libelle: user.nom.toUpperCase() + " "+ user.prenom})
               
            })
            
        }else{
            alert()
        }
    },


    // computed: {
    //     dateToday() {
    //     const today = new Date();
    //     return today.toISOString().split('T')[0]; // "2025-02-26"
    //     },
    // },
    watch: {
            codeVsiste(newCode) {
            if (newCode) {
                this.getAnswer()
            }

            }
    },

    methods: {
        // recuperer les evenement de l'employé selectionné
        async searEven(){
            this.getEven(this.codeVisite.code)
        },

        nameWithLib ({code, libelle}) {
            return `( ${code} ) - ${libelle}`
        },

        // recuperer les even
        async getEven(code){
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
                const today = new Date();

                response.data.data.forEach((even) =>{
                  const startDate = new Date(even.start);
                  const endDate = new Date(even.end);

                  if(startDate.getFullYear() === today.getFullYear() && 
                    endDate.getFullYear() === today.getFullYear() &&
                    startDate.getMonth() === today.getMonth() && 
                    endDate.getMonth() === today.getMonth() &&
                    startDate.getDate() === today.getDate() && 
                    endDate.getDate() === today.getDate() 
                  ){
                    this.events.push(even)
                  }
                  
                })


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
  

    }
  };
  </script>
  
  <style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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


  .vuecal__title-bar {background-color: #152520;}

  
  
  
  .calendrier-court {
    height: 300px;
    overflow: hidden;
  }
  </style>
  