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
            :disable-views="['years', 'year', 'week', 'day']"
            @cell-focus="selectedDate = $event"
            class="vuecal--blue-theme vuecal--rounded-theme calendrier-court"
          />
        </BCol>
        <BCol md="9">
          <vue-cal
            small
            :time-from="heureDebut * 60"
            :time-to="heureFin * 60"
            locale="fr"
            hide-weekends
            hide-view-selector
            active-view="week"
            :selected-date="selectedDate"
            :events="events" 
            class="vuecal--blue-theme calendrier-long"
            @cell-focus="onCellFocus"  
            @cell-click="openEventModal($event)"
          />
        </BCol>
      </BRow>

      <!-- Modal pour ajouter un événement -->
      <BModal v-model="modalVisible" title="Ajouter un événement" hide-footer>
        <BForm @submit.prevent="addEvent">
          <BFormGroup label="Titre de l'événement">
            <BFormInput v-model="eventTitle" required />
          </BFormGroup>
          <BFormGroup label="Heure de début">
            <BFormInput type="time" v-model="eventStartTime" required />
          </BFormGroup>
          <BFormGroup label="Heure de fin">
            <BFormInput type="time" v-model="eventEndTime" required />
          </BFormGroup>
          <BButton type="submit" variant="primary">Ajouter</BButton>
        </BForm>
      </BModal>
    </BCardBody>
  </BCard>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
  components: { VueCal },
  data() {
    return {
      heureDebut: 8,
      heureFin: 17,
      selectedDate: null,
      modalVisible: false,
      eventTitle: '',
      eventStartTime: null,
      eventEndTime: null,
      events: [  // Événements par défaut
        { title: 'Réunion', start: '2018-11-19 09:00', end: '2018-11-19 10:00' },
        { title: 'Déjeuner', start: '2018-11-19 12:00', end: '2018-11-19 13:00' },
        { title: 'Atelier', start: '2018-11-19 14:00', end: '2018-11-19 15:30' }
      ]
    };
  },
  methods: {
    openEventModal(date) {
      this.selectedDate = date;
      this.modalVisible = true; // Ouvrir le modal
    },
    addEvent() {
      if (this.eventTitle && this.eventStartTime && this.eventEndTime) {
        const startDateTime = `${this.selectedDate} ${this.eventStartTime}`;
        const endDateTime = `${this.selectedDate} ${this.eventEndTime}`;

        this.events.push({
          title: this.eventTitle,
          start: startDateTime,
          end: endDateTime,
        });
        this.eventTitle = ''; // Réinitialiser le titre
        this.eventStartTime = ''; // Réinitialiser l'heure de début
        this.eventEndTime = ''; // Réinitialiser l'heure de fin
        this.modalVisible = false; // Fermer le modal
      }
    },
    onCellFocus(date) {
      this.selectedDate = date; // Mettre à jour la date sélectionnée
    },
  },
};
</script>

<style>
.calendrier-court {
  height: 300px; /* Ajuste la hauteur pour le premier calendrier */
  overflow: hidden; /* Pour masquer le débordement si nécessaire */
}
</style>
