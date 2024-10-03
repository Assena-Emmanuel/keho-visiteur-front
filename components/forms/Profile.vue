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
        // infos personnelles
        nom: "",
        prenom: "",
        civilite: "",
        email : "",
        civilite: "",
        mobile1: "",
        mobile2: "",
        photo: "",
        // infos professionnelles
        matricule: "",
        codeVisite: "",
        departement: "",
        service: "",
        processing: false,
        submitted: false,
        statut: ""
      };
    },
    validations: {
      email: {
        required,
        email
      },
      nom: {
        required,
      },
      prenom: {
        required,
      },
      civilite: {
        required,
      },
      mobile1: {
        required,
      },
      matricule:{
        required
      },
      codeVisite: {
        required
      },
      departement:{
        required
      },
      service: {
        required
      },
      photo:{required},
      statut: {required},
   
    },
    methods:{
      handleFileUpload(event) {
      // Récupérer le fichier sélectionné
      const file = event.target.files[0];
      console.log(file);

  
      },
      async onLogin() {
      this.submitted = true;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.errorMsg = "";
        alert(`nom: ${this.nom}, nom: ${this.prenom}, nom: ${this.civilite}, nom: ${this.email}, nom: ${this.mobile1}, nom: ${this.mobile2}`)
        this.nom = ""
        this.prenom = ""
        this.civilite = ""
        this.email = ""
        this.mobile1 = ""
        this.mobile2 = ""
        this.submitted = false;
        // try {
        //   this.processing = true;
        //   const { data } = await axios.post(
        //     "https://api-node.themesbrand.website/auth/signin",
        //     {
        //       email: this.email,
        //       password: this.password
        //     }
        //   );
        //   const status = data.status;
        //   const response = data.data;
        //   if (status === "success") {
        //     localStorage.setItem("user", JSON.stringify(response));
        //     localStorage.removeItem("isOk")
        //     this.$router.push({
        //       path: "/dashboard"
        //     });
        //   } else {
        //     this.errorMsg = response;
        //   }
        // } catch (error) {
        //   console.error("failed at onLogin", { error });
        //   localStorage.removeItem("user");
        // } finally {
        //   this.processing = false;
        // }
      }
    }
    }
  }
  




</script>

