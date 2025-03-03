<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import apiClient from "~/components/api/intercepteur";
import { useAuthStore } from '@/stores/auth';
import { useApi } from '~/components/api/useApi';
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

export default {
  setup() {
    const authStore = useAuthStore();
    const v$ = useVuelidate();
    const {getAll, getById} = useApi(authStore.token)

    return { v$, authStore, getAll, getById, ADMIN:1, };
  },

  data() {
    return {
      progressBarValue: 34,
      activeTab: 1,
      activeTabArrow: 2,
      activeTabprofessionnelle: false,
      selectDepartements: "",
      selectServices: "",
      show: false,
      loading: false,
      token: "",
      user: "",
      test: "",
      nom: "",
      prenom: "",
      civilite: "",
      email: "",
      mobile1: "",
      mobile2: "",
      photo: "",
      matricule: "",
      codeVisite: "",
      userDepartement: "",
      userService: "",
      submitted: false,
      next: false,
      statut: ""
    };
  },
  
  computed: {
    user() {
      return this.authStore.user;
    }
  },

  validations: {
    email: { required, email },
    nom: { required },
    prenom: { required },
    civilite: { required },
    mobile1: { required },
    matricule: { required },
    codeVisite: { required },
    userDepartement: { required },
    userService: { required },
    photo: { required },
    statut: { required }
  },

  async mounted() {
    this.loading = true;
    this.user = this.authStore.user;
    this.token = this.authStore.token;

    this.initializeUserInfo();
    this.fetchCategories();

    this.loading = false;
  },

  methods: {
    async onDepartement(){
      if(this.userDepartement){
        try{
          const response = await this.getById("categorie", departement.value )
          if(!response.error){
            this.selectServices = response.data.children
          }
        }catch(e){

        }
      }
    },
    initializeUserInfo() {
      
      const user = this.authStore.user;
      if (user) {
        
        this.civilite = user.civilite;
        this.nom = user.nom;
        this.prenom = user.prenom;
        this.email = user.email;
        this.mobile1 = user.telephone1;
        this.mobile2 = user.telephone2;
        this.statut = user.statut;
        // this.photo = user.image;
        this.matricule = user.visite ? user.visite.matricule : "";
        this.codeVisite = user.visite ? user.visite.code_visite : "";
        this.userService = user.visite ? user.visite.service_id : "";
        this.userDepartement = user.visite ? user.visite.departement_id : "";
      }
    },

    async fetchCategories() {
      try {
        const [departements, services] = await Promise.all([
          this.toutesCategories("DPT"),
          this.toutesCategories("SRV")
        ]);
        this.selectDepartements = departements;
        this.selectServices = services;
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    },

    async toutesCategories(slug) {
      try {
        const response = await apiClient.get(`/categorie_by_slug/${slug}`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        if (!response.data.error) {
          return response.data.data;
        }
      } catch (error) {
        console.error(`Erreur lors de la récupération des catégories (${slug}):`, error);
      }
    },

    onNext() {
      alert()
      this.next = true
      this.v$.$touch();
      if( 
        this.v$.email.$error || 
        this.v$.nom.$error || 
        this.v$.prenom.$error || 
        this.v$.civilite.$error || 
        this.v$.mobile1.$error
      ){
          this.activeTabprofessionnelle = false
      }else{
        this.activeTabprofessionnelle = true
        this.next = false
        this.toggleWizard(2, 100)
      }
    },

    async onSave() {
      this.submitted = true;
      this.v$.$touch();

      // Vérification des erreurs de validation
      if (
        this.v$.codeVisite.$error ||
        this.v$.userDepartement.$error ||
        this.v$.userService.$error ||
        this.v$.matricule.$error
      ) {
        return;
      } else {
        this.show = true;
        
        try {

          const formData = new FormData();

          // Ajout des champs classiques
          formData.append('nom', this.nom);
          formData.append('prenom', this.prenom);
          formData.append('email', this.email);
          formData.append('telephone1', this.mobile1);
          formData.append('telephone2', this.mobile2);
          formData.append('civilite', this.civilite);
          formData.append('matricule', this.matricule);
          formData.append('matricule', this.matricule);
          formData.append('departement_id', this.userDepartement);
          formData.append('service_id', this.userService);

          // Ajout de l'image sous forme de fichier
          if (this.photo) {
            alert(1)
            formData.append('image', this.photo); // Assurez-vous que `this.photo` est bien un fichier
          }

          const response = await apiClient.post(`/user/${this.user.uuid}`, formData, {
            headers: { 'Authorization': `Bearer ${this.token}` }
          });

          // Si la réponse est réussie
          if (!response.data.error) {
            this.alertMessage(`ok`);
            this.alertMessage(`${response.data.message}`, "success");

            apiClient.post('/auth/me', {}, {
                headers: { Authorization: `Bearer ${this.token}` },
              }).then(response=>{
                this.authStore.setUser(response.data);
              })

         
          } else {
            // Si l'API retourne une erreur
            this.alertMessage("Une erreur s'est produite lors de l'enregistrement du profil AAA", "error");
          }
        } catch (error) {
          // Affichage d'un message d'erreur
          this.alertMessage("Une erreur s'est produite lors de la sauvegarde du profil", "error");
        } finally {
          // Réinitialisation de l'état de l'interface
          this.show = false;
          this.submitted = false;
        }
      }
    },

    // async updateUserProfile() {
    //   try {
    //     const response = await apiClient.post('/auth/me', {}, {
    //       headers: { Authorization: `Bearer ${this.token}` }
    //     });

    //     if (response.data) {
    //       this.initializeUserInfo(); // Refresh user info after update
    //     }
    //   } catch (error) {
    //     console.error("Error updating user profile:", error);
    //   }
    // },

    successmsg() {
      this.$swal.fire("Success!", "Modification réussie!", "success")
        .then(() => {
          this.resetForm();
          this.toggleWizard(1, 100); // Reset wizard state
        });
    },

    resetForm() {
      this.nom = "";
      this.prenom = "";
      this.email = "";
      this.mobile1 = "";
      this.mobile2 = "";
      this.statut = "";
      this.photo = "";
      this.matricule = "";
      this.codeVisite = "";
      this.userDepartement = "";
      this.userService = "";
      this.submitted = false;
    },

    toggleWizard(tab, value) {
      this.activeTab = tab;
      this.progressBarValue = value;
    },

    handleFileUpload(event) {
      this.photo = event.target.files[0];
    },

    alertMessage(message, icon = "error") {
      this.$swal.fire({
        position: "top",
        icon,
        text: message,
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'custom-popup',
          icon: 'custom-icon',
          title: 'custom-title'
        }
      });
    },

    toggleTabWizard(tab) {
      this.activeTabArrow = tab;
    }
  }
};

</script>

<template>
  <BRow class="wizard">
    <BCol>
      <BCard no-body>
        <BCardBody>

          <ScaleLoader v-if="loading" :loading="loading" style="margin: 10em 0;" :height="'30px'" :color="'#FE0201'" />
          <BForm v-if="!loading" action="#">
            <div id="custom-progress-bar" class="progress-nav mb-4">
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  :style="`width: ${progressBarValue}%;`"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>

              <ul
                class="nav nav-pills d-flex justify-content-evenly wizard-steps"
                role="tablist"
              >
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link wizard-step"
                    id="pills-gen-info-tab"
                    type="button"
                    role="tab"
                    :class="{
                      active: activeTab == 1,
                      done: activeTab > 1,
                    }"
                    @click="toggleWizard(1, 26)"
                  >
                    <i
                      class="wizard-icon mdi mdi-account-circle font-size-24"
                    ></i>
                  </button>
                </li>

                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link wizard-step"
                    :disabled="!activeTabprofessionnelle"
                    id="pills-success-tab"
                    type="button"
                    role="tab"
                    :class="{
                      active: activeTab == 2,
                      done: activeTab > 2,
                    }"
                    @click="onNext"
                  >
                    <i class="wizard-icon mdi mdi-briefcase font-size-24"></i>
                  </button>
                </li>
              </ul>
            </div>

            <div class="tab-content">
              <!-- Informations personnelles -->
              <div
                class="tab-pane fade"
                :class="activeTab == 1 && 'show active'"
                id="pills-gen-info"
                role="tabpanel"
                aria-labelledby="pills-gen-info-tab"
              >
                <BRow class="mt-3 mb-4">
                  <h4 class="text-center font-size-20 mb-5">
                    Informations Personnelles
                  </h4>
                  <BCol sm="3" class="mb-3">
                    <label
                      for="civilite"
                      style="font-size: 12px; font-weight: bolder"
                      >Civilité</label
                    >
                    <div class="input-group">
                      <select
                        v-model="civilite"
                        id="civilite"
                        class="form-select border border-black rounded-2"
                        aria-label="Default select example"
                        :class="{
                          'is-invalid': next && v$.civilite.$error,
                        }"
                      >
                        <option value="M." :selected="civilite === 'M.'">
                          M.
                        </option>
                        <option value="Mme" :selected="civilite === 'Mme'">
                          Mme
                        </option>
                        <option value="Mlle" :selected="civilite === 'Mlle'">
                          Mlle
                        </option>
                      </select>
                      <div
                        v-if="next && v$.civilite.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="v$.civilite.required.$invalid"
                          >Civilité obligatoire
                        </span>
                      </div>
                    </div>
                  </BCol>
                  <BCol sm="3" class="mb-3">
                    <label
                      for="nom"
                      style="font-size: 12px; font-weight: bolder"
                      >Nom</label
                    >
                    <div class="input-group">
                      <input
                        v-model="nom"
                        id="nom"
                        class="form-control border border-black rounded-2"
                        type="text"
                        :class="{
                          'is-invalid': next && v$.nom.$error,
                        }"
                      />
                      <div
                        v-if="next && v$.nom.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="v$.nom.required.$invalid"
                          >Nom obligatoire
                        </span>
                      </div>
                    </div>
                  </BCol>
                  <BCol sm="3" class="mb-3">
                    <label
                      for="prenom"
                      style="font-size: 12px; font-weight: bolder"
                      >Prénom</label
                    >
                    <div class="input-group">
                      <input
                        v-model="prenom"
                        id="prenom"
                        class="form-control border border-black rounded-2"
                        type="text"
                        :class="{
                          'is-invalid': next && v$.prenom.$error,
                        }"
                      />
                      <div
                        v-if="next && v$.prenom.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="v$.prenom.required.$invalid"
                          >Prénom obligatoire
                        </span>
                      </div>
                    </div>
                  </BCol>
                  <BCol sm="3" class="mb-3">
                    <label
                      for="email"
                      style="font-size: 12px; font-weight: bolder"
                      >E-mail</label
                    >
                    <input
                      v-model="email"
                      type="email"
                      class="form-control border border-black rounded-2"
                      id="email"
                      :class="{
                        'is-invalid': next && v$.email.$error,
                      }"
                    />
                    <div
                      v-if="next && v$.email.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="v$.email.email.$invalid"
                        >Email invalide
                      </span>
                      <span v-if="v$.email.required.$invalid"
                        >Email obligatoire
                      </span>
                    </div>
                  </BCol>
                  <BCol sm="3" class="mb-3">
                    <label
                      for="mobile1"
                      style="font-size: 12px; font-weight: bolder"
                      >Tel. Mobile</label
                    >
                    <input
                      v-model="mobile1"
                      type="tel"
                      class="form-control border border-black rounded-2"
                      id="mobile1"
                      :class="{ 'is-invalid': next && v$.mobile1.$error }"
                      @input="mobile1 = $event.target.value.replace(/\D/g, '')"
                      maxlength="10"
                    />
                    <div
                      v-if="next && v$.mobile1.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="v$.mobile1.required.$invalid"
                        >Numéro obligatoire</span
                      >
                    </div>
                  </BCol>

                  <BCol sm="3" class="mb-3">
                    <label
                      for="mobile2"
                      style="font-size: 12px; font-weight: bolder"
                      >Autre Tel. Mobile</label
                    >
                    <input
                      v-model="mobile2"
                      type="tel"
                      class="form-control border border-black rounded-2"
                      id="mobile2"
                      @input="mobile2 = $event.target.value.replace(/\D/g, '')"
                      maxlength="10"
                    />
                  </BCol>

                  <BCol sm="3" class="mb-3">
                    <label
                      for="photo"
                      style="font-size: 12px; font-weight: bolder"
                      >Photo</label
                    >
                    <input
                      @change="handleFileUpload"
                      type="file"
                      class="form-control border border-black rounded-2"
                      id="photo"
                    />
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
              <div
                class="tab-pane fade"
                :class="activeTab == 2 && 'show active'"
                id="steparrow-description-info"
                role="tabpanel"
                aria-labelledby="steparrow-description-info-tab"
              >
                <BRow>
                  <h4 class="text-center font-size-20 mb-5">
                    Informations Professionnelles
                  </h4>
                  <BCol sm="3" class="mb-3">
                    <label
                      for="nom"
                      style="font-size: 12px; font-weight: bolder"
                      >Matricule</label
                    >
                    <div class="input-group">
                      <input
                        v-model="matricule"
                        id="nom"
                        class="form-control border border-black rounded-2"
                        :disabled="authStore.user.role_id != ADMIN"
                        type="text"
                        :class="{
                          'is-invalid': submitted && v$.matricule.$error,
                        }"
                      />
                      <div
                        v-if="submitted && v$.matricule.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="v$.matricule.required.$invalid"
                          >Matricule obligatoire
                        </span>
                      </div>
                    </div>
                  </BCol>
                  <BCol sm="3" class="mb-3">
                    <label
                      for="nom"
                      style="font-size: 12px; font-weight: bolder"
                      >Code Visite</label
                    >
                    <div class="input-group">
                      <input
                        v-model="codeVisite"
                        id="nom"
                        class="form-control border border-black rounded-2"
                        :disabled="authStore.user.role_id != ADMIN"
                        type="text"
                        :class="{
                          'is-invalid': submitted && v$.codeVisite.$error,
                        }"
                      />
                      <div
                        v-if="submitted && v$.codeVisite.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="v$.codeVisite.required.$invalid"
                          >Code visite obligatoire
                        </span>
                      </div>
                    </div>
                  </BCol>
                  <BCol sm="3" class="mb-3">
                    <label
                      for="departement"
                      style="font-size: 12px; font-weight: bolder"
                      >Département</label
                    >
                    <div class="input-group">
                      <select
                        v-model="userDepartement"
                        id="departement"
                        class="form-select border border-black rounded-2"
                        aria-label="Default select example"
                        :disabled="authStore.user.role_id != ADMIN"
                        @change="onDepartement"
                        :class="{
                          'is-invalid': submitted && v$.userDepartement.$error,
                        }"
                      >
                        <option value="" selected>Selectionnez...</option>
                        <option
                          v-for="departement in selectDepartements"
                          :key="departement.code"
                          :value="departement.id"
                          :selected="departement.id === userDepartement"
                        >
                          {{ departement.libelle }}
                        </option>
                      </select>
                      <div
                        v-if="submitted && v$.userDepartement.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="v$.userDepartement.required.$invalid"
                          >Département obligatoire
                        </span>
                      </div>
                    </div>
                  </BCol>
                  <BCol sm="3" class="mb-3">
                    <label
                      for="service"
                      style="font-size: 12px; font-weight: bolder"
                      >Service</label
                    >
                    <div class="input-group">
                      <select
                        v-model="userService"
                        id="service"
                        class="form-select border border-black rounded-2"
                        :disabled="authStore.user.role_id != ADMIN"
                        aria-label="Default select example"
                        :class="{
                          'is-invalid': submitted && v$.userService.$error,
                        }"
                      >
                        <option value="" selected>Selectionnez...</option>
                        <option
                          v-for="service in selectServices"
                          :key="service.id"
                          :value="service.id"
                          :selected="service.id === userService"
                        >
                          {{ service.libelle }}
                        </option>
                      </select>
                      <div
                        v-if="submitted && v$.userService.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="v$.userService.required.$invalid"
                          >Service obligatoire
                        </span>
                      </div>
                    </div>
                  </BCol>

                  <div class="d-flex justify-content-center mt-5 mb-4">
                    <BButton 
                      variant="primary" 
                      class="ms-2" 
                      @click="onSave"
                      :loading="show"
                      :loading-text="'modification'"
                    >
                      <span class="px-md-5">Modifier</span>
                    </BButton>
                  </div>
                </BRow>
              </div>
            </div>
          </BForm>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<style lang="scss">
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


