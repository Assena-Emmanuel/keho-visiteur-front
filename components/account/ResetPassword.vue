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
  <BRow class="justify-content-center">
    <BCol md="8" lg="6" cols="xl-5">
      <BCard no-body>
        <BCardBody class="p-4">
          <div class="text-center mt-2">
            <h3 class="text-primary">Définir nouveau mot de passe</h3>
            <!-- <p class="text-muted">Reset Password with Minible.</p> -->
          </div>
          <div class="p-2 mt-4">
            <div v-if="isDif" class="alert alert-danger alert-dismissible fade show">
                Mot de passe non identique
                <button type="button" class="btn-close" @click="isDif = !isDif"></button>
            </div>
            <BForm>
                <div class="mb-3">
                    <label for="userpassword">Nouveau Mot de passe</label>
                    <input v-model="password" type="password" class="form-control" id="userpassword" placeholder="Mot de passe" :class="{
                    'is-invalid': submitted && v$.password.$error
                    }" />
                    <div v-if="submitted && v$.password.$error" class="invalid-feedback">
                    <span v-if="v$.password.required.$invalid">Cet champ est obligatoire
                    </span>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="usercpassword">Confirmation du Mot de passe</label>
                    <input v-model="confirmPassword" type="password" class="form-control" id="usercpassword" placeholder="Confirmez le mot de passe" :class="{
                    'is-invalid': submitted && v$.password.$error
                    }" />
                    <div v-if="submitted && v$.password.$error" class="invalid-feedback">
                    <span v-if="v$.confirmPassword.required.$invalid">Cet champ est obligatoire
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
