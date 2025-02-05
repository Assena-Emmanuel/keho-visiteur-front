<script setup>
import { ref, watch } from 'vue';
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import apiClient from '~/components/api/intercepteur';
import { useAuthStore } from '~/stores/auth.js';
import Swal from 'sweetalert2';


// Stores
const authStore = useAuthStore();

// Réactifs
const loading = ref(false); 
const loadingEdit = ref(false); 
const loadingCreer = ref(false); 

const progressBarValue = ref(34);
const activeTab = ref(1);
const activeTabArrow = ref(2);
const activeTabprofessionnelle = ref(false);
const nom = ref('');
const prenom = ref('');
const civilite = ref('');
const role = ref('');
const e_mail = ref('');
const telephone1 = ref('');
const telephone2 = ref('');
const photo = ref(null);
const matricule = ref('');
const codeVisite = ref('');
const departement = ref('');
const service = ref('');
const processing = ref(false);
const submitted = ref(false);
const selectDepartements = ref(null);
const selectServices = ref(null);
const selectRoles = ref(null);
const next = ref(false);
const uuid = ref(null)
let data = ref({})


// Vuelidate
const rules = {
  e_mail: { required, email },
  nom: { required },
  prenom: { required },
  civilite: { required },
  telephone1: { required },
  matricule: { required },
  codeVisite: { required },
  departement: { required },
  service: { required },
  role: { required },
};

const v$ = useVuelidate(rules, { e_mail, nom, prenom, civilite, telephone1, matricule, codeVisite, departement, service, role });



// Props
const props = defineProps({
  isOpen: Boolean,
  isEditMode: Boolean,
  uuid: String,
});