<template>
    <BRow>
      <span>Paramétrage du Profil</span>
      <BCard no-body >
        <BCardBody class="pb-0">
          <BForm>
            <BCardTitle class="text-center font-size-20 mb-5">Informations Personnelles</BCardTitle>
            <BRow class="mt-3 mb-4">
              <BCol sm="3" class="mb-3">
                <label for="civilite" style="font-size: 12px;">Civilité</label>
                <div class="input-group">
                  <select v-model="civilite" id="civilite" class="form-select border border-black" aria-label="Default select example" :class="{
                    'is-invalid': submitted && v$.civilite.$error
                  }">
                    <option value="" selected>civilité...</option>
                    <option value="MONSIEUR">MONSIEUR</option>
                    <option value="MADAME">MADAME</option>
                    <option value="MADEMOISELLE">MADEMOISELLE</option>
                  </select>
                  <div v-if="submitted && v$.civilite.$error" class="invalid-feedback">
                    <span v-if="v$.civilite.required.$invalid">Civilité obligatoire
                    </span>
                  </div>
                </div>
              </BCol>
              <BCol sm="3" class="mb-3">
                <label for="nom" style="font-size: 12px;">Nom</label>
                <div class="input-group border border-black">
                  <input 
                    v-model="nom" 
                    id="nom" 
                    class="form-control" 
                    type="text"
                    :class="{
                    'is-invalid': submitted && v$.nom.$error
                  }">
                  <div v-if="submitted && v$.nom.$error" class="invalid-feedback">
                    <span v-if="v$.nom.required.$invalid">Prénom obligatoire
                    </span>
                  </div>
                </div>
              </BCol>
              <BCol sm="3" class="mb-3">
                <label for="prenom" style="font-size: 12px;">Prénom</label>
                <div class="input-group">
                  <input 
                    v-model="prenom" 
                    id="prenom" 
                    class="form-control border border-black" 
                    type="text"
                    :class="{
                    'is-invalid': submitted && v$.prenom.$error
                  }">
                  <div v-if="submitted && v$.prenom.$error" class="invalid-feedback">
                  <span v-if="v$.prenom.required.$invalid">Prénom obligatoire
                  </span>
                </div>
                </div>
              </BCol>
              <BCol sm="3" class="mb-3">
                <label for="email" style="font-size: 12px;">E-mail</label>
                <input v-model="email" type="email" class="form-control border border-black" id="email" :class="{
                  'is-invalid': submitted && v$.email.$error
                }" />
                <div v-if="submitted && v$.email.$error" class="invalid-feedback">
                  <span v-if="v$.email.email.$invalid">Email invalide
                  </span>
                  <span v-if="v$.email.required.$invalid">Email obligatoire
                  </span>
                </div>
              
              </BCol>
              <BCol sm="3" class="mb-3">
                <label for="mobile1" style="font-size: 12px;">Tel. Mobile</label>
                <input v-model="mobile1" 
                  type="tel" 
                  class="form-control border border-black" 
                  id="mobile1" 
                  :class="{'is-invalid': submitted && v$.mobile1.$error}"
                  @input="mobile1 = $event.target.value.replace(/\D/g, '')" 
                  maxlength="10" 
                />
                <div v-if="submitted && v$.mobile1.$error" class="invalid-feedback">
                  <span v-if="v$.mobile1.required.$invalid">Numéro obligatoire</span>
                </div>
              </BCol>

              <BCol sm="3" class="mb-3">
                <label for="mobile2" style="font-size: 12px;">Autre Tel. Mobile</label>
                <input v-model="mobile2" 
                  type="tel" 
                  class="form-control border border-black" 
                  id="mobile2" 
                  @input="mobile2 = $event.target.value.replace(/\D/g, '')" 
                  maxlength="10" 
                />
              </BCol>
              <BCol sm="3" class="mb-3">
                <label for="photo" style="font-size: 12px;">Photo</label>
                <input 
                  @change="handleFileUpload" 
                  type="file" 
                  class="form-control border border-black" 
                  id="photo" 
                />
              </BCol>
            </BRow>
            <BRow> <hr class="border-secondary"> </BRow>
            <BRow>
              <BCardTitle class="text-center font-size-20 mb-5">Informations Professionnelles</BCardTitle>
              <BCol sm="3" class="mb-3">
                <label for="nom" style="font-size: 12px;">Matricule</label>
                <div class="input-group">
                  <input 
                    v-model="matricule" 
                    id="nom" 
                    class="form-control border border-black" 
                    type="text"
                    :class="{
                    'is-invalid': submitted && v$.nom.$error
                  }">
                  <div v-if="submitted && v$.matricule.$error" class="invalid-feedback">
                    <span v-if="v$.matricule.required.$invalid">Matricule obligatoire
                    </span>
                  </div>
                </div>
              </BCol>
              <BCol sm="3" class="mb-3">
                <label for="nom" style="font-size: 12px;">Code Visite</label>
                <div class="input-group">
                  <input 
                    v-model="codeVisite" 
                    id="nom" 
                    class="form-control border border-black" 
                    type="text"
                    :class="{
                    'is-invalid': submitted && v$.codeVisite.$error
                  }">
                  <div v-if="submitted && v$.codeVisite.$error" class="invalid-feedback">
                    <span v-if="v$.codeVisite.required.$invalid">Code visite obligatoire
                    </span>
                  </div>
                </div>
              </BCol>
              <BCol sm="3" class="mb-3">
                <label for="nom" style="font-size: 12px;">Département</label>
                <div class="input-group">
                  <input 
                    v-model="departement" 
                    id="nom" 
                    class="form-control border border-black" 
                    type="text"
                    :class="{
                    'is-invalid': submitted && v$.nom.$error
                  }">
                  <div v-if="submitted && v$.departement.$error" class="invalid-feedback">
                    <span v-if="v$.departement.required.$invalid">Département obligatoire
                    </span>
                  </div>
                </div>
              </BCol>
              <BCol sm="3" class="mb-3">
                <label for="service" style="font-size: 12px;">Service</label>
                <div class="input-group">
                  <input 
                    v-model="service" 
                    id="service" 
                    class="form-control border border-black" 
                    type="text"
                    :class="{
                    'is-invalid': submitted && v$.service.$error
                  }">
                  <div v-if="submitted && v$.service.$error" class="invalid-feedback">
                    <span v-if="v$.service.required.$invalid">Service obligatoire
                    </span>
                  </div>
                </div>
              </BCol>
              <BCol sm="3" class="mb-3">
                <label for="statut" style="font-size: 12px;">Statut</label>
                <div class="input-group">
                  <select v-model="statut" id="statut" class="form-select border border-black" aria-label="Default select example" :class="{
                    'is-invalid': submitted && v$.statut.$error
                  }">
                    <option value="ACTIF">ACTIF</option>

                  </select>
                  <div v-if="submitted && v$.service.$error" class="invalid-feedback">
                    <span v-if="v$.service.required.$invalid">Service obligatoire
                    </span>
                  </div>
                </div>
              </BCol>
            
            </BRow>

            <BRow class="d-flex justify-content-center mb-5 mt-5">
              <BButton :loading="processing ? true : fasle" variant="primary" class="w-sm waves-effect waves-light btn" :disabled="processing" @click="onLogin">
                Enregistrer
              </BButton>
            </BRow>
        </BForm>
          
        </BCardBody>
      </BCard>
    </BRow>
</template>
<style>
  #cardFrom{
    background: linear-gradient(90deg, rgb(226, 226, 231), rgb(226, 226, 231));
  }
</style>