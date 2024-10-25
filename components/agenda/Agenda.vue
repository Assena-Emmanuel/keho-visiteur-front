<script>
import Swal from "sweetalert2";
import FullCalendar from "@fullcalendar/vue3";
import {
  calendarEvents,
  categories,
  plugins
} from "~/components/agenda/utils.js";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

/**
 * Calendar component
 */
export default {
  components: {
    FullCalendar
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
        afficherModalNotification: true,
        nomEmploye: 'KOUADIO Konan Jean',
        visiteur: {
          nom: 'Koffi Jean',
          entreprise: 'KEHO GROUPE',
          contact: '07 07 07 07 00'
        },
        lang: 'fr',

        calendarEvents,
        calendarOptions: {
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
        },
        plugins,
        initialView: "dayGridMonth",
        themeSystem: "bootstrap",
        initialEvents: calendarEvents,
        editable: true,
        droppable: true,
        eventResizableFromStart: true,
        dateClick: this.dateClicked,
        eventClick: this.editEvent,
        eventsSet: this.handleEvents,
        weekends: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true
      },
      currentEvents: [],
      showModal: false,
      eventModal: false,
      categories: categories,
      submitted: false,
      submit: false,
      newEventData: {},
      edit: {},
      deleteId: {},
      event: {
        title: "",
        category: ""
      },
      editevent: {
        editTitle: "",
        editcategory: ""
      }
    };
  },
  validations: {
    event: {
      title: {
        required
      },
      category: {
        required
      }
    }
  },
  methods: {
    /**
     * Modal form submit
     */
    // eslint-disable-next-line no-unused-vars
    handleSubmit(e) {
      this.submitted = true;

      // stop here if form is invalid
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        const title = this.event.title;
        const category = this.event.category;
        let calendarApi = this.newEventData.view.calendar;
        this.currentEvents = calendarApi.addEvent({
          id: this.newEventData.length + 1,
          title,
          start: this.newEventData.date,
          end: this.newEventData.date,
          classNames: [category]
        });
        this.successmsg();
        this.showModal = false;
        this.newEventData = {};
      }
      this.submitted = false;
      this.event = {};
    },
    // eslint-disable-next-line no-unused-vars
    hideModal(e) {
      this.submitted = false;
      this.showModal = false;
      this.event = {};
    },
    /**
     * Edit event modal submit
     */
    // eslint-disable-next-line no-unused-vars
    editSubmit(e) {
      this.submit = true;
      const editTitle = this.editevent.editTitle;
      const editcategory = this.editevent.editcategory;
      this.edit.setProp("title", editTitle);
      this.edit.setProp("classNames", editcategory);
      this.successmsg();
      this.eventModal = false;
    },

    /**
     * Delete event
     */
    deleteEvent() {
      this.edit.remove();
      this.eventModal = false;
    },
    /**
     * Modal open for add event
     */
    dateClicked(info) {
      this.newEventData = info;
      this.showModal = true;
    },
    /**
     * Modal open for edit event
     */
    editEvent(info) {
      this.edit = info.event;
      this.editevent.editTitle = this.edit.title;
      this.editevent.editcategory = this.edit.classNames[0];
      this.eventModal = true;
    },

    closeModal() {
      this.eventModal = false;
    },

    confirm() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to delete this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.value) {
          this.deleteEvent();
          Swal.fire("Deleted!", "Event has been deleted.", "success");
        }
      });
    },

    /**
     * Show list of events
     */
    handleEvents(events) {
      this.currentEvents = events;
    },

    /**
     * Show successfull Save Dialog
     */
    successmsg() {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Event has been saved",
        showConfirmButton: false,
        timer: 1000
      });
    }
  }
};
</script>

