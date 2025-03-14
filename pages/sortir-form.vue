<template>
    <div id="msg">
      
      <BCard
      border-variant="primary"
      style="background-color: white; max-width: 400px; margin-top: 10em; padding: 0;" id="qr-topbar"
      >
        <!-- <BCardHeader style="background-color: #fff; border: none; padding: 0px; height: 20px;" >
          
        </BCardHeader> -->
      

        <BCardBody>
          <div class="d-flex justify-content-center" style="margin-top: -23px;">
            <div>
              <img src="/public/images/total-removebg.png" width="70" height="70" alt="logo-light" />
            </div>
          </div>
          <BForm class="ticket">
            <div class="alert alert-danger mt-3" v-if="errorCodeVisite || errorCodeVisiteur ">
              <div v-if="errorCodeVisite !=''">
                <span class="font-size-12">{{ errorCodeVisite }}</span>
              </div>
              <div v-if="errorCodeVisiteur != ''">
                <span class="font-size-12">{{ errorCodeVisiteur }}</span>
              </div>

            </div>
            <div>
              <div class="mb-3">
                <label for="codeVisite" class="fw-bold" style="font-size: 13px; color: #0052a5;">
                  <strong>Code Visite</strong> <strong class="text-danger">*</strong>
                </label>
                <div>
                  <input
                    v-model="codeVisite"
                    @input="convertToUpperVisite"
                    id="codeVisite"
                    class="form-control"
                    style="min-height: 44px;"
                    :style="{border: !(submitted && v$.codeVisite.$error) && '1px solid #0052a5'}"
                    type="text"
                    :class="{
                      'is-invalid': submitted && v$.codeVisite.$error ,
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
                    @input="convertToUpperVisiteur"
                    v-model="codeVisiteur"
                    id="codeVisiteur"
                    class="form-control"
                    style="min-height: 44px;"
                    :style="{border: !(submitted && v$.codeVisiteur.$error) && '1px solid #0052a5'}"
                    type="text"
                    :class="{
                      'is-invalid': submitted && v$.codeVisiteur.$error,
                      'border border-danger': submitted && v$.codeVisiteur.$error ,
                    }"
                  />
                <div v-if="submitted && v$.codeVisiteur.$error" class="invalid-feedback">
                    <span v-if="v$.codeVisiteur.required.$invalid" class="font-size-12">champ obligatoire</span>
                </div>
                
                
              </div>

            </div>

                
            <div class="d-flex justify-content-center mt-4">
                <BButton @click="handleSortie" variant="outline-primary" style="width: 200px;" id="btnSortie">
                  <span v-if="!loading">Valider Sortie</span>
                  <ScaleLoader :loading="loading" :height="'20px'" :color="'#FFFFFF'" />
                </BButton>
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
  import apiClient from '../components/api/intercepteur';
  import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
  import Swal from 'sweetalert2';
  
  export default {
    components:{ScaleLoader, Swal
    },
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
        loading : false,
        codeVisiteur: null,
        errorCodeVisiteur: null,
        errorCodeVisite: null,

      };
    },
    methods: {
      nameWithLang ({code}) {
        return `${code}`
      },

      convertToUpperVisiteur(){
        this.codeVisiteur = this.codeVisiteur.toUpperCase();  // Convertit la saisie en majuscule
      },

      convertToUpperVisite(){
        this.codeVisite = this.codeVisite.toUpperCase();  // Convertit la saisie en majuscule
      },

      // Valider la sortie
      async handleSortie(){
        this.submitted = true;
        this.loading = true
        this.v$.$touch();
        if (this.v$.codeVisite.$error || 
            this.v$.codeVisite.$error
        ) {
          this.loading = false
            return;
        }else{
            
            const response = await apiClient.post(`/fvisites/sortie`, {
              code_visite : this.codeVisite,
              code_visiteur: this.codeVisiteur
            });

            if(!response.data.error){
              this.submitted = false
              Swal.fire({
                position: "top",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
                customClass: {
                  popup: 'custom-popup',
                  icon: 'custom-icon',
                  title: 'custom-title'
                }
              });
              this.codeVisite = null
              this.codeVisiteur = null
              this.errorCodeVisite = null
              this.errorCodeVisiteur = null
            }else{

              if (response.data.data && response.data.data.code_visite && response.data.data.code_visite[0]) {
                this.errorCodeVisite = response.data.data.code_visite[0];
              } 

              if (response.data.data && response.data.data.code_visiteur && response.data.data.code_visiteur[0]) {
                this.errorCodeVisiteur = response.data.data.code_visiteur[0];
              }
              
              setTimeout(() => {
                this.errorCodeVisite = '';
                this.errorCodeVisiteur = '';
              }, 5000); 

              

            }

        }
        
        this.loading = false
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

.ticket {
  background-image: linear-gradient(rgba(255, 254, 254, 0.93), rgba(255, 255, 255, 0.93)), url("/images/total-removebg.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  block-size: 100%;
  inline-size: 100%;
}

.custom-popup {
  display: flex;
  align-items: center;
  padding: 10px;
}

/* Classe pour l'icône */
.custom-icon {
  font-size: 10px;
  float: left;
}
  </style>
  