<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import axios from "axios";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: localStorage.getItem('email') || '',
      submitted: false,
      isSuccess: false
    };
  },
  validations: {
    email: {
      required,
      email
    }
  },


  methods: {
    onReset() {
      this.submitted = true;
      this.isSuccess = false;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
        .then(function (response) {
          console.log('data: '+response.data);
          console.log('status: '+response.status);
          console.log('statusText: '+response.statusText);
          console.log('headers: '+response.headers);
          console.log('config: '+response.config);
        });

        this.isSuccess = true;
        localStorage.setItem('email', this.email)
        this.$router.push({
          path: "otp"
        });
      }
    }
  }
};
</script>

<template>
  <BRow class="justify-content-center">
    <BCol md="8" lg="6" cols="xl-5" style="width: 400px;">
      <BCard no-body>
        <BCardBody class="p-4">
          <div class="text-center mt-2">
            <h5 class="text-primary">Réinitialiser votre mot de passe</h5>
          </div>
          <div class="p-2 mt-4">
            <div class="alert alert-info text-center mb-4" role="alert">
              Entrez votre adresse <span class="fw-bold">Email</span> pour la reinitialisation du mot de passe!
            </div>
            <!-- <div v-if="isSuccess" class="alert alert-success text-center mb-4" role="alert">
              Reset link are sended to your mailbox, check there first
            </div> -->
            <BForm>
              <div class="mb-3">
                <label for="useremail">Email</label>
                <input v-model="email" type="email" class="form-control form-control-sm" id="useremail" placeholder="Enter email" :class="{
                  'is-invalid': v$.email.$error
                }" />
                <div v-if="submitted && v$.email.$error" class="invalid-feedback">
                  <span v-if="v$.email.email.$invalid">Email invalide
                  </span>
                  <span v-if="v$.email.required.$invalid">Cet champ est obligatoire
                  </span>
                </div>
              </div>

              <div class="mt-3 text-center">
                <BButton variant="primary" class="w-sm waves-effect waves-light btn btn-sm" @click="onReset">
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
          </div>
        </BCardBody>
      </BCard>
      
    </BCol>
  </BRow>
</template>
