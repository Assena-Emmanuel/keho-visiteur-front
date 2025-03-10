<template>
    <BCard no-body>
      <BCardBody>
        <div class="d-flex justify-content-center mb-4">
          <multiselect 
            v-model="codeVisite" 
            :options="options" 
            :option-height=31
            :custom-label="nameWithLang" 
            placeholder="Selectionnez le code Visite" 
            label="code"
            track-by="code"
            class="w-50"
            @select="visiteEven"
          >
          </multiselect>
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
  import VueCal from 'vue-cal';
  import 'vue-cal/dist/vuecal.css';
  
  import Multiselect from 'vue-multiselect'
  import { useAuthStore } from "~/stores/auth.js";
  import apiClient from '~/components/api/intercepteur';
  
  export default {
    components: { VueCal, Multiselect},
    setup(){
      return {
        authStore: useAuthStore()
      }
    },
    data() {
      return {
        date: "2025-02-26",
        heureDebut: 8,
        heureFin: 20,
        codeVisite : null,
        selectedDate: null,
        eventStartTime: null,
        eventEndTime: null,


        events: [
        ],
        isEditing: false,
        editingIndex: null,
        options: [
        ] 
      };
    },

    props:{
      code: String
    },

    // watch:{
    //   code(newValue, oldValue) {
    //     alert(1)
    //     console.log('Code visite modifié de', oldValue, 'à', newValue);
    //     this.getEven(newValue)
    //   }

    // },
    computed: {
      dateToday() {
        const today = new Date();
        return today.toISOString().split('T')[0]; // "2025-02-26"
      },
    },

    async mounted() {
      if(this.code){
        this.getEven(this.code)
      }
      try{
          const response = await apiClient.get("/user/employes", {
            headers: {
              Authorization: `Bearer ${this.authStore.token}` // Utiliser "headers" et non "Autorization"
            }
          });

          if(!response.data.error){
             response.data.data.forEach((elt)=>{
              if(elt.visite){
                this.options.push({code:elt.visite.code_visite, employe: `${elt.nom} ${elt.prenom}`})
              }
            })
          }else{
            alert(1)
          }

        }catch(e){
          console.error(e)
        }finally{

        }
    },

    methods: {
      nameWithLang ({code, employe}) {
        return `( ${code} ) — ${employe}`
      },
      async getEven(code){
        try{
          const response = await apiClient.get("/fvisites/evenements", {
            params: {
              sort_type: 2,
              code_employe: code
            },
            headers: {
              Authorization: `Bearer ${this.authStore.token}` // Utiliser "headers" et non "Autorization"
            }
          });

          if(!response.data.error){
            console.log(response.data.data.particular_event)
            this.events = response.data.data.particular_event
          }else{
            alert(1)
          }

        }catch(e){
          console.error(e)
        }finally{

        }
      },
      visiteEven(){
        if(this.codeVisite.code){
          this.getEven(this.codeVisite.code)
        }else{
          console.error("code Visiteur: obligatoir")
        }
        
      },
      onCellFocus(date) {
        this.selectedDate = new Date(date);
      },


  
  
    }
  };


  </script>
  <style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
  <style>
  .vuecal--blue-theme .event-1 {
    background-color: rgba(226, 164, 48, 0.8) !important;
  }
  .vuecal--blue-theme .event-2 {
    background-color: rgba(228, 53, 53, 0.8) !important;
  }
  .vuecal--blue-theme .event-3 {
    background-color: rgba(22, 158, 22, 0.8) !important;
  }
  
  
  .calendrier-court {
    height: 300px;
    overflow: hidden;
  }
  </style>
  