<template>
    <div id="msg">
      
      <BCard
      border-variant="primary"
      style="background-color: white; width: 500px; margin-top: 10em;" id="qr-topbar"
      >
        <BCardHeader style="background-color: none;">
          <div class="d-flex justify-content-center">
            <div>
              <img src="/images/total-removebg.png" width="100" height="100" alt="logo-light" />
            </div>
          </div>
        </BCardHeader>
      

        <BCardBody>
          <BForm>

            <div>
              <div class="mb-3">
                <label for="codeVisite" class="fw-bold" style="font-size: 13px; color: #0052a5;">
                  <strong>Code Visite</strong> <strong class="text-danger">*</strong>
                </label>
                <div>
                  <input
                    v-model="codeVisite"
                    id="codeVisite"
                    class="form-control"
                    style="min-height: 44px;"
                    :style="{border: !(submitted && v$.codeVisite.$error) && '1px solid #0052a5'}"
                    type="text"
                    :class="{
                      'is-invalid': submitted && v$.codeVisite.$error,
                      'border border-danger': submitted && v$.codeVisite.$error,
                    }"
                  />
                  <div v-if="submitted && v$.codeVisite.$error" class="invalid-feedback">
                    <span v-if="v$.codeVisite.required.$invalid" class="font-size-12">champ obligatoire</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div><label class="typo__label" style="color: #0052a5">Code Visiteur<strong class="text-danger">*</strong></label>
                <input
                    v-model="codeVisiteur"
                    id="codeVisiteur"
                    class="form-control"
                    style="min-height: 44px;"
                    :style="{border: !(submitted && v$.codeVisiteur.$error) && '1px solid #0052a5'}"
                    type="text"
                    :class="{
                      'is-invalid': submitted && v$.codeVisiteur.$error,
                      'border border-danger': submitted && v$.codeVisite.$error,
                    }"
                  />
                <div v-if="submitted && v$.codeVisiteur.$error" class="invalid-feedback">
                    <span v-if="v$.codeVisiteur.required.$invalid" class="font-size-12">champ obligatoire</span>
                  </div>
              </div>
            </div>

                
            <div class="d-flex justify-content-center mt-4">
                <BButton @click="handleSortie" variant="outline-primary" style="width: 200px;" id="btnSortie">Sortie</BButton>
            </div>
        </BForm>
        </BCardBody>
      </BCard>
    </div>
  </template>
  
  <script>
  definePageMeta({
        layout: "utility"
    });
  import { useVuelidate } from "@vuelidate/core";
  import { required } from "@vuelidate/validators";
  import Multiselect from 'vue-multiselect'
  
  export default {

    setup() {
      return { v$: useVuelidate() };
    },
    data() {
      return {
        submitted:false,
        codeVisite: "",
        employ: "",
        submitted: false,
        currentPage: 1,

        codeVisiteur: null,

      };
    },
    methods: {
      nameWithLang ({code}) {
        return `${code}`
      },
      handleSortie(){
        this.submitted = true;
        this.v$.$touch();
        if (this.v$.codeVisite.$error || 
            this.v$.codeVisite.$error
        ) {
            return;
        }else{
            this.submitted = false
        }
      }
    },

    validations: {
      codeVisite: { required },
      codeVisiteur: { required },
    },
  };
  </script>
  
  <style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
  <style>
  /* Styles personnalisés pour pagination et disposition */
  .bg-card {
    background-color: rgba(204, 200, 200, 0.5); /* Gris avec 50% de transparence */
  }
  #qr-topbar {
    margin-top: 1em;
  
    @media (max-width: 576px) {
        max-width: 350px;
    }

    @media (min-width: 768px) and (max-width: 991px) {
      width: 600px;
    }

    @media (min-width: 992px) {
      width: 700px;
    }

  }
  #msg {
    
    @media (max-width: 576px) {
        height: 100vh;
    }

    @media (min-width: 768px) and (max-width: 991px) {
        height: 100vh;
    }

    @media (min-width: 992px) {
        height: 110vh;
    }

  }





#btnSortie {
  background: #00b140;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

#btnSortie:hover {
  transform: scale(1.05);
}

.text-color{
  color: #0052a5;
}

  </style>
  