watch(
  () => props.uuid,  // On surveille la prop `uuid`
  async (newUuid) => {  // Utilise `async` pour attendre la réponse de `getUser`
    if (newUuid) {
      data.value = await getUser(newUuid);  // Attends la réponse avant de mettre à jour `data`
      if(data.value){
        nom.value = data.value.nom
        prenom.value = data.value.prenom
        e_mail.value = data.value.email
        telephone1.value = data.value.telephone1
        telephone2.value = data.value.telephone2
        civilite.value = data.value.civilite
        uuid.value = data.value.uuid

        matricule.value = data.value.visite ? data.value.visite.matricule : ""
        codeVisite.value = data.value.visite ? data.value.visite.code_visite : ""
        departement.value = data.value.visite ? data.value.visite.departement.libelle : ""
        service.value = data.value.visite ? data.value.visite.service.libelle : ""

      }
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

    watch: {
    // Met à jour les données locales lorsque "data" change (utile pour le mode édition)
    data: {
      immediate: true,
      handler(newData) {
        if (Array.isArray(newData) && this.selectedIndex != null) {
          const selectedData = newData[this.selectedIndex] || {};
          this.nom = selectedData.nom || "";
          this.prenom = selectedData.prenom || "";
          this.civilite = selectedData.civilite || "";
          this.email = selectedData.email || "";
          this.mobile1 = selectedData.mobile1 || "";
          this.mobile2 = selectedData.mobile2 || "";
          this.photo = selectedData.photo || "";
          this.matricule = selectedData.matricule || "";
          this.codeVisite = selectedData.codeVisite || "";
          this.departement = selectedData.departement || "";
          this.service = selectedData.service || "";
        }
      },
    },

  props: {
    modelValue: Boolean,
    isEditMode: Boolean,
    selectedIndex: Number,  // L'index de l'élément à éditer
    data: Array,
  
  },
  mounted(){
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


// Fonction asynchrone pour récupérer l'utilisateur par uuid
async function getUser(uuid) {
  loading.value = true;
  try {
    const response = await apiClient.get(`/user/${uuid}`, {
      headers: { 
        'Authorization': `Bearer ${authStore.token}`,  // Utilise `this.token` si `this` est disponible
      }
    });

    if (!response.data.error) {
      return response.data.data;  // Retourne les données de l'utilisateur
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  }finally{
    loading.value = false; 
  }
    }
}

// Méthodes
const handleFileUpload = (event) => {
  photo.value = event.target.files[0];
};



const toggleWizard = (tab, value) => {
  activeTab.value = tab;
  progressBarValue.value = value;
};

const successmsg = (message, type = 'success') => {
  Swal.fire('Succès!', `${message}!`, `${type}`);
};

const toggleTabWizard = (tab) => {
  activeTabArrow.value = tab;
};


async function toutesCategories(slug) {
  try {
    const response = await apiClient.get(`/categorie_by_slug/${slug}`, {
      headers: { 
        'Authorization': `Bearer ${authStore.token}`,  // Utilise `this.token` si `this` est disponible
      }
    });

    if (!response.data.error) {
      return response.data.data;
    }
  } catch (error) {
    console.error('Error fetching Departement-----:', error);
  }
}

// Recuperer la liste des roles
async function roles() {

  try {
    const response = await apiClient.get(`/role`, {
      headers: { 
        'Authorization': `Bearer ${authStore.token}`, 
      }
    });

    if (!response.data.error) {
      return response.data.data;
    }
  } catch (error) {
    console.error('Erreur durant la recuperation des role-----:', error);
  }
}


onMounted(async () => {

  try {
    // Récupérer tous les départements
    const departements = await toutesCategories("DPT");
    selectDepartements.value = departements;  // Assignation à la référence

    // Récupérer tous les services
    const services = await toutesCategories("SRV");
    selectServices.value = services;  // Assignation à la référence

    // Récupérer tous les rôles
    selectRoles.value = await roles();
  

  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
});


const onNext = () => {
  next.value = true
  v$.value.$touch();
  
  if (
    v$.value.e_mail.$error ||
    v$.value.nom.$error ||
    v$.value.prenom.$error ||
    v$.value.telephone1.$error ) {

    activeTabprofessionnelle.value = false;

  } else {
    activeTabprofessionnelle.value = true;
    next.value = false
    toggleWizard(2, 100);

  }
};

const onSave = async () => {
  submitted.value = true;
  v$.value.$touch();
  if (
    v$.value.codeVisite.$error ||
    v$.value.departement.$error ||
    v$.value.service.$error ||
    v$.value.role.$error ||
    v$.value.matricule.$error
  ) {
    return;
  } else {

    this.loadingCreer = true;
        try{

          const formData = new FormData();
          
          // Ajout des champs à envoyer
          formData.append('nom', this.nom);
          formData.append('prenom', this.prenom);
          formData.append('email', this.email);
          formData.append('telephone1', this.mobile1);
          formData.append('telephone2', this.mobile2);
          formData.append('civilite', this.civilite);
          formData.append('matricule', this.matricule);
          formData.append('departement_id', this.userDepartement);
          formData.append('service_id', this.userService);

          // Vérification de l'image et ajout si elle est présente
          if (this.photo) {
            formData.append('image', this.photo);  // Ici, `this.photo` doit être un fichier valide (par exemple, un objet `File`)
          }

          await apiClient.post(
            `/user/${this.user.uuid}`,formData,
            {

              headers: { 
                'Authorization': `Bearer ${this.token}`, 
              }

            }).then(reponse =>{
              if(!reponse.data.error){ 
              
              apiClient.post('/auth/me', {}, {
                headers: { Authorization: `Bearer ${this.token}` },
              }).then(response=>{

                console.log("Utilisateur récupéré:", response.data);

                this.authStore.setUser(response.data);
                this.updateUserInfo(response.data)
              }

              )
              

              this.alertMessage(reponse.data.message, 'success')

            }
                


        })
          }catch (error) {
            console.error("Erreur lors de la creation de l'utilisateur :", error);
        }finally{
          this.loadingCreer = false
        }





    successmsg();
    resetForm();
  }
};

// Modifier les données du user
const onUpdateUser = async () => {
  submitted.value = true;

  // Toucher tous les champs pour les valider
  v$.value.$touch();

  // Vérification des erreurs de validation
  if (
    v$.value.codeVisite.$error ||
    v$.value.departement.$error ||
    v$.value.service.$error ||
    v$.value.role.$error ||
    v$.value.matricule.$error
  ) {
    // Si des erreurs existent, on arrête la soumission
    return;
  } else {
    loadingEdit.value = true;
    
    try {
      // Effectuer l'appel API pour récupérer les données de l'utilisateur
      const formData = new FormData();
          
      // Ajout des champs à envoyer
      formData.append('nom', nom.value);
      formData.append('prenom', prenom.value);
      formData.append('email', email.value);
      formData.append('telephone1', telephone1.value);
      formData.append('telephone2', telephone2.value);
      formData.append('civilite', civilite.value);
      formData.append('matricule', matricule.value);
      formData.append('role_id', role.value);
      formData.append('departement_id', departement.value);
      formData.append('service_id', service.value);

      // Vérification de l'image et ajout si elle est présente
      if (photo.value) {
        formData.append('image', photo.value);  
      }

      const response = await apiClient.post(`/user/${uuid.value}`, formData, {
        headers: {
          'Authorization': `Bearer ${authStore.token}`,  // Utilisation du token d'authentification
        }
      });

      // Vérification de la réponse
      if (!response.data.error) {
        successmsg(response.data.message);  
        resetForm(); 
      } else {
        // Gérer un cas d'erreur côté API (si `response.data.error` est vrai)
        console.error("Erreur lors de la mise à jour de l'utilisateur:", response.data.error);

      }
    } catch (error) {
      // En cas d'erreur réseau ou autre, on l'affiche dans la console
      console.error("Erreur lors de la mise à jour de l'utilisateur1 :", error);

    } finally {
      // Fin du processus de chargement
      loadingEdit.value = false;
    }
  }
};


const emit = defineEmits();
// reinitialiser le modal durant la fermeture

const resetForm = () => {
  submitted.value = false;
  emit('update:isOpen', false);
  emit('update:uuid', null);
  toggleWizard(1, 26);
  activeTabprofessionnelle.value = false;
  if (v$.value) {
    v$.value.$reset();  // Réinitialise les validations
  } else {
    console.error("v$ n'est pas défini");
  }


  // Réinitialisation des champs
  nom.value = '';
  prenom.value = '';
  civilite.value = '';
  role.value = '';
  e_mail.value = '';
  telephone1.value = '';
  telephone2.value = '';
  photo.value = null;
  matricule.value = '';
  codeVisite.value = '';
  departement.value = '';
  service.value = '';
};
</script>


<template>
  <BModal 
      @hide="resetForm" 
      size="lg"
      :modelValue="modelValue" 
      @update:modelValue="$emit('update:modelValue', $event)"
      :title="isEditMode ? `Modifier les informations ${(data.nom).toUpperCase()}` : 'Création d\'Utilisateur'" 
      title-class="font-18" 
      hide-footer
      no-close-on-backdrop
  >
  <div v-if="loadingDetail" class="loading-ellipses">
        <span class="dot">.</span>
        <span class="dot">.</span>
        <span class="dot">.</span>
    </div>
  <BForm action="#" v-else>
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
                  <BCol sm="2" class="mb-3">
                    <label for="civilite" style="font-size: 12px; font-weight: bolder">Civilité</label>
                    <div class="input-group">
                      <select v-model="civilite" id="civilite" class="form-select border border-secondary rounded-2" aria-label="Default select example" :class="{
                        'is-invalid': next && v$.civilite.$error
                      }">
                        <option value="M." :selected="civilite === 'M.'">M.</option>
                        <option value="Mme" :selected="civilite === 'Mme'">Mme</option>
                        <option value="Mlle" :selected="civilite === 'Mlle'">Mlle</option>
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
                  <BCol sm="4" class="mb-3">
                    <label for="email" style="font-size: 12px; font-weight: bolder">E-mail</label>
                    <input v-model="e_mail" type="email" class="form-control border border-secondary rounded-2" id="email" :class="{
                      'is-invalid': next && v$.e_mail.$error
                    }" />
                    <div v-if="next && v$.e_mail.$error" class="invalid-feedback">
                      <span v-if="v$.e_mail.email.$invalid">Email invalide
                      </span>
                      <span v-if="v$.e_mail.required.$invalid">Email obligatoire
                      </span>
                    </div>
                  
                  </BCol>
                  <BCol sm="3" class="mb-3">
                    <label for="mobile1" style="font-size: 12px; font-weight: bolder">Tel. Mobile</label>
                    <input v-model="telephone1" 
                      type="tel" 
                      class="form-control border border-secondary rounded-2" 
                      id="mobile1" 
                      :class="{'is-invalid': next && v$.telephone1.$error}"
                      @input="telephone1 = $event.target.value.replace(/\D/g, '')" 
                      maxlength="10" 
                    />
                    <div v-if="next && v$.telephone1.$error" class="invalid-feedback">
                      <span v-if="v$.telephone1.required.$invalid">Numéro obligatoire</span>
                    </div>
                  </BCol>

                  <BCol sm="3" class="mb-3">
                    <label for="mobile2" style="font-size: 12px; font-weight: bolder">Autre Tel. Mobile</label>
                    <input v-model="telephone2" 
                      type="tel" 
                      class="form-control border border-secondary rounded-2" 
                      id="mobile2" 
                      @input="telephone2 = $event.target.value.replace(/\D/g, '')" 
                      maxlength="10" 
                    />
                  </BCol>
                  
                  <BCol sm="6" class="mb-3">
                    <label for="photo" style="font-size: 12px; font-weight: bolder">Photo</label>
                    <input 
                      @change="handleFileUpload" 
                      type="file" 
                      class="form-control border border-secondary rounded-2" 
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
              <div class="tab-pane fade" :class="activeTab == 2 && 'show active'" id="steparrow-description-info" role="tabpanel" aria-labelledby="steparrow-description-info-tab">
                <BRow>
                  <h4 class="text-center font-size-20 mb-5">Informations Professionnelles</h4>

                  <BCol sm="6" class="mb-3">
                    <label for="role" style="font-size: 12px; font-weight: bolder">Rôle</label>
                    <div class="input-group">
                      <select v-model="role" id="role" class="form-select border border-secondary rounded-2" aria-label="Default select example" :class="{
                        'is-invalid': submitted && v$.role.$error}"
                      >
                        <option 
                          v-for="role in selectRoles" 
                          :key="role.id" 
                          :value="role.id"
                        >

                        {{ role.libelle }}

                        </option> 
                      </select>
                      <div v-if="submitted && v$.role.$error" class="invalid-feedback">
                        <span v-if="v$.role.required.$invalid">Service obligatoire
                        </span>
                      </div>
                    </div>
                  </BCol>
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
                  
                  
                  <BCol sm="6" class="mb-3">
                    <label for="departement" style="font-size: 12px; font-weight: bolder">Département</label>
                    <div class="input-group">
                      <select v-model="departement" id="departement" class="form-select border border-secondary rounded-2" aria-label="Default select example" :class="{
                        'is-invalid': submitted && v$.departement.$error}"
                      >
                        <option 
                          v-for="departement in selectDepartements" 
                          :key="departement.code" 
                          :value="departement.id"
                        >
                        
                          {{ departement.libelle }}
                        
                        </option>

                      </select>
                      <div v-if="submitted && v$.departement.$error" class="invalid-feedback">
                        <span v-if="v$.departement.required.$invalid">Département obligatoire
                        </span>
                      </div>
                    </div>
                  </BCol>
                  <BCol sm="6" class="mb-3">
                    <label for="service" style="font-size: 12px; font-weight: bolder">Service</label>
                    <div class="input-group">
                      <select v-model="service" id="service" class="form-select border border-secondary rounded-2" aria-label="Default select example" :class="{
                        'is-invalid': submitted && v$.service.$error}"
                      >
                        <option 
                          v-for="service in selectServices" 
                          :key="service.id" 
                          :value="service.id"
                        >

                        {{ service.libelle }}

                        </option> 
                      </select>
                      <div v-if="submitted && v$.service.$error" class="invalid-feedback">
                        <span v-if="v$.service.required.$invalid">Service obligatoire
                        </span>
                      </div>
                    </div>
                  </BCol>

                  <div class="mt-4 d-flex justify-content-center">
                    <BButton v-if="!isEditMode" variant="primary" class="ms-2" @click="onSave">
                      <span class="px-md-5">Enregistrer</span>
                    </BButton>
                    <BButton
                       v-if="isEditMode" 
                       @click="onUpdateUser" 
                       variant="primary" 
                       class="w-sm waves-effect waves-light btn btn-sm" 
                       :loading="loadingEdit" 
                        loading-text="Modification"
                    >
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
<style scoped>
.loading-ellipses {
  font-size: 40px; /* Taille augmentée */
  color: #3498db;
  text-align: center;
  font-weight: bold;
}

.dot {
  animation: blink 1s infinite;
  margin: 0 5px; /* Espacement entre les points */
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.3s;
}

.dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes blink {
  0%, 20% {
    opacity: 0;
  }
  50%, 100% {
    opacity: 1;
  }
}
</style>
