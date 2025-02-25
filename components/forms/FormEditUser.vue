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
const wizard = ref(null)

const progressBarValue = ref(18);
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
let data = ref({})
const password = ref(null)
const confirmPassword = ref(null)
const typePiece = ref(null)
const allTypePiece = ref([])
const numPiece = ref(null)
const typeUser = ref(null)
const estDiff = ref(false)

const regex = ref({
  errorMatricule: false,
  errorCodeVisite: false
})

// Vuelidate - Validation rules
const rules = {
  e_mail: { required, email },
  nom: { required },
  prenom: { required },
  civilite: { required },
  telephone1: { required },
  telephone2: { required },
  codeVisite: { required },
  departement: { required },
  password: { required },
  confirmPassword: { required },
  service: { required },
  role: { required },
  typeUser: { required },
};

const v$ = useVuelidate(rules, { e_mail,confirmPassword, password, nom, prenom, civilite, telephone1,telephone2,  role, typeUser });

const isOpen = defineModel('isOpen')
const uuid = defineModel('uuid')
const isEditMode = ref(false)


// Watchers
watch(
  () => uuid.value, 
  async (newUuid) => {
  if (newUuid) {
    isEditMode.value = true
    data.value = await getUser(newUuid); 
    if(data.value) {
      console.log("DATA----------------------: "+JSON.stringify(data.value))
      nom.value = data.value.nom;
      prenom.value = data.value.prenom;
      e_mail.value = data.value.email;
      telephone1.value = data.value.telephone1;
      telephone2.value = data.value.telephone2;
      civilite.value = data.value.civilite;
      uuid.value = data.value.uuid;
      role.value = data.value.role_id
      // typeUser.value = data.value.type_user
      // typePiece.value = data.value.type_piece

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

    selectRoles.value = await roles();

    allTypePiece.value = await toutesCategories("TPI");
    
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


const toggleWizard = (tab, value) => {
    activeTab.value = tab
    progressBarValue.value = value
  }

const toggleTabWizard = (tab) => {
  activeTabArrow.value = tab;
}




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
      formData.append('type_user', typeUser.value);
      formData.append('role_id', role.value);
      formData.append('departement_id', departement.value);
      formData.append('service_id', service.value);

      if (photo.value) {
        formData.append('image', photo.value);
      }

      const response = await apiClient.post(`/user/${uuid.value}`, formData, {
        headers: { 'Authorization': `Bearer ${authStore.token}` },
      });

      if(!response.data.error){
        const users = await getAll("user")
        gestionStore.setUsers(users.data)

        isOpen.value = false
        loadingCreer.value = false;
        uuid.value = null
        isEditMode.value = false
        wizard.value.reset()

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


const validatePersonnelInfo = () =>{
  next.value = true
  v$.value.$touch();
  if(v$.value.nom.$error || 
    v$.value.prenom.$error ||
    v$.value.e_mail.$error ||
    v$.value.telephone1.$error ||
    v$.value.telephone2.$error ||
    v$.value.civilite.$error ){
      return
  }

  next.value = false
  toggleWizard(2, 50)

}

const validateProfessionnelInfo = () =>{
  next.value = true
  v$.value.$touch();
  if(v$.value.typeUser.$error || 
    v$.value.role.$error ){
      return
  }

  next.value = false
  toggleWizard(3, 100)

}

const validateSecuritylInfo = () =>{
  next.value = true
  v$.value.$touch();
  if(v$.value.password.$error || 
    v$.value.confirmPassword.$error ){
      return

  }else if(password.value !== confirmPassword.value){
    estDiff.value = true
    return
  }

  next.value = false
  onSave()

}


const onSave = async () => {
  submitted.value = true;
  v$.value.$touch();

  if (v$.value.confirmPassword.$error || v$.value.password.$error ) {
    return;
  } else {
    if(password.value !== confirmPassword.value){
      estDiff.value = true
      return;
    }
    loadingCreer.value = true;
    try {
      const formData = new FormData();
      formData.append('nom', nom.value);
      formData.append('prenom', prenom.value);
      formData.append('email', e_mail.value);
      formData.append('password', password.value);
      formData.append('telephone1', telephone1.value);
      formData.append('telephone2', telephone2.value);
      formData.append('type_user', typeUser.value);
      formData.append('role_id', role.value);
      formData.append('civilite', civilite.value);
      formData.append('matricule', matricule.value);
      formData.append('code_visite', codeVisite.value);
      formData.append('departement_id', departement.value);
      formData.append('service_id', service.value);
      formData.append('type_piece_id', typePiece.value);
      formData.append('numero_piece', numPiece.value);

      if (photo.value) {
        formData.append('image', photo.value);
      }

      const response = await apiClient.post(`/user`, formData, {
        headers: { 'Authorization': `Bearer ${authStore.token}` },
      });

      if(!response.data.error){
        const users = await getAll("user")
        gestionStore.setUsers(users.data)
        isOpen.value = false
        loadingCreer.value = false;
        uuid.value = null
        isEditMode.value = false
        wizard.value.reset()
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
      console.log("RESPONSE------------: "+JSON.stringify(response))
      if(!response.error){
        selectServices.value = response.data.children
      }
    }catch(e){

    }
  }
};



// Réinitialiser le formulaire
const resetForm = () => {
  submitted.value = false;
  loadingDetail.value = false
  loadingCreer.value = false

  isOpen.value = false
  uuid.value = null
  isEditMode.value = false

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



const successmsg = (message, type = 'success') => {
  Swal.fire('Succès!', `${message}!`, `${type}`);
};



</script>



<template>
  <BModal 
      @hide="resetForm" 
      size="xl"
      v-model="isOpen" 
      :title="isEditMode ? `Modifier les informations` : 'Création d\'Utilisateur'" 
      title-class="font-18" 
      hide-footer
      no-close-on-backdrop
      
  >
  
    <ScaleLoader v-if="loadingDetail" :loading="loadingDetail" style="margin: 10em 0;" :height="'30px'" :color="'#FE0201'" />
    <div v-if="!loadingDetail" class="wizard shadow-none">
      <BCard no-body >
        <BCardBody class="shadow-none">
          <BCardTitle class="mb-3">Basic Wizard</BCardTitle>
          <BForm action="#">
            <div id="custom-progress-bar" class="progress-nav mb-4">
              <div class="progress">
                <div class="progress-bar" role="progressbar" :style="`width: ${progressBarValue}%;`" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
              </div>

              <ul class="nav nav-pills d-flex justify-content-around wizard-steps" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link wizard-step" id="pills-gen-info-tab" type="button" role="tab" :class="{ active: activeTab == 1, done: activeTab > 1 }" @click="toggleWizard(1, 18)">
                    <i class="wizard-icon mdi mdi-account-circle font-size-24"></i>
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link wizard-step" id="pills-info-desc-tab" type="button" role="tab" :class="{ active: activeTab == 2, done: activeTab > 2 }" @click="toggleWizard(2, 50)">
                    <i class="wizard-icon mdi mdi-face-profile font-size-24"></i>
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link wizard-step" id="pills-success-tab" type="button" role="tab" :class="{ active: activeTab == 3, done: activeTab > 3 }" @click="toggleWizard(3, 100)">
                    <i class="wizard-icon mdi mdi-checkbox-marked-circle-outline font-size-24"></i>
                  </button>
                </li>
              </ul>
            </div>

            <div class="tab-content">
              <div class="tab-pane fade" :class="activeTab == 1 && 'show active'" id="pills-gen-info" role="tabpanel" aria-labelledby="pills-gen-info-tab">
                <!-- <Step1 @onNext="toggleWizard(2, 50)" /> -->


                <BRow class="mt-3">
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

                  <BCol sm="3" md="3" class="mb-3" v-if="!isEditMode">
                    <label for="typePiece" style="font-size: 12px; font-weight: bolder">Type pièce</label>
                    <div class="input-group">
                      <select v-model="typePiece" id="typePiece" class="form-select border border-secondary rounded-2" aria-label="Default select example" :class="{
                        'is-invalid': submitted && v$.role.$error}"
                      >
                        <option 
                          v-for="piece in allTypePiece" 
                          :key="piece.id" 
                          :value="piece.id"
                          :selected="piece.id == role_id"
                        >

                        {{ piece.libelle }}

                        </option> 
                      </select>
                      
                    </div>
                  </BCol>

                  <BCol sm="3" class="mb-3" v-if="!isEditMode">
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
                  
                  <div class="d-flex justify-content-end">
                    <BButton variant="primary" class="px-5" @click="validatePersonnelInfo">
                      Suivant
                    </BButton>
                  </div>

                </BRow>



              </div>

              <div class="tab-pane fade" :class="activeTab == 2 && 'show active'" id="pills-info-desc" role="tabpanel" aria-labelledby="pills-info-desc-tab">
                
                <BRow>
                  <BCol sm="3" class="mb-3">
                    <label for="role" style="font-size: 12px; font-weight: bolder">Type utilisateur</label>
                    <div class="input-group">
                      <select v-model="typeUser" id="role" class="form-select border border-secondary rounded-2" aria-label="Default select example" :class="{
                        'is-invalid': next && v$.typeUser.$error}"
                      >
                        <option value="S">Standart</option> 
                        <option value="V">Visiteur</option> 
                        <option value="A">Administration</option> 
                      </select>
                      <div v-if="next && v$.typeUser.$error" class="invalid-feedback">
                        <span v-if="v$.typeUser.required.$invalid">Type utilisateur obligatoire
                        </span>
                      </div>
                    </div>
                  </BCol>
                  <BCol sm="3" class="mb-3">
                    <label for="role" style="font-size: 12px; font-weight: bolder">Rôle</label>
                    <div class="input-group">
                      <select v-model="role" id="role" class="form-select border border-secondary rounded-2" aria-label="Default select example" :class="{
                        'is-invalid': next && v$.role.$error}"
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
                      <div v-if="next && v$.role.$error" class="invalid-feedback">
                        <span v-if="v$.role.required.$invalid">rôle obligatoire
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
                        'is-invalid': next && regex.errorMatricule
                      }">
                      <div v-if="next && regex.errorMatricule" class="invalid-feedback">
                        <span v-if="regex.errorMatricule">Le matricule doit suivre le format XXX123
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
                        'is-invalid': next && regex.errorCodeVisite
                      }">
                      <div v-if="next && regex.errorCodeVisite" class="invalid-feedback">
                        <span v-if="regex.errorCodeVisite">Le code visite doit suivre le format VTR-001
                        </span>
                      </div>
                    </div>
                  </BCol>


                  <BCol sm="6" class="mb-3">
                    <label for="departement" style="font-size: 12px; font-weight: bolder">Département</label>
                    <div class="input-group">
                      <select v-model="departement" @change="onDepartement" id="departement" class="form-select border border-secondary rounded-2" aria-label="Default select example">
                        <option 
                          v-for="departement in selectDepartements" 
                          :key="departement.code" 
                          :value="departement.id"
                        >
                        
                          {{ departement.libelle }}
                        
                        </option>

                      </select>
                      <!-- <div v-if="submitted && v$.departement.$error" class="invalid-feedback">
                        <span v-if="v$.departement.required.$invalid">Département obligatoire
                        </span>
                      </div> -->
                    </div>
                  </BCol>
                  <BCol sm="6" class="mb-3">
                    <label for="service" style="font-size: 12px; font-weight: bolder">Service</label>
                    <div class="input-group">
                      <select v-model="service" id="service" class="form-select border border-secondary rounded-2" aria-label="Default select example">
                        <option 
                          v-for="service in selectServices" 
                          :key="service.id" 
                          :value="service.id"
                        >

                        {{ service.libelle }}

                        </option> 
                      </select>
                      <!-- <div v-if="submitted && v$.service.$error" class="invalid-feedback">
                        <span v-if="v$.service.required.$invalid">Service obligatoire
                        </span>
                      </div> -->
                    </div>
                  </BCol>

                  <div class="d-flex justify-content-end justify-content-md-between">
                    <BButton variant="primary" class="d-flex" @click="toggleWizard(1, 30)">
                      <span class="px-md-5">retour</span>
                    </BButton>

                    <BButton variant="primary" class="ms-2" @click="validateProfessionnelInfo">
                      <span class="px-md-5" v-if="!loadingEdit">Modifier</span>
                      <ScaleLoader v-if="loadingEdit" :loading="loadingEdit" :height="'25px'" :color="'#FFFFFF'" />
                    </BButton>
                  </div>

                </BRow>




              </div>
<!-- 
              <div class="tab-pane fade" :class="activeTab == 3 && 'show active'" id="pills-success" role="tabpanel" aria-labelledby="pills-success-tab">

                <BRow>

                <BCol sm="6" class="mb-3">
                  <label for="password" style="font-size: 12px; font-weight: bolder">Mot de passe</label>
                  <div class="input-group">
                    <input 
                      v-model="password" 
                      id="password" 
                      class="form-control border border-secondary rounded-2" 
                      type="password"
                      :class="{
                      'is-invalid': submitted && (v$.password.$error)
                    }">
                    <div v-if="submitted && v$.password.$error" class="invalid-feedback">
                      <span v-if="v$.password.required.$invalid">mot de passe obligatoire
                      </span>
                    </div>
                  </div>
                </BCol>

                <BCol sm="6" class="mb-3">
                  <label for="confirmPassword" style="font-size: 12px; font-weight: bolder">Confirmer mot de passe</label>
                  <div class="input-group">
                    <input 
                      v-model="confirmPassword" 
                      id="confirmPassword" 
                      class="form-control border border-secondary rounded-2" 
                      type="password"
                      :class="{
                      'is-invalid': submitted && (v$.password.$error || confirmPassword !== password)

                    }">
                    <div v-if="submitted" class="invalid-feedback">
                      <span v-if="v$.confirmPassword.$error && v$.confirmPassword.required.$invalid">confirmation du mot de passe obligatoire
                      </span>
                      <span v-if="estDiff" class="text-danger"> Mot de passe different!</span>
                    </div>
                  </div>
                </BCol>
                </BRow>

                <div class="d-flex justify-content-end justify-content-md-between">
                  <BButton variant="primary" @click="toggleWizard(2, 50)">
                    <span class="px-md-5">Retour</span>
                  </BButton>
                  <BButton variant="primary" class="ms-2">
                    <span v-if="loadingCreer" class="px-md-5">Enregistrer</span>
                    <ScaleLoader v-if="loadingCreer" :loading="loadingCreer" style="margin: 10em 0;" :height="'25px'" :color="'#FE0201'" />
                  </BButton>
                </div>

              </div> -->



            </div>
          </BForm>
        </BCardBody>
      </BCard>

    </div>

    

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

