<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import apiClient from "../api/intercepteur";
import { data } from "../parametres/useData";


export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: '',
      submitted: false,
      processing: false,
      isSuccess: false,
      isError: false,
      msgError: '',
    };
  },
  validations: {
    email: {
      required,
      email
    }
  },


  methods: {
    async onReset() {
      this.submitted = true;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }
      else{
        try{
          this.processing = true;
          await apiClient.post("/user/linkpwd",
              {
                email: this.email,
              }
          )
          .then(response => {
            let data = response.data; 
            

            if(data.error){
              this.isError = true
              this.msgError = data.message
              return
            }else{
              this.$router.push("/otp")
            }
            
            
          })
        }catch(error){
          console.error(error)
        }
        finally {
          this.processing = false;
        }
      }
    }
  }
};
</script>

<template>
  <BForm>
    <BCard class="card-auth-pwd">
        <BCardBody class="">
          <div class="text-center mb-3">
            <h5 class="text-light">Réinitialiser votre mot de passe</h5>
          </div>
          <div>
            <div class="alert-container">
              <div class="alert alert-info text-center mb-2 d-none d-md-block " role="alert">
                Entrez votre adresse <span class="fw-bold">Email</span> pour la reinitialisation du mot de passe!
              </div>
              <div class="text-light d-block d-md-none text-center mb-2 font-size-12">
                Entrez votre adresse <span class="fw-bold">Email</span> pour la reinitialisation du mot de passe!
              </div>
            </div>

              <div class="mb-3">
                <label for="useremail" class="text-light">E-mail <span class="text-danger"><strong>*</strong></span></label>
                <input v-model="email" type="email" class="form-control form-control-sm" id="useremail" placeholder="Enter email" :class="{
                  'is-invalid': v$.email.$error 
                }" />
                <div v-if="submitted && v$.email.$error" class="invalid-feedback">
                  <span v-if="v$.email.email.$invalid">Email invalide
                  </span>
                  <span v-if="v$.email.required.$invalid">Cet champ est obligatoire
                  </span>
                </div>
                <div v-if="submitted && isError" class="text-danger">
                  <span>{{ msgError }}</span>
                </div>
              </div>
          </div>
        </BCardBody>
      </BCard>
      <div class="mt-3 text-center">
        <!-- <BButton variant="success" class="btn-bg w-sm waves-effect waves-light btn btn-sm" @click="onReset">
          Envoyer
        </BButton> -->
        <BButton :loading="processing" 
          :class="['btn-bg', processing ? 'btn-loading' : '']"  
          :disabled="processing" 
          variant="success" 
          class="btn-bg w-sm waves-effect waves-light btn btn-sm" 
          @click="onReset">
          <template #loading>
            <span class="material-icons spin">Envoie...</span> <!-- Icône Material -->
          </template>
          Envoyer
        </BButton>
      </div>

      <div class="mt-4 text-center">
        <p class="mb-0" style="font-size: 10px;">
          Vous avez déjà un compte ?
          <nuxt-link to="/login" class="fw-medium text-primary">Connectez-vous</nuxt-link>
        </p>
      </div>
    </BForm>

</template>

<style>
.card-auth-pwd {
    background-color: #194698;
    border: none;
    border-radius: 30px;
    width: 400px;
    height: auto;
  } 
.btn-bg{
  background-color: #3DA92A;
  border: none;
  width: 150px;
  padding: 10px 0;
  border-radius: 20px
}

.btn-loading {
  background-color: #28a745 !important; /* Vert durant le chargement */
  color: white;
}

@media (max-width: 768px) {  Pour les tablettes 
  .card-auth-pwd {
    width: 100%;
    background-color:  #194698;
  } 
  }
  
  @media (max-width: 576px) { /* Pour les téléphones */
  .card-auth-pwd {
    width: 100% !important; /* Forcer la largeur */
    background-color: #194698;
  }
  }
</style>
