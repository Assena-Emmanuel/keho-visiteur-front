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
  }),

  validations:{
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
   
    };

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
}
</script>

--------------------------------------
<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import apiClient from "~/components/api/intercepteur";
import { allUserStore } from '@/stores/allUserStore';

export default {
  setup() {
    const authStore = useAuthStore(); // Initialisation du store

      return { v$: useVuelidate(), authStore  };
    },
  data() {
    return {
      progressBarValue: 34,
      activeTab: 1,
      activeTabArrow: 2,
      activeTabprofessionnelle: false,
      selectDepartements:"",
      selectServices:"",
      token : "",
      user: "",
      show: false,
      // infos personnelles
        test : "",
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
        userDepartement: "",
        userService: "",
        processing: false,
        submitted: false,
        next: false,
        statut: ""
    };
  },
  computed:{
    user() {
      return this.authStore.user;
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
      userDepartement:{
        required
      },
      userService: {
        required
      },
      photo:{required},
      statut: {required},

    },

    mounted() {
    this.show = true
    this.token = useCookie('token')
    this.user = this.userStore.user

    this.test = this.user.visite.matricule
    this.civilite = this.user.civilite
    this.nom = this.user.nom
    this.prenom = this.user.prenom
    this.email = this.user.email
    this.mobile1 = this.user.telephone1
    this.mobile2 = this.user.telephone2
    this.statut = this.user.statut
    this.photo = this.user.image

    // Info professionnelles
    this.matricule = this.user.visite.matricule || ""
    this.codeVisite = this.user.visite.code_visite || ""
    this.userService = this.user.visite.service_id
    this.userDepartement = this.user.visite.departement_id

    // recuperer tous les departement
    this.toutesCategories("DPT")
    .then(departements => {
      this.selectDepartements = departements;
    })
    .catch(error => {
      console.error('Erreur lors de la récupération du departement:', error);
    });

    // recuperer tous les departement
    this.toutesCategories("SRV")
    .then(services => {
      this.selectServices = services;
    })
    .catch(error => {
      console.error('Erreur lors de la récupération du service:', error);
    });



    this.show = false
  },
  computed(){
    this.user = this.authStore.users
  },

  methods: {
    updateUserInfo(user) {
      this.civilite = user.civilite || "";  // Mise à jour de la civilité
      this.nom = user.nom || "";  // Mise à jour du nom
      this.prenom = user.prenom || "";  // Mise à jour du prénom
      this.email = user.email || "";  // Mise à jour de l'email
      this.mobile1 = user.telephone1 || "";  // Mise à jour du premier numéro de téléphone
      this.mobile2 = user.telephone2 || "";  // Mise à jour du deuxième numéro de téléphone
      this.statut = user.statut || "";  // Mise à jour du statut

      // Informations professionnelles
      this.matricule = user.visite ? user.visite.matricule : ""
      this.codeVisite = user.visite ? user.visite.code_visite :  ""
      this.userService = user.visite ? user.visite.service_id :  ""
      this.userDepartement = user.visite? user.visite.departement_id :  ""
    },

    toggleWizard(tab, value) {
      this.activeTab = tab;
      this.progressBarValue = value;
    },


    async toutesCategories(slug) {
      try {
        const response = await apiClient.get(`/categorie_by_slug/${slug}`, {},{
          headers: {
            'Authorization': `Bearer ${this.token}`,
          }
        });
         if(!response.data.error){
          return response.data.data
         }

      } catch (error) {
        console.error('Error fetching Departement-----:', error);
      }
    },


    async categorie(id) {
      try {
        console.log(`Requête API pour la catégorie avec l'ID : ${id}`);
        console.log(`Token utilisé : ${this.token}`);

        const response = await apiClient.get(`/categorie/${id}`, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          }
        });

        if (!response.data.error) {
          return response.data.data.libelle;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du service :', error);
      }
    }
,

    // SweetAlert
    // successmsg() {
    //   this.$swal.fire("Succes!", "Modification reussie!", "success");
    // },

    successmsg() {
      this.$swal.fire("Succes!", "Modification réussie!", "success")
        .then(() => {
          this.activeTabprofessionnelle = false
          this.next = false
          this.toggleWizard(1, 100)

          // this.civilite = this.user.civilite
          // this.nom = this.user.nom
          // this.prenom = this.user.prenom
          // this.email = this.user.email
          // this.mobile1 = this.user.telephone1
          // this.mobile2 = this.user.telephone2
          // this.statut = this.user.statut
          // this.photo = this.user.photo

          // // Info professionnelles
          // this.matricule = this.user.visite.matricule || ""
          // this.codeVisite = this.user.code_visite || ""
          // this.userDepartement = this.user.departement_id || ""
          // this.userService = this.user.service_id || ""
        });
         if(!response.data.error){
          return response.data.data
         }

      } catch(error) {
        console.error('Error fetching Departement-----:', error);
      }
    },


    async categorie(id) {
      try {
        console.log(`Requête API pour la catégorie avec l'ID : ${id}`);
        console.log(`Token utilisé : ${this.token}`);

        const response = await apiClient.get(`/categorie/${id}`, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          }
        });

        if (!response.data.error) {
          return response.data.data.libelle;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du service :', error);
      }
    }
,

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


    toggleTabWizard(tab) {
      this.activeTabArrow = tab;
    },

    handleFileUpload(event) {
      // Récupérer le fichier sélectionné
      this.photo = event.target.files[0];
    },

    onNext() {
      this.next = true
      this.v$.$touch();
      if(
        this.v$.email.$error ||
        this.v$.nom.$error ||
        this.v$.prenom.$error ||
        this.v$.civilite.$error ||
        this.v$.mobile1.$error){

          this.activeTabprofessionnelle = false
      }else{
        this.activeTabprofessionnelle = true
        this.next = false
        this.toggleWizard(2, 100)
      }
    },


    async onSave(){
      this.submitted = true;
      this.v$.$touch();
      if(
        this.v$.codeVisite.$error ||
        this.v$.userDepartement.$error ||
        this.v$.userService.$error ||
        this.v$.matricule.$error
        ){
          return
      }else{
        this.show = true;
        try{

          await apiClient.post(
            `/user/${this.user.uuid}`,
            {
              nom: this.nom,
              prenom: this.prenom,
              email: this.email ,
              image: this.photo,
              telephone1: this.mobile1,
              telephone2: this.mobile2,
              civilite: this.civilite,
              matricule: this.matricule,
              departement_id: this.userDepartement,
              service_id: this.userService,
            },
            {

              headers: {
                'Authorization': `Bearer ${this.token}`,
              }

            }).then(reponse =>{
              if(!reponse.data.error){

              apiClient.post('/auth/me', {}, {
                headers: { Authorization: `Bearer ${this.token}` },
              }).then(response=>{


            })

        }catch{
          alert("error")
        }finally{
          this.show = false
        }




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
        this.userDepartement = ""
        this.userService = ""

        this.submitted = false;
      }
    },
    async handleStatut(){
      try {
        const response = await apiClient.get(`/categorie_by_slug/${this.user.id}`, {
          active : this.user.statut === 0 ? 1 : 0
        },{
          headers: {
            'Authorization': `Bearer ${this.token}`,
          }
        });
        if(!response.data.error){
          console.log("-------------------------!"+response.data.data)
        }
      } catch (error) {
        console.error('Error fetching Service:', error);
      }
    }

  }
};
</script>