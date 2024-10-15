<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      code: "",
      libelle: "",
      description: "",
      submitted: false,
      isSuccess: false,
      isDif: false,
    };
  },
  validations: {
    description:{
      required
    },
    code: {
      required
    },
    libelle: {
      required
    }
  },
  methods: {
    toggledescriptionVisibility() {
      this.showdescription = !this.showdescription;
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
        if(this.code !== this.libelle){
            this.isDif = true
        }else{
            alert(`last: ${this.description} - new: ${this.code} - cnew: ${this.libelle}`)
            this.isSuccess = true;
            this.description = ""
            this.code = "",
            this.libelle = ""
            this.submitted = false
            
        }
        
      }
    }
  }
};
</script>

<template>
  <BRow class="justify-content-center">
    <div class="mb-3 fw-bold font-size-15">Création du profil</div>
    <BCol>
      <BCard no-body>
        <BCardBody class="">
            <div class="d-flex justify-content-end gap-2">
                <BButton variant="danger">Annuler</BButton>
                <BButton variant="success">Enregistre</BButton>
            </div>
            <hr class="text-secondary">

          <div class="">
            <BForm>
                <BRow>
                  <BCol md="4" sm="4">
                    <div class="mb-3">
                        <label for="code" style="font-size: 12px;">Code Profil <span class="fw-bool">*</span></label>
                        <div class="input-group">
                            <input 
                                v-model="code" 
                                type="text" 
                                class="form-control border border-black" 
                                id="code" 
                                placeholder="Code"
                                :class="{ 'is-invalid': submitted && v$.code.$error }" 
                            />
                            <div v-if="submitted && v$.code.$error" class="invalid-feedback">
                              <span v-if="v$.code.required.$invalid">Ce champ est obligatoire</span>
                          </div>
                        </div>
                        
                      </div>
                  </BCol>
                  <BCol md="4" sm="4">
                    <div class="mb-3">
                        <label for="libelle" style="font-size: 12px;">Libellé <span class="fw-bool">*</span></label>
                        <div class="input-group">
                          <input 
                            v-model="libelle" 
                            type="text" 
                            class="form-control border border-black" 
                            id="libelle" 
                            placeholder="Libellé" 
                            :class="{'is-invalid': submitted && v$.libelle.$error }" 
                          />
                          <div v-if="submitted && v$.libelle.$error" class="invalid-feedback">
                            <span v-if="v$.libelle.required.$invalid">Cet champ est obligatoire
                            </span>
                          </div>
                      </div>
                        
                    </div>
                  </BCol>
                  <BCol md="4" sm="4">
                    <div class="mb-3">
                      <label for="description" style="font-size: 12px;">Description</label>
                      <div class="input-group">
                          <input 
                              v-model="description" 
                              type="text"
                              class="form-control border border-black" 
                              id="description" 
                              placeholder="MDescription"
                              :class="{ 'is-invalid': submitted && v$.description.$error }" 
                          />
                          <div v-if="submitted && v$.description.$error" class="invalid-feedback">
                            <span v-if="v$.description.required.$invalid">Ce champ est obligatoire
                            </span>
                          </div>
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