<template>
  <div>
    <!-- Affiche modal notification -->
    <BModal v-model="afficherModalNotification" title="Notification et envoi du visiteur" hide-footer>
      <div class="d-flex justify-content-between pb-2">
        <div style="height: 100%;">
          <BImg thumbnail fluid src="/images/pages/personne.png" width="190" alt="Image 1" />
        </div>
        <div >
          <div>
            <p>Bonjour monsieur <strong>{{ nomEmploye }}</strong><br>Vous avez un visiteur en Salle</p>
          </div>
          <div>
            <div class="d-flex justify-content-between line">
              <span>Nom & Prénom</span>
              <span>{{visiteur.nom}}</span>
            </div>

            <div class="d-flex justify-content-between line">
              <span>Entreprise</span>
              <span>{{ visiteur.entreprise }}</span>
            </div>

            <div class="d-flex justify-content-between line">
              <span>Contact</span>
              <span>{{ visiteur.contact }}</span>
            </div>
          </div>
        </div>
      </div>
    </BModal>

    <BRow no-body>
      <BCol cols="12">
        <BCard no-body>
          <BCardBody>
            <div class="app-calendar">
              <FullCalendar class="full-calender-wrapper" ref="fullCalendar" :options="calendarOptions" />
            </div>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>
    <BModal v-model="showModal" title="Add Event" title-class="font-18" body-class="p-3" hide-footer centered>
      <BForm @submit.prevent="handleSubmit">
        <BRow no-body>
          <BCol cols="12">
            <div class="mb-3">
              <label for="name">Event Name</label>
              <input id="name" v-model="event.title" type="text" class="form-control" placeholder="Insert Event name" :class="{ 'is-invalid': submitted && v$.event.title.$error }" />
              <div v-if="submitted && v$.event.title.required.$invalid" class="invalid-feedback">
                This value is required.
              </div>
            </div>
          </BCol>
          <BCol cols="12">
            <div class="mb-3">
              <label class="control-label">Category</label>
              <select v-model="event.category" class="form-control" name="category" :class="{ 'is-invalid': submitted && v$.event.category.$error }">
                <option v-for="option in categories" :key="option.backgroundColor" :value="`${option.value}`">
                  {{ option.name }}
                </option>
              </select>
              <div v-if="submitted && v$.event.category.$invalid" class="invalid-feedback">
                This value is required.
              </div>
            </div>
          </BCol>
        </BRow>

        <div class="d-flex justify-content-end">
          <BButton variant="light" class="me-2" @click="hideModal">Close</BButton>
          <BButton type="submit" variant="success" class="ms-1">Create event</BButton>
        </div>
      </BForm>
    </BModal>

    <BModal v-model="eventModal" title="Edit Event" title-class="font-18" hide-footer body-class="p-3" centered>
      <BForm @submit.prevent="editSubmit">
        <BRow no-body>
          <BCol cols="12">
            <div class="mb-3">
              <label for="name">Event Name</label>
              <input id="name" v-model="editevent.editTitle" type="text" class="form-control" placeholder="Insert Event name" />
            </div>
          </BCol>
          <BCol cols="12">
            <div class="mb-3">
              <label class="control-label">Category</label>
              <select v-model="editevent.editcategory" class="form-control" name="category">
                <option v-for="option in categories" :key="option.backgroundColor" :value="`${option.value}`">
                  {{ option.name }}
                </option>
              </select>
            </div>
          </BCol>
        </BRow>
        <div class="d-flex justify-content-between">
          <BButton class="me-2" variant="danger" @click="confirm">Delete</BButton>
          <div class="d-flex">
            <BButton variant="light" class="me-2" @click="closeModal">Close</BButton>
            <BButton variant="success" @click="editSubmit">Save</BButton>
          </div>
        </div>
      </BForm>
    </BModal>
  </div>
</template>

<style lang="scss">
.full-calender-wrapper {
  .fc-header-toolbar.fc-toolbar.fc-toolbar-ltr {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
}

.line{
  border-bottom: 1px solid #CCC;
  margin-bottom: 10px;
}
</style>
