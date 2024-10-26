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
            @click="openEventModal($event)"  
            class="vuecal--blue-theme vuecal--rounded-theme"
          />
        </BCol>
        <BCol md="9">
          <vue-cal
            small
            :time="false"
            locale="fr"
            hide-view-selector
            active-view="week"
            :selected-date="selectedDate"
            class="vuecal--blue-theme"
            @cell-focus="onCellFocus"  
          />
        </BCol>
      </BRow>

      <!-- Modal pour ajouter un événement -->
      <BModal v-model="modalVisible" title="Ajouter un événement">
        <BForm @submit.prevent="addEvent">
          <BFormGroup label="Titre de l'événement">
            <BFormInput v-model="eventTitle" required />
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
  components: { VueCal},
  data() {
    return {
      selectedDate: null,
      modalVisible: false,
      eventTitle: '',
      events: []  // Stocker les événements
    };
  },
  methods: {
    openEventModal(date) {
      this.selectedDate = date;
      this.modalVisible = true; // Ouvrir le modal
    },
    addEvent() {
      if (this.eventTitle) {
        this.events.push({
          title: this.eventTitle,
          date: this.selectedDate,
        });
        this.eventTitle = ''; // Réinitialiser le titre
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
/* Ajoute tes styles ici si nécessaire */
</style>
