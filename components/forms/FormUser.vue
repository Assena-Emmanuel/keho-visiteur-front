<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";


export default{
  setup() {
    return { v$: useVuelidate() };
  },
  data(){
    return{
        nom: "",
        prenom: "",
        civilite: "",
        email : "",
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
        submitted: false,
        statut: "ACTIVE",
        submitted: false,
        isEditMode: false
    }
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
   
    },

  props: {
    modelValue: Boolean,
    isEditMode: Boolean,
    selectedIndex: Number,  // L'index de l'élément à éditer
    data: Array,
  
  },

  methods:{
    handleFileUpload(event) {
      // Récupérer le fichier sélectionné
      this.photo = event.target.files[0];
    },

    onSaveUser() {
      this.submitted = true;
      this.v$.$touch();
      if( 
        this.v$.email.$error || 
        this.v$.nom.$error || 
        this.v$.prenom.$error || 
        this.v$.civilite.$error || 
        this.photo=="" || 
        this.v$.mobile1.$error ||
        this.v$.codeVisite.$error || 
        this.v$.departement.$error || 
        this.v$.service.$error || 
        this.v$.matricule.$error
    ){

          return
      }
    },
    resetForm() {
      // Reset all form fields and validation state
      this.libelleDepartement = '';
      this.codeDepartement = '';
      this.submitted = false;
      // Reset validation (if using Vuelidate or similar)
      if (this.$v) {
        this.$v.$reset();
      }
    },
  }
}
</script>
<template>
  <BModal 
      @hide="resetForm" 
      size="lg"
      :modelValue="modelValue" 
      @update:modelValue="$emit('update:modelValue', $event)"
      :title="isEditMode ? `Modifier les informations de l'Utilisateur ${selectedIndex}` : 'Création d\'Utilisateur'" 
      title-class="font-18" 
      hide-footer
  >
  <BForm class="form-vertical" role="form">

    <div class="d-flex justify-content-center">
        <span class="wizard-step">
            <i class="wizard-icon mdi mdi-account-circle font-size-24"></i>
        </span>
    </div>
    <div class="text-center"><h4 class="font-size-20 mb-3">Informations Personnelles</h4></div>


    <BRow class="mt-3 mb-4">
    <BCol sm="3" class="mb-3">
        <label for="civilite" style="font-size: 12px; font-weight: bolder">Civilité</label>
        <div class="input-group">
            <select v-model="civilite" id="civilite" class="form-select border border-black rounded-2" aria-label="Default select example" :class="{
            'is-invalid': submitted && v$.civilite.$error
            }">
            <option value="" selected>civilité...</option>
            <option value="MONSIEUR">MONSIEUR</option>
            <option value="MADAME">MADAME</option>
            <option value="MADEMOISELLE">MADEMOISELLE</option>
            </select>
            <div v-if="submitted && v$.civilite.$error" class="invalid-feedback">
            <span v-if="v$.civilite.required.$invalid">Champ obligatoir
            </span>
            </div>
        </div>
    </BCol>
    <BCol sm="3" class="mb-3">
        <label for="nom" style="font-size: 12px; font-weight: bolder">Nom</label>
        <div class="input-group">
            <input 
            v-model="nom" 
            id="nom" 
            class="form-control border border-black rounded-2" 
            type="text"
            :class="{
            'is-invalid': submitted && v$.nom.$error
            }">
            <div v-if="submitted && v$.nom.$error" class="invalid-feedback">
            <span v-if="v$.nom.required.$invalid">Nom obligatoire
            </span>
            </div>
        </div>
    </BCol>

    <BCol sm="3" class="mb-3">
        <label for="prenom" style="font-size: 12px; font-weight: bolder">Prénom</label>
        <div class="input-group">
            <input 
            v-model="prenom" 
            id="prenom" 
            class="form-control border border-black rounded-2" 
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
        <label for="email" style="font-size: 12px; font-weight: bolder">E-mail</label>
        <input v-model="email" type="email" class="form-control border border-black rounded-2" id="email" :class="{
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
        <label for="mobile1" style="font-size: 12px; font-weight: bolder">Tel. Mobile</label>
        <input v-model="mobile1" 
            type="tel" 
            class="form-control border border-black rounded-2" 
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
        <label for="mobile2" style="font-size: 12px; font-weight: bolder">Autre Tel. Mobile</label>
        <input v-model="mobile2" 
            type="tel" 
            class="form-control border border-black rounded-2" 
            id="mobile2" 
            @input="mobile2 = $event.target.value.replace(/\D/g, '')" 
            maxlength="10" 
        />
    </BCol>

    <BCol sm="3" class="mb-3">
        <label for="statut" style="font-size: 12px; font-weight: bolder" >Statut</label>
        <div class="input-group">
            <select v-model="statut" id="statut" class="form-select border border-black rounded-2" aria-label="Default select example">
            <option value="ACTIVE">ACTIVE</option>
            <option value="DESACTIVE">DESACTIVE</option>

            </select>
        </div>
    </BCol>

    <BCol sm="3" class="mb-3">
        <label for="photo" style="font-size: 12px; font-weight: bolder">Photo</label>
        <input 
            @change="handleFileUpload" 
            type="file" 
            class="form-control border border-black rounded-2" 
            :class="{'is-invalid': submitted && photo == ''}"
            id="photo" 
        />
        <div v-if="submitted && photo == ''" class="invalid-feedback">
            <span v-if="photo == ''">Photo obligatoire
            </span>
            </div>
    </BCol>

    </BRow>

    <div class="d-flex justify-content-center">
        <span class="wizard-step">
            <i class="wizard-icon mdi mdi-briefcase font-size-24"></i>
        </span>
    </div>
    <div class="text-center"><h4 class="font-size-20 mb-3">Informations Professionnelles</h4></div>

    <BRow>
        <BCol sm="3" class="mb-3">
        <label for="nom" style="font-size: 12px; font-weight: bolder">Matricule</label>
        <div class="input-group">
            <input 
            v-model="matricule" 
            id="nom" 
            class="form-control border border-black rounded-2" 
            type="text"
            :class="{
            'is-invalid': submitted && v$.matricule.$error
            }">
            <div v-if="submitted && v$.matricule.$error" class="invalid-feedback">
            <span v-if="v$.matricule.required.$invalid">Matricule obligatoire
            </span>
            </div>
        </div>
        </BCol>
        <BCol sm="3" class="mb-3">
        <label for="nom" style="font-size: 12px; font-weight: bolder">Code Visite</label>
        <div class="input-group">
            <input 
            v-model="codeVisite" 
            id="nom" 
            class="form-control border border-black rounded-2" 
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
        <label for="departement" style="font-size: 12px; font-weight: bolder">Département</label>
        <div class="input-group">
            <select v-model="departement" id="departement" class="form-select border border-black rounded-2" aria-label="Default select example" :class="{
            'is-invalid': submitted && v$.departement.$error}"
            >
            <option value="">Département...</option>
            <option value="RH">DEPARTEMENT DES RESSOURCES HUMAINES (RH)</option>
            <option value="IT">DEPARTEMENT INFORMATIQUE (IT)</option>

            </select>
            <div v-if="submitted && v$.departement.$error" class="invalid-feedback">
            <span v-if="v$.departement.required.$invalid">Département obligatoire
            </span>
            </div>
        </div>
        </BCol>
        <BCol sm="3" class="mb-3">
        <label for="service" style="font-size: 12px; font-weight: bolder">Service</label>
        <div class="input-group">
            <select v-model="service" id="service" class="form-select border border-black rounded-2" aria-label="Default select example" :class="{
            'is-invalid': submitted && v$.service.$error}"
            >
            <option value="">SERVICE...</option>
            <option value="RECRUTEMENT">RECRUTEMENT</option>
            <option value="SUPPORT TECHNIQUE">SUPPORT TECHNIQUE</option> 
            </select>
            <div v-if="submitted && v$.service.$error" class="invalid-feedback">
            <span v-if="v$.service.required.$invalid">Service obligatoire
            </span>
            </div>
        </div>
        </BCol>
        
    </BRow>

    <div class="mt-4 d-flex justify-content-center">
      <BButton v-if="!isEditMode" @click="onSaveUser" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        <span class="px-md-5">Enregistrer</span>
      </BButton>
      <BButton v-if="isEditMode" @click="onUpdateUser" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        <span class="px-md-5">Modifier</span>
      </BButton>
    </div>

  </BForm>
</BModal>
</template>
<style>
.wizard-step {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    border: 3px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: white;
  }
</style>