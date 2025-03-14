<script setup>
import { ref, watch, onMounted } from 'vue';
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import apiClient from '~/components/api/intercepteur';
import { useAuthStore } from '~/stores/auth.js';
import Swal from 'sweetalert2';
import { useApi } from '~/components/api/useApi';
import { useGestionStore } from "~/stores/gestion.js";
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'


// Stores
const authStore = useAuthStore();
const {getAll, getById} = useApi(authStore.token)
const gestionStore = useGestionStore()


// Réactifs
const loading = ref(false); 
const loadingDetail = ref(false); 
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
const password = ref(null)
const confirmPassword = ref(null)
const role_id = ref(null)

// Vuelidate - Validation rules
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

// Watchers
watch(
  () => props.uuid, 
  async (newUuid) => {
  if (newUuid) {
    data.value = await getUser(newUuid); 
    if(data.value) {
      nom.value = data.value.nom;
      prenom.value = data.value.prenom;
      e_mail.value = data.value.email;
      telephone1.value = data.value.telephone1;
      telephone2.value = data.value.telephone2;
      civilite.value = data.value.civilite;
      uuid.value = data.value.uuid;
      role.value = data.value.role_id

      matricule.value = data.value.visite ? data.value.visite.matricule : "";
      codeVisite.value = data.value.visite ? data.value.visite.code_visite : "";
      departement.value = data.value.visite ? data.value.visite.departement.libelle : "";
      service.value = data.value.visite ? data.value.visite.service.libelle : "";
    }
  }
},
{ immediate: true }
);

