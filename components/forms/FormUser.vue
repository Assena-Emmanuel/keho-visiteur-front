<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";


export default{
  setup() {
    return { v$: useVuelidate() };
  },
  data(){
    return{
        progressBarValue: 34,
        activeTab: 1,
        activeTabArrow: 2,
        activeTabprofessionnelle: false,
        nom: "",
        prenom: "",
        civilite: "",
        role: "",
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
      role:{required},
   
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

    toggleWizard(tab, value) {
      this.activeTab = tab;
      this.progressBarValue = value;
    },

    // SweetAlert
    successmsg() {
      this.$swal.fire("Succes!", "Modification reussie!", "success");
    },


    toggleTabWizard(tab) {
      this.activeTabArrow = tab;
    },
    onNext() {
      this.next = true
      this.v$.$touch();
      if( 
        this.v$.email.$error || 
        this.v$.nom.$error || 
        this.v$.prenom.$error || 
        this.v$.civilite.$error || 
        this.photo=="" || 
        this.v$.mobile1.$error){

          this.activeTabprofessionnelle = false
      }else{
        this.activeTabprofessionnelle = true
        this.next = false
        this.toggleWizard(2, 100)
      }
    },
    onSave(){
      this.submitted = true;
      this.v$.$touch();
      if( 
        this.v$.codeVisite.$error || 
        this.v$.departement.$error || 
        this.v$.service.$error || 
        this.v$.role.$error || 
        this.v$.matricule.$error
        ){
          return
      }else{
        this.successmsg()

        this.civilite = ""
        this.nom = ""
        this.prenom = ""
        this.email = ""
        this.mobile1 = ""
        this.mobile2 = ""
        this.statut = ""
        this.photo = ""

        // Info professionnelles
        this.matricule = ""
        this.codeVisite = ""
        this.departement = ""
        this.service = ""
        this.role = ""
      }
    },
    resetForm() {
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
  <BForm action="#">
            <div id="custom-progress-bar" class="progress-nav mb-4">
              <div class="progress">
                <div class="progress-bar" role="progressbar" :style="`width: ${progressBarValue}%;`" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
              </div>

              <ul class="nav nav-pills d-flex justify-content-evenly wizard-steps" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link wizard-step" id="pills-gen-info-tab" type="button" role="tab" :class="{ 
                    active: activeTab == 1, done: activeTab > 1 }" @click="toggleWizard(1, 26)">
                    <i class="wizard-icon mdi mdi-account-circle font-size-24"></i>
                  </button>
                </li>

                <li class="nav-item" role="presentation">
                  <button class="nav-link wizard-step" :disabled="!activeTabprofessionnelle" id="pills-success-tab" type="button" role="tab" :class="{ 
                    active: activeTab == 2, done: activeTab > 2 }" @click="onNext">
                    <i class="wizard-icon mdi mdi-briefcase font-size-24"></i>

                  </button>
                </li>
              </ul>
            </div>

            <div class="tab-content">

              <!-- Informations personnelles -->
              <div class="tab-pane fade" :class="activeTab == 1 && 'show active'" id="pills-gen-info" role="tabpanel" aria-labelledby="pills-gen-info-tab">
                <BRow class="mt-3 mb-4">
                  <h4 class="text-center font-size-20 mb-5">Informations Personnelles</h4>
                  <BCol sm="3" class="mb-3">
                    <label for="civilite" style="font-size: 12px; font-weight: bolder">Civilité</label>
                    <div class="input-group">
                      <select v-model="civilite" id="civilite" class="form-select border border-secondary rounded-2" aria-label="Default select example" :class="{
                        'is-invalid': next && v$.civilite.$error
                      }">
                        <option value="" selected>civilité...</option>
                        <option value="MONSIEUR">MONSIEUR</option>
                        <option value="MADAME">MADAME</option>
                        <option value="MADEMOISELLE">MADEMOISELLE</option>
                      </select>
                      <div v-if="next && v$.civilite.$error" class="invalid-feedback">
                        <span v-if="v$.civilite.required.$invalid">Civilité obligatoire
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
                        class="form-control border border-secondary rounded-2" 
                        type="text"
                        :class="{
                        'is-invalid': next && v$.nom.$error
                      }">
                      <div v-if="next && v$.nom.$error" class="invalid-feedback">
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
                        class="form-control border border-secondary rounded-2" 
                        type="text"
                        :class="{
                        'is-invalid': next && v$.prenom.$error
                      }">
                      <div v-if="next && v$.prenom.$error" class="invalid-feedback">
                      <span v-if="v$.prenom.required.$invalid">Prénom obligatoire
                      </span>
                    </div>
                    </div>
                  </BCol>
                  <BCol sm="3" class="mb-3">
                    <label for="email" style="font-size: 12px; font-weight: bolder">E-mail</label>
                    <input v-model="email" type="email" class="form-control border border-secondary rounded-2" id="email" :class="{
                      'is-invalid': next && v$.email.$error
                    }" />
                    <div v-if="next && v$.email.$error" class="invalid-feedback">
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
                      class="form-control border border-secondary rounded-2" 
                      id="mobile1" 
                      :class="{'is-invalid': next && v$.mobile1.$error}"
                      @input="mobile1 = $event.target.value.replace(/\D/g, '')" 
                      maxlength="10" 
                    />
                    <div v-if="next && v$.mobile1.$error" class="invalid-feedback">
                      <span v-if="v$.mobile1.required.$invalid">Numéro obligatoire</span>
                    </div>
                  </BCol>

                  <BCol sm="3" class="mb-3">
                    <label for="mobile2" style="font-size: 12px; font-weight: bolder">Autre Tel. Mobile</label>
                    <input v-model="mobile2" 
                      type="tel" 
                      class="form-control border border-secondary rounded-2" 
                      id="mobile2" 
                      @input="mobile2 = $event.target.value.replace(/\D/g, '')" 
                      maxlength="10" 
                    />
                  </BCol>
                  <BCol sm="3" class="mb-3">
                    <label for="statut" style="font-size: 12px; font-weight: bolder" >Statut</label>
                    <div class="input-group">
                      <select v-model="statut" id="statut" class="form-select border border-secondary rounded-2" aria-label="Default select example">
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="DESACTIVE">DESACTIVE</option>

                      </select>
                      <!-- <div v-if="submitted && v$.service.$error" class="invalid-feedback">
                        <span v-if="v$.service.required.$invalid">Service obligatoire
                        </span>
                      </div> -->
                    </div>
                  </BCol>
                  <BCol sm="3" class="mb-3">
                    <label for="photo" style="font-size: 12px; font-weight: bolder">Photo</label>
                    <input 
                      @change="handleFileUpload" 
                      type="file" 
                      class="form-control border border-secondary rounded-2" 
                      :class="{'is-invalid': next && photo == ''}"
                      id="photo" 
                    />
                    <div v-if="next && photo == ''" class="invalid-feedback">
                        <span v-if="photo == ''">Photo obligatoire
                        </span>
                      </div>
                  </BCol>
                  <div class="d-flex justify-content-end mt-5">
                    <BButton variant="primary" class="px-5" @click="onNext">
                      Suivant
                    </BButton>
                  </div>
                </BRow>
              </div>

              <!-- Information professionnelles -->
                <!-- <Step2  @onBack="toggleWizard(1, 18)" /> -->
              <!-- </div> -->
              <div class="tab-pane fade" :class="activeTab == 2 && 'show active'" id="steparrow-description-info" role="tabpanel" aria-labelledby="steparrow-description-info-tab">
                <BRow>
                  <h4 class="text-center font-size-20 mb-5">Informations Professionnelles</h4>
                  <BCol sm="3" class="mb-3">
                    <label for="nom" style="font-size: 12px; font-weight: bolder">Matricule</label>
                    <div class="input-group">
                      <input 
                        v-model="matricule" 
                        id="nom" 
                        class="form-control border border-secondary rounded-2" 
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
                        class="form-control border border-secondary rounded-2" 
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
                      <select v-model="departement" id="departement" class="form-select border border-secondary rounded-2" aria-label="Default select example" :class="{
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
                      <select v-model="service" id="service" class="form-select border border-secondary rounded-2" aria-label="Default select example" :class="{
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
                  <BCol sm="3" class="mb-3">
                    <label for="role" style="font-size: 12px; font-weight: bolder">Rôle</label>
                    <div class="input-group">
                      <select v-model="role" id="role" class="form-select border border-secondary rounded-2" aria-label="Default select example" :class="{
                        'is-invalid': submitted && v$.role.$error}"
                      >
                        <option value="">SERVICE...</option>
                        <option value="RECRUTEMENT">RECRUTEMENT</option>
                        <option value="SUPPORT TECHNIQUE">SUPPORT TECHNIQUE</option> 
                      </select>
                      <div v-if="submitted && v$.role.$error" class="invalid-feedback">
                        <span v-if="v$.role.required.$invalid">Service obligatoire
                        </span>
                      </div>
                    </div>
                  </BCol>

                  <div class="mt-4 d-flex justify-content-center">
                    <BButton v-if="!isEditMode" variant="primary" class="ms-2" @click="onSave">
                      <span class="px-md-5">Enregistrer</span>
                    </BButton>
                    <BButton v-if="isEditMode" @click="onUpdateUser" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
                      <span class="px-md-5">Modifier</span>
                    </BButton>
                  </div>
                  
                </BRow>
              </div>
            </div>
          </BForm>

    

</BModal>
</template>

<style lang="scss">
.progress-nav {
  position: relative;
  display: flex;
  align-items: center;
}

.progress {
  width: 100%;
  position: absolute;
  height: 4px;
}

.wizard-steps {
  position: relative;
  z-index: 3;
  width: 100%;

  .wizard-step {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    border: 3px solid;
    display: flex;
    justify-content: center;
    z-index: 9;
    position: relative;
    background: white;
  }
}

.step-arrow-nav {
  .nav-link {
    background: #f3f2ee;
    padding: 4px 0;
    border-radius: 0 !important;
  }
}

.wizard {
  .nav-link:not(.active) {
    color: #f3f2ee;

    .wizard-icon {
      color: #a5a5a5;
    }
  }
}

[data-bs-theme="dark"] {
  .wizard-steps .wizard-step:not(.active) {
    background: var(--bs-input-bg);
  }

  .step-arrow-nav {
    .nav-link:not(.active) {
      background: var(--bs-input-bg);
    }
  }
}
</style>