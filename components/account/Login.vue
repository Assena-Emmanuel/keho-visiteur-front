<script>
import axios from "axios";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "admin@themesbrand.com",
      password: "123456",
      isRemember: true,
      processing: false,
      errorMsg: "",
      submitted: false,
      showAlert: localStorage.getItem('isOk') || false,
      passwordVisible: false,
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  mounted() {
    // Vide le localStorage lorsque ce composant est monté
    localStorage.removeItem('email');
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    dismissAlert(){
      this.showAlert = !this.showAlert
      localStorage.removeItem("isOk")
    },
    async onLogin() {
      this.submitted = true;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.errorMsg = "";
        try {
          this.processing = true;
          const { data } = await axios.post(
            "https://api-node.themesbrand.website/auth/signin",
            {
              email: this.email,
              password: this.password
            }
          );
          const status = data.status;
          const response = data.data;
          if (status === "success") {
            localStorage.setItem("user", JSON.stringify(response));
            localStorage.removeItem("isOk")
            this.$router.push({
              path: "/dashboard"
            });
          } else {
            this.errorMsg = response;
          }
        } catch (error) {
          console.error("failed at onLogin", { error });
          localStorage.removeItem("user");
        } finally {
          this.processing = false;
        }
      }
    }
  }
};
</script>

<template>
  <BForm>
      <BCard no-body class="auth-card">
        <BCardBody class="">
          <div>
            <div v-if="showAlert" class="alert alert-success alert-dismissible fade show font-size-13">
                Mot de passe réinitialisé avec succes!
                <button type="button" class="btn-close" @click="dismissAlert"></button>
            </div>
              <div class="mb-3">
                <label for="email" style="font-size: 12px;">Email</label>
                <input v-model="email" type="text" class="form-control form-control-sm login-input" id="email" placeholder="Votre email" :class="{
                  'is-invalid': submitted && v$.email.$error
                }" />
                

                <div v-if="submitted && v$.email.$error" class="invalid-feedback">
                  <span v-if="v$.email.email.$invalid">Email invalide
                  </span>
                  <span v-if="v$.email.required.$invalid">Email obligatoire
                  </span>
                </div>
              </div>

              <div class="mb-3">
                <label for="userpassword" style="font-size: 12px;">Mot de passe</label>
                <div class="input-group">
                  <input 
                    v-model="password" 
                    id="userpassword" 
                    class="form-control form-control-sm login-input" 
                    aria-describedby="passwordHelpBlock" 
                    placeholder="Votre password" 
                    :type="passwordVisible ? 'text' : 'password'"
                    :class="{
                    'is-invalid': submitted && v$.password.$error,
              
                  }">
                  <span class="input-group-text" @click="togglePasswordVisibility">
                      <i :class="passwordVisible ? 'fa fa-eye' : 'fa fa-eye-slash' "></i>
                  </span>
                </div>
                <div v-if="submitted && v$.password.$error" class="invalid-feedback">
                  <span v-if="v$.password.required.$invalid">Mot de passe obligatoire
                  </span>
                </div>
              </div>


              <div class="mt-3 text-danger">{{ errorMsg }}</div>
              

              <div class="d-flex justify-content-center mt-4">
                <div class="btn btn-outline-info btn-sm">
                  <nuxt-link to="/forgot-password" >
                    Mot de passe oublié?</nuxt-link>
                </div>
                
              </div>
          </div>
        </BCardBody>
      </BCard>
      <div class="mt-4 text-center">
        <BButton 
          :loading="processing" 
          loading-text="Chargement" 
          :class="['btn-bg', processing ? 'btn-loading' : '']"  
          :disabled="processing" 
          @click="onLogin">
          Se connecter
        </BButton>
      </div>
    </BForm>
</template>
<style>
.login-input{
  background-color: #f0f5ff;
}
.auth-card{
  background-color: #194698;
  border: none;
  border-radius: 30px;
  min-width: 400px;
  height: 700;
}
.btn-bg{
  background-color: #3DA92A;
  border: none;
  width: 150px;
  padding: 10px 0;
  border-radius: 20px
}
.btn-bg:hover{
  background-color: #8ed581;
}
.btn-loading {
  background-color: #28a745 !important; /* Vert durant le chargement */
  color: white;
}
</style>