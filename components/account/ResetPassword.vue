<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      password: "",
      confirmPassword: "",
      submitted: false,
      isSuccess: false,
      isDif: false,
      passwordVisible: false,
    };
  },
  validations: {
    password: {
      required
    },
    confirmPassword: {
      required
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    onReset() {
      this.submitted = true;
      this.isSuccess = false;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        if(this.password !== this.confirmPassword){
            this.isDif = true
        }else{
            this.isSuccess = true;
            localStorage.setItem("isOk", true)
            this.$router.push({
            path: "/login"
            });
        }
        
      }
    }
  }
};
</script>

<template>
   <BForm>
      <BCard class="card-auth">
        <BCardBody>
          <div class="text-center mt-2">
            <h3 class="text-light">Nouveau mot de passe</h3>
            <!-- <p class="text-muted">Reset Password with Minible.</p> -->
          </div>
          <div class="p-2 mt-4">
            <div v-if="isDif" class="alert alert-danger alert-dismissible fade show">
                Mot de passe non identique
                <button type="button" class="btn-close" @click="isDif = !isDif"></button>
            </div>
              <div class="mb-3">
                <label for="userpassword" class="text-light font-size-12 ">Nouveau Mot de passe</label>
                <div class="input-group">
                    <input 
                        v-model="password" 
                        :type="passwordVisible ? 'text' : 'password'" 
                        class="form-control" 
                        id="userpassword" 
                        placeholder="Mot de passe"
                        :class="{ 'is-invalid': submitted && v$.password.$error }" 
                    />
                    <span class="input-group-text" @click="togglePasswordVisibility">
                        <i :class="passwordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                    </span>
                </div>
                <div v-if="submitted && v$.password.$error" class="invalid-feedback">
                    <span v-if="v$.password.required.$invalid">Ce champ est obligatoire</span>
                </div>
            </div>

                <div class="mb-3">
                    <label for="usercpassword" class="font-size-12 text-light">Confirmation du Mot de passe</label>
                    <div class="input-group">
                      <input 
                        v-model="confirmPassword" 
                        :type="passwordVisible ? 'text' : 'password'" 
                        class="form-control" 
                        id="usercpassword" 
                        placeholder="Confirmez le mot de passe" 
                        :class="{'is-invalid': submitted && v$.password.$error }" 
                      />
                      <span class="input-group-text" @click="togglePasswordVisibility">
                        <i :class="passwordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                      </span>
                  </div>
                    <div v-if="submitted && v$.password.$error" class="invalid-feedback">
                      <span v-if="v$.confirmPassword.required.$invalid">Cet champ est obligatoire
                      </span>
                    </div>
                </div>

      
          </div>
        </BCardBody>
      </BCard>
      
      <div class="mt-3 text-center">
        <BButton variant="success" class="btn-bg w-sm waves-effect waves-light btn btn-sm" @click="onReset">
          Valider
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
.card-auth {
    background-color: #194698;
    border: none;
    border-radius: 30px;
    width: 500px;
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
  .card-auth {
    width: 100%;
    background-color:  #194698;
  } 
  }
  
  @media (max-width: 576px) { /* Pour les téléphones */
  .card-auth {
    margin-top: 3em;
    width: 100% !important; /* Forcer la largeur */
    background-color: #194698;
  }
  .otp-input {
  width: 2.5rem;
  height: 2.5rem; /* Forme carrée en définissant la hauteur et la largeur égales */
  text-align: center;
  font-size: 1.5rem;
  border-radius: 4px; /* Coins légèrement arrondis, tu peux ajuster selon ton besoin */
  
}
  }
</style>