<script>
import apiClient from "../api/intercepteur";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useAuthStore } from '~/stores/auth'

export default {
  setup() {
    const authStore = useAuthStore()
    return { v$: useVuelidate(), authStore };
  },
  data() {
    return {
      dismissibleAlert: true,
      email: "assena@gmail.com",
      password: "1111111111@",
      isRemember: true,
      processing: false,
      errorMsg: "",
      submitted: false,
      showAlert: localStorage.getItem('isOk') || false,
      passwordVisible: false,
      dismissCountDown: 10000,
      countdown: 0,
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

  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    dismissAlert(){
      this.showAlert = !this.showAlert
      localStorage.removeItem("isOk")
    },

    alertMessage(message, icon="error") {
      this.$swal.fire({
        position: "top",
        icon: icon,
        text: message,
        showConfirmButton: false,
        timer: 2000,
        customClass: {
      popup: 'custom-popup', // Classe personnalisée pour le popup
      icon: 'custom-icon', // Classe personnalisée pour l'icône
      title: 'custom-title', // Classe personnalisée pour le titre (si nécessaire)
    }
      });
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

        const { data } = await apiClient.post("/auth/login", {
          email: this.email,
          password: this.password
        });

        console.log("Réponse de l'API:", data); // Vérifie ce que retourne l'API

        if (!data || !data.access_token) {
          throw new Error("Échec de l'authentification"); // Déclenche une erreur si le token est absent
        }
        
        const token = data.access_token;
        this.authStore.setToken(token);

        console.log("pinia-------------------: "+authStore.token)

        // const accessToken = useCookie('token', { maxAge: 86400, path: '/', sameSite: 'Lax' });
        // accessToken.value = token;


        // Vérifie l'utilisateur connecté
        const response = await apiClient.post('/auth/me', {}, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // console.log("Utilisateur récupéré:", response.data);
        // const auth = useUserStore();
        // auth.setUser(response.data);

        this.authStore.setUser(response.data);

        this.$router.push('/dashboard');

      } catch (error) {
        console.error("Erreur de connexion:", error);

        if (!navigator.onLine) {
          this.alertMessage("Vérifiez votre connexion Internet.");
        } else if (error.response && error.response.status) {
          if (error.response.status === 401) {
            this.alertMessage("E-mail ou mot de passe incorrect");
          } else {
            this.alertMessage("Une erreur est survenue. Veuillez réessayer.");
          }
        } else if (error.message && error.message.includes("Network Error")) {
          this.alertMessage("Impossible de se connecter au serveur. Vérifiez votre connexion.");
        } else {
          this.alertMessage("Une erreur inconnue est survenue.");
        }


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
      <BCard class="card-auth-login">
        <BCardBody>
          <div>
            <!-- <div v-if="showAlert" class="alert alert-success alert-dismissible fade show font-size-13">
                Mot de passe réinitialisé avec succes!
                <button type="button" class="btn-close" @click="dismissAlert"></button>
            </div> -->
            <BAlert v-if="errorMsg" variant="danger" v-model="dismissibleAlert" dismissible>
              <p class="">{{ errorMsg }}</p>
            </BAlert>

            <!-- <BAlert
              v-model="dismissCountDown"
              dismissible
              variant="danger"
              @close-countdown="countdown = $event"
            >
              <p class="">{{ errorMsg }}</p>
              <BProgress variant="warning" :max="dismissCountDown" :value="countdown" height="4px" />
            </BAlert> -->

              <div class="mb-3">
                <label for="email" class="font-size-12 text-light">E-mail <span class="text-danger"><strong>*</strong></span></label>
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
                <label for="userpassword" class="font-size-12 text-light">Mot de passe <span class="text-danger"><strong>*</strong></span> </label>
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

              

              <div class="d-flex justify-content-center mt-4">
                <div>
                  <nuxt-link to="/forgot-password" class="text-danger" >
                    Mot de passe oublié?</nuxt-link>
                </div>
                
              </div>
          </div>
        </BCardBody>
      </BCard>
      <div class="mt-4 text-center">
        <BButton 
          variant="success"
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

/* Classe pour le popup */
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



.login-input{
  background-color: #f0f5ff;
}
.card-auth-login {
    background-color: #194698;
    border: none;
    border-radius: 30px;
    width: 400px;
    height: auto 
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
  .card-auth-login {
    width: 100%;
    background-color:  #194698;
  } 
  }
  
  @media (max-width: 576px) { /* Pour les téléphones */
  .card-auth-login {
    max-width: 330px !important; /* Forcer la largeur */
    background-color: #194698;
  }
  }
</style>