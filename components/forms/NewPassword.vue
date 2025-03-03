<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import apiClient from "~/components/api/intercepteur";

export default {
  setup() {
    const authStore = useAuthStore();
    return { v$: useVuelidate(), authStore };
  },
  data() {
    return {
      newpassword: "",
      confirmPassword: "",
      lastPassword: "",
      loading: false,
      submitted: false,
      isSuccess: false,
      passwordVisible: false,
      showLastPassword: false,
      processing: false,
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

    toggleLastPasswordVisibility() {
      this.showLastPassword = !this.showLastPassword;
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    async onReset() {
      this.submitted = true;
      this.isSuccess = false;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
          
          try {
            this.processing = true;

            if(this.newpassword !== this.confirmPassword){
              // this.$swal.fire("Erreur!", `Mot de passe de confirmation different!`, "error");
              this.alertMessage(`Mot de passe de confirmation different!`)
              this.submitted = false;
              return
            }
            const token = useCookie('token')

            
            const response = await apiClient.post('/user/me_pwd', {
                old_password: this.lastPassword,
                password: this.newpassword,
                password_confirmation: this.confirmPassword,

              }, {
                headers: { 
                  'Authorization': `Bearer ${token.value}`, 
                }
              });

            if(response.data.error){
                const message =  response.data.message
                // this.$swal.fire("Erreur!", `${message}`, "error");
                this.alertMessage(`${message}`, "error")
                return
            }else{
              // this.$swal.fire("Succes!", `${response.data.message}`, "success");
              this.alertMessage(`${response.data.message}`, "success")
              this.isSuccess = true;
              this.lastPassword = ""
              this.newpassword = "",
              this.confirmPassword = ""
              this.submitted = false
              return
            }
            
          } catch (error) {
            console.error('Error fetching user info:', error);
          }finally {
            this.processing = false;
          }
        }
    }
  }
};
</script>

<template>
  <BRow class="justify-content-center">
    <span>Paremétrage du mot de passe</span>
    <BCol>
      <BCard no-body>
        <BCardBody class="p-4">
          <div class="text-center mt-2">
            <h3 class="text-primary">Changer de Mot de passe</h3>
            <!-- <p class="text-muted">Reset Password with Minible.</p> -->
          </div>
          <div class="p-2 mt-4">
            
            <BForm>
                <BRow>
                  <BCol md="4" sm="4">
                    <div class="mb-3">
                      <label for="lastpassword" style="font-size: 12px;">Ancien Mot de passe <span class="fw-bool">*</span></label>
                      <div class="input-group">
                          <input 
                              v-model="lastPassword" 
                              :type="showLastPassword ? 'text' : 'password'" 
                              class="form-control border border-black" 
                              id="lastpassword" 
                              placeholder="Mot de passe"
                              :class="{ 'is-invalid': submitted && v$.lastPassword.$error }" 
                          />
                          <span class="input-group-text border border-black" @click="toggleLastPasswordVisibility">
                            <i :class="showLastPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                          </span>

                          <div v-if="submitted && v$.lastPassword.$error" class="invalid-feedback">
                            <span v-if="v$.lastPassword.required.$invalid">Ce champ est obligatoire
                            </span>
                          </div>
                      </div>
                      
                    </div>
                  </BCol>
                  <BCol md="4" sm="4">
                    <div class="mb-3">
                        <label for="userpassword" style="font-size: 12px;">Nouveau Mot de passe <span class="fw-bool">*</span></label>
                        <div class="input-group">
                            <input 
                                v-model="newpassword" 
                                :type="passwordVisible ? 'text' : 'password'" 
                                class="form-control border border-black" 
                                id="userpassword" 
                                placeholder="Mot de passe"
                                :class="{ 'is-invalid': submitted && v$.newpassword.$error }" 
                            />
                            <span class="input-group-text border border-black" @click="togglePasswordVisibility">
                              <i :class="passwordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                            </span>
                            <div v-if="submitted && v$.newpassword.$error" class="invalid-feedback">
                              <span v-if="v$.newpassword.required.$invalid">Ce champ est obligatoire</span>
                          </div>
                        </div>
                        
                      </div>
                  </BCol>
                  <BCol md="4" sm="4">
                    <div class="mb-3">
                        <label for="usercpassword" style="font-size: 12px;">Confirmation du Mot de passe <span class="fw-bool">*</span></label>
                        <div class="input-group">
                          <input 
                            v-model="confirmPassword" 
                            :type="passwordVisible ? 'text' : 'password'" 
                            class="form-control border border-black" 
                            id="usercpassword" 
                            placeholder="Confirmez le mot de passe" 
                            :class="{'is-invalid': submitted && v$.confirmPassword.$error }" 
                          />
                          <span class="input-group-text border border-black" @click="togglePasswordVisibility">
                            <i :class="passwordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                          </span>
                          <div v-if="submitted && v$.confirmPassword.$error" class="invalid-feedback">
                            <span v-if="v$.confirmPassword.required.$invalid">Cet champ est obligatoire
                            </span>
                          </div>
                      </div>
                        
                    </div>
                  </BCol>
                </BRow>

              <div class="mt-3 text-center">
                <BButton 
                  variant="primary" 
                  class="w-sm waves-effect waves-light" 
                  @click="onReset"
                  :loading="loading"
                  loading-text="Modification" 
                >
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
</style>
