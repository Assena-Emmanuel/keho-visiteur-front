<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
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
    <BCol md="8" lg="6" cols="xl-5">
      <BCard no-body>
        <BCardBody class="p-4">
          <div class="text-center mt-2">
            <h5 class="text-primary">Réinitialiser son mot de passe</h5>
            <!-- <p class="text-muted">Reset Password with Minible.</p> -->
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
                <input v-model="email" type="email" class="form-control" id="useremail" placeholder="Enter email" :class="{
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
                <BButton variant="primary" class="w-sm waves-effect waves-light" @click="onReset">
                  Envoyer
                </BButton>
              </div>

              <div class="mt-4 text-center">
                <p class="mb-0">
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
