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
import {FormWizard, TabContent} from 'vue3-form-wizard'



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

function validateWithPattern(value, pattern) {
  // Vérifie si la valeur correspond au pattern
  return pattern.test(value);
}

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

// Gestion des étapes du formulaire
const validPersonnelInfo = () => {
  
  next.value = true;
  v$.value.$touch();

  if (v$.value.e_mail.$error || v$.value.nom.$error || v$.value.prenom.$error || v$.value.telephone1.$error || v$.value.telephone2.$error) {
    return false
  } else {
    next.value = false;
    return true
  }
};

const validProfessionnelInfo = () => {
  if(isEditMode){
    onUpdateUser()
    return 
  }

  return true;
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
        console.log("User------------------: "+response.data.data)
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
  wizard.value.reset()

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

const handleValidation = (isValid, tabIndex) => {
  return false
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
    <BForm v-else style="min-height: 250px;">
          
      <form-wizard 
        ref="wizard"
        shape="circle" 
        color="#094899" step-size="xs" 
        nextButtonText="Suivant" 
        backButtonText="Retour"
        :finishButtonText=" isEditMode ? 'Modifier' : 'Enregistrer'"
        errorColor="#ff3333"
        @on-complete="onSave"
        @on-loading="onSave"
      >


        <!-- Informations personnelles -->
        <tab-content :before-change="validPersonnelInfo" title="Informations Personnelles" icon="fa fa-user">
         
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
            
          </BRow>
              

        </tab-content>



        <!-- Informations professionnelles -->
        <tab-content :before-change="validProfessionnelInfo" title="Informations Professionnelles" icon="fa fa-briefcase">
            
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

            </BRow>


        </tab-content>

        <!-- Informations sécurité -->
        <tab-content v-if="!isEditMode" title="Sécurités" icon="fa fa-shield-alt">
          
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
          
        </tab-content>

        <ScaleLoader :loading="loadingCreer" :height="'30px'" :color="'#FE0201'" />
        
      </form-wizard>

    </BForm>

    

</BModal>
</template>

