<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      newpassword: "",
      confirmPassword: "",
      lastPassword: "",
      submitted: false,
      isSuccess: false,
      isDif: false,
      passwordVisible: false,
      showLastPassword: false,
    };
  },
  validations: {
    lastPassword:{
      required
    },
    newpassword: {
      required
    },
    confirmPassword: {
      required
    }
  },
  methods: {
    toggleLastPasswordVisibility() {
      this.showLastPassword = !this.showLastPassword;
    },
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
        if(this.newpassword !== this.confirmPassword){
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
  <BRow class="justify-content-center">
    <BCol>
      <BCard no-body>
        <BCardBody class="p-4">
          <div class="text-center mt-2">
            <h3 class="text-primary">Changer de Mot de passe</h3>
            <!-- <p class="text-muted">Reset Password with Minible.</p> -->
          </div>
          <div class="p-2 mt-4">
            <div v-if="isDif" class="alert alert-danger alert-dismissible fade show">
                Mot de passe non identique
                <button type="button" class="btn-close" @click="isDif = !isDif"></button>
            </div>
            <BForm>
                <BRow>
                  <BCol md="4" sm="4">
                    <div class="mb-3">
                      <label for="lastpassword" style="font-size: 12px;">Ancien Mot de passe</label>
                      <div class="input-group">
                          <input 
                              v-model="lastPassword" 
                              :type="showLastPassword ? 'text' : 'password'" 
                              class="form-control" 
                              id="lastpassword" 
                              placeholder="Mot de passe"
                              :class="{ 'is-invalid': submitted && v$.lastPassword.$error }" 
                          />
                          <span class="input-group-text" @click="toggleLastPasswordVisibility">
                            <i :class="showLastPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                          </span>
                      </div>
                      {{ submitted && v$.lastPassword.$error }}
                      <div v-if="submitted && v$.lastPassword.$error" class="invalid-feedback">

                          <span v-if="v$.lastPassword.required.$invalid">Ce champ est obligatoire</span>
                      </div>
                    </div>
                  </BCol>
                  <BCol md="4" sm="4">
                    <div class="mb-3">
                        <label for="userpassword" style="font-size: 12px;">Nouveau Mot de passe</label>
                        <div class="input-group">
                            <input 
                                v-model="newpassword" 
                                :type="passwordVisible ? 'text' : 'password'" 
                                class="form-control" 
                                id="userpassword" 
                                placeholder="Mot de passe"
                                :class="{ 'is-invalid': submitted && v$.newpassword.$error }" 
                            />
                            <span class="input-group-text" @click="togglePasswordVisibility">
                              <i :class="passwordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                            </span>
                        </div>
                        {{ submitted && v$.newpassword.$error }}
                        <div v-if="submitted && v$.newpassword.$error" class="invalid-feedback">
                            <span v-if="v$.newpassword.required.$invalid">Ce champ est obligatoire</span>
                        </div>
                      </div>
                  </BCol>
                  <BCol md="4" sm="4">
                    <div class="mb-3">
                        <label for="usercpassword" style="font-size: 12px;">Confirmation du Mot de passe</label>
                        <div class="input-group">
                          <input 
                            v-model="confirmPassword" 
                            :type="passwordVisible ? 'text' : 'password'" 
                            class="form-control" 
                            id="usercpassword" 
                            placeholder="Confirmez le mot de passe" 
                            :class="{'is-invalid': submitted && v$.confirmPassword.$error }" 
                          />
                          <span class="input-group-text" @click="togglePasswordVisibility">
                            <i :class="passwordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                          </span>
                      </div>
                      {{ submitted && v$.confirmPassword.$error }}
                        <div v-if="submitted && v$.confirmPassword.$error" class="invalid-feedback">
                          <span v-if="v$.confirmPassword.required.$invalid">Cet champ est obligatoire
                          </span>
                        </div>
                    </div>
                  </BCol>
                </BRow>

              <div class="mt-3 text-center">
                <BButton variant="primary" class="w-sm waves-effect waves-light" @click="onReset">
                  Enregistrer
                </BButton>
              </div>

            </BForm>
          </div>
        </BCardBody>
      </BCard>
      
    </BCol>
  </BRow>
</template>