// Méthodes asynchrones
async function getUser(uuid) {
  loadingDetail.value = true;
  try {
    const response = await apiClient.get(`/user/${uuid}`, {
      headers: { 'Authorization': `Bearer ${authStore.token}` },
    });
    if (!response.data.error) {
      return response.data.data; 
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  } finally {
    loadingDetail.value = false; 
  }
}

onMounted(async () => {
  try {
    const departements = await toutesCategories("DPT");
    selectDepartements.value = departements;

    // const services = await toutesCategories("SRV");
    // selectServices.value = services;

    selectRoles.value = await roles();
    
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
});

async function toutesCategories(slug) {
  try {
    const response = await apiClient.get(`/categorie_by_slug/${slug}`, {
      headers: { 'Authorization': `Bearer ${authStore.token}` },
    });
    if (!response.data.error) {
      return response.data.data;
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

async function roles() {
  try {
    const response = await apiClient.get(`/role`, {
      headers: { 'Authorization': `Bearer ${authStore.token}` },
    });
    if (!response.data.error) {
      return response.data.data;
    }
  } catch (error) {
    console.error('Erreur durant la récupération des roles:', error);
  }
}

// Gestion des étapes du formulaire
const onNext = (step, length) => {
  next.value = true;
  v$.value.$touch();

  if (v$.value.e_mail.$error || v$.value.nom.$error || v$.value.prenom.$error || v$.value.telephone1.$error) {
    activeTabprofessionnelle.value = false;
  } else {
    activeTabprofessionnelle.value = true;
    next.value = false;
    toggleWizard(step, length);
  }
};

const onUpdateUser = async () => {
  submitted.value = true;
  v$.value.$touch();

  if (v$.value.codeVisite.$error || v$.value.departement.$error || v$.value.service.$error || v$.value.role.$error || v$.value.matricule.$error) {
    return;
  } else {
    loadingEdit.value = true;
    try {
      const formData = new FormData();
      formData.append('nom', nom.value);
      formData.append('prenom', prenom.value);
      formData.append('email', e_mail.value);
      formData.append('telephone1', telephone1.value);
      formData.append('telephone2', telephone2.value);
      formData.append('civilite', civilite.value);
      formData.append('matricule', matricule.value);
      formData.append('departement_id', departement.value);
      formData.append('service_id', service.value);

      if (photo.value) {
        formData.append('image', photo.value);
      }

      const response = await apiClient.post(`/user/${uuid.value}`, formData, {
        headers: { 'Authorization': `Bearer ${authStore.token}` },
      });

      if(!response.data.error){
        emit("update:isOpen", false);
        emit('update:uuid', null);
        const users = await getAll("user")
        
        gestionStore.setUsers(users.data)
        successmsg("Utilisateur créé avec succès!");
        resetForm();
      }else{
        console.error("----- Erreur lors de la création de l'utilisateur :", response.data.message);
      }
      
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
    } finally {
      loadingEdit.value = false;
    }
  }
};

const onPasswordNext = () => {
  // Vous pouvez valider ici les champs de mot de passe
  if (!v$.value.password || !v$.value.confirmPassword) {
    return; // Ne permet pas de continuer si les champs de mot de passe sont vides
  }

  // Vérifiez si les mots de passe correspondent
  if (v$.value.password.$model !== v$.value.confirmPassword.$model) {
    // Gérer l'erreur ici
    return; // Ne permet pas de continuer si les mots de passe ne correspondent pas
  }

  // Si tout est correct, permettre la navigation à l'étape suivante
  activeTabMotDePasse.value = true;
  toggleWizard(3, 100); // Passe à l'étape du mot de passe
};


const onSave = async () => {
  submitted.value = true;
  v$.value.$touch();

  if (v$.value.codeVisite.$error || v$.value.departement.$error || v$.value.service.$error || v$.value.role.$error || v$.value.matricule.$error) {
    return;
  } else {
    loadingCreer.value = true;
    try {
      const formData = new FormData();
      formData.append('nom', nom.value);
      formData.append('prenom', prenom.value);
      formData.append('email', e_mail.value);
      formData.append('telephone1', telephone1.value);
      formData.append('telephone2', telephone2.value);
      formData.append('civilite', civilite.value);
      formData.append('matricule', matricule.value);
      formData.append('departement_id', departement.value);
      formData.append('service_id', service.value);

      if (photo.value) {
        formData.append('image', photo.value);
      }

      const response = await apiClient.post(`/user`, formData, {
        headers: { 'Authorization': `Bearer ${authStore.token}` },
      });

      if(!response.data.error){
        const users = await getAll("user")
        gestionStore.setUsers(users.data)
        successmsg("Utilisateur créé avec succès!");
        resetForm();
      }else{
        console.error("----- Erreur lors de la création de l'utilisateur :", response.data.message);
      }

      successmsg("Utilisateur créé avec succès!");
      resetForm();
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
    } finally {
      loadingCreer.value = false;
    }
  }
};

// Fonction appelée à chaque changement de sélection
const onDepartement = async () => {
  if(departement.value){
    try{
      const response = await getById("categorie", departement.value )
      if(!response.error){
        selectServices.value = response.data.children
      }
    }catch(e){

    }
  }
};

const emit = defineEmits(["update:isOpen", "update:uuid"]);

// Réinitialiser le formulaire
const resetForm = () => {
  submitted.value = false;
  loadingDetail.value = false
  loadingCreer.value = false
  emit("update:isOpen", false);
  emit('update:uuid', null);
  toggleWizard(1, 18);
  activeTabprofessionnelle.value = false;
  if (v$.value) {
    v$.value.$reset();  
  }

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

const toggleWizard = (tab, value) => {
  activeTab.value = tab;
  progressBarValue.value = value;
};

const successmsg = (message, type = 'success') => {
  Swal.fire('Succès!', `${message}!`, `${type}`);
};
</script>



<template>
  <BModal 
      @hide="resetForm" 
      size="lg"
      :modelValue="isOpen" 
      @update:modelValue="$emit('update:modelValue', $event)"
      :title="isEditMode ? `Modifier les informations` : 'Création d\'Utilisateur'" 
      title-class="font-18" 
      hide-footer
      no-close-on-backdrop
  >
  
    <ScaleLoader v-if="loadingDetail" :loading="loadingDetail" style="margin: 10em 0;" :height="'30px'" :color="'#FE0201'" />
      <BForm v-else action="#">
            <div id="custom-progress-bar" class="progress-nav mb-4">
              <div class="progress">
                <div class="progress-bar" role="progressbar" :style="`width: ${progressBarValue}%;`" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              
              <ul class="nav nav-pills d-flex justify-content-evenly wizard-steps" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link wizard-step" id="pills-gen-info-tab" type="button" role="tab" :class="{ 
                    active: activeTab == 1, done: activeTab > 1 }" @click="toggleWizard(1, 18)">
                    <i class="wizard-icon mdi mdi-account-circle font-size-24"></i>
                  </button>
                </li>

                <li class="nav-item" role="presentation">
                  <button class="nav-link wizard-step" :disabled="!activeTabprofessionnelle" id="pills-success-tab" type="button" role="tab" :class="{ 
                    active: activeTab == 2, done: activeTab > 2 }" @click="toggleWizard(2, 46)">
                    <i class="wizard-icon mdi mdi-briefcase font-size-24"></i>

                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link wizard-step" :disabled="!activeTabSecurity" id="pills-success-tab" type="button" role="tab" :class="{ 
                    active: activeTab == 3, done: activeTab > 2 }" @click="onNext">
                    <i class="wizard-icon mdi mdi-shield font-size-24"></i>

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
                  <BCol sm="4" class="mb-3">
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
                  <BCol sm="6" class="mb-3">
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
                  <BCol sm="6" class="mb-3">
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

                  <BCol sm="3" md="3" class="mb-3">
                    <label for="role" style="font-size: 12px; font-weight: bolder">Type pièce</label>
                    <div class="input-group">
                      <select v-model="role" id="role" class="form-select border border-secondary rounded-2" aria-label="Default select example" :class="{
                        'is-invalid': submitted && v$.role.$error}"
                      >
                        <!-- <option 
                          v-for="role in selectRoles" 
                          :key="role.id" 
                          :value="role.id"
                          :selected="role.id == role_id"
                        >

                        {{ role.libelle }}

                        </option>  -->
                      </select>
                      
                    </div>
                  </BCol>

                  <BCol sm="3" class="mb-3">
                    <label for="numPiece" style="font-size: 12px; font-weight: bolder">Numéro pièce</label>
                    <input v-model="numPiece" 
                      type="text" 
                      class="form-control border border-secondary rounded-2" 
                      id="numPiece" 
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
                          :selected="role.id == role_id"
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
                      <select v-model="departement" @change="onDepartement" id="departement" class="form-select border border-secondary rounded-2" aria-label="Default select example" :class="{
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

                  <div class="mt-4 d-flex justify-content-between">
                    
                    <BButton  class="btn px-5" @onBack="toggleWizard(1, 18)">
                      Retour
                    </BButton>
                    <BButton variant="primary" class="px-5" @click="onNext">
                      Suivant
                    </BButton>
                    
                  </div>
                  
                </BRow>
              </div>

              <!-- Securité -->
              <div class="tab-pane fade" :class="activeTab == 3 && 'show active'" id="steparrow-description-info" role="tabpanel" aria-labelledby="steparrow-description-info-tab">
                
                
                <div class="mt-4 d-flex justify-content-center">
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
                  <BButton 
                    v-if="!isEditMode" 
                    variant="primary" 
                    class="ms-2" 
                    @click="onSave"
                    :loading="loadingCreer" 
                    loading-text="creation"
                  >
                    <span class="px-md-5">Enregistrer</span>
                  </BButton>
                </div>
                
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
