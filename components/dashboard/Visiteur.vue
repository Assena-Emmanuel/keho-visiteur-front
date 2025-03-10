<template>
  <DashboardCommonStat />
    <!-- Modal détail -->
    <BModal  v-model="detailModal" @hide="hideModal" hide-footer title="Détail Visiteur" >
      <!-- <template v-slot:header>
        <div class="d-flex justify-content-start w-100" style="position: relative;">
          <img src="/images/total-removebg.png" alt="" width="50">
        </div>
      </template> -->
    <ScaleLoader :loading="loadingDetail" style="margin: 10em 0;" :height="'30px'" :color="'#FE0201'" />
    <div v-if="data && data.visiteurs && !loadingDetail"  v-for="item in paginatedData" :key="item['Code visite']">
      <div class="text-center"><h3>{{ item.visiteur.users.nom }} {{ item.visiteur.users.prenom }}</h3>
        <span v-if="item.delegation && item.chef_equipe " class="badge bg-danger rounded">délégué</span>
      </div>
      <div class="d-flex justify-content-between">
        <div>
          <span v-if="data.fvisite.statut==2" class="text-succes px-2 ms-2">statut: <span class="">terminé</span></span>
          <span v-if="data.fvisite.statut==1" class="text-warning px-2 ms-2">statut: <span class="">Notifié</span></span>
          <span v-if="data.fvisite.statut==0" class="text-warning px-2 ms-2">statut: <span class="">En cours</span></span>
          <span v-if="data.fvisite.statut==3" class="text-danger px-2 ms-2">statut: <span class="">Rejeté</span></span>
          <span v-if="data.fvisite.statut==4" class="text-info px-2 ms-2">statut: <span class="">Confirmé</span></span>
          <span v-if="data.fvisite.statut==5" class="text-succes px-2 ms-2">statut: <span class="">Clôturé</span></span>
        </div>
        <div><small class=" px-2 ms-2 "><i class="fa fa-clock"></i> <small>{{ formatDateTime(data.fvisite.created_at)  }}</small></small></div>
      </div>
      <hr class="text-secondary">
      <div class="row">
        <div class="col col-md-6">
          <p><strong>Téléphone:</strong> {{ item.visiteur.users.telephone2 }}</p>
        </div>
        <div class="col col-md-6">
          <p><strong>Société:</strong> {{ item.visiteur.entreprise.libelle }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col col-md-6">
          <p><strong>E-mail:</strong> {{ item.visiteur.users.email }}</p>
        </div>
        <div class="col col-md-6">
          <p><strong>Code visiteur:</strong> {{ data.fvisite.code_fvisite }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col col-md-6">
          <p><strong>Type pièce:</strong> {{ item.visiteur.type_piece.code == 'CNI' ? item.visiteur.type_piece.code :  item.visiteur.libelle }}</p>
        </div>
        <div class="col col-md-6">
          <p><strong>Num pièce:</strong> {{ item.visiteur.numero_piece }}</p>
        </div>
      </div>
     
      <div class="row">
        <div class="col col-md-6">
          <p><strong>Heure d'entrée:</strong> {{ data.fvisite.heure_entree }}</p>
        </div>
        <div class="col col-md-6">
          <p><strong>Heure de Sortie:</strong> {{ !data.fvisite.heure_fin ? "---------" : data.fvisite.heure_fin }}</p>
        </div>
      </div>

      <div class="row carte mt-2 mb-2">
        <div class="col-6 d-flex justify-content-center">
          <img @click="imgViewer('image-recto')" 
              id="image-recto"  
              :src="`data:${item.visiteur.mime_type_p};base64,${item.visiteur.image_p}`" 
              height="80" 
              class="cni" 
              alt="CNI recto">
        </div>
        <div class="col-6 d-flex justify-content-center">
          <img @click="imgViewer('image-verso')" 
              id="image-verso" 
              :src="`data:${item.visiteur.mime_type_v};base64,${item.visiteur.image_v}`" 
              height="80" 
              class="cni" 
              alt="CNI verso">
        </div>
      </div>

      <div class="bg-danger text-center text-light" v-if="item.delegation">En délégation</div>
      <hr />
    </div>


    <div class="d-flex justify-content-end" v-if="data && data.visiteurs && data.visiteurs.length > 1 && !loadingDetail">

    <vue-awesome-paginate
      :total-items="data.visiteurs.length"
      :items-per-page="1"
      :max-pages-shown="data.visiteurs.length>= 18 ? 2 : 5"
      v-model="currentPage"
    />
    </div>
    
  </BModal>  

  <BCard style="min-height: 10em; "  >
    <BCardBody >
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-3xl">Visites enregistrées</h3>
        </div>
        <div class="d-flex justify-content-end mb-3" style="margin-top: -20px;">
            <button 
              @click="resetAction" 
              :disabled="loadingReset"
              class="btn btn-outline-primary">
              <i v-if="!loadingReset" class="fas fa-sync-alt"></i>
              <i v-else class="fas fa-spinner fa-spin"></i> 
            </button>
          </div>
        <BRow class="mb-3">
              <BCol sm="12" md="6">
                <VueDatePicker enable-seconds :enable-time-picker="false" v-model="dateselect" range multi-calendars   placeholder="Date Debut - Date Fin" select-text="Selectionner" cancel-text="Annuler" :locale="'fr'" />
              </BCol> 
              <BCol sm="12" md="4" v-if="authStore.user.role.code == 'SUPADM'">
                <div>
                  <div class="input-group border border-secondary rounded-1">
                  <span class="input-group-text">
                      <i class="fas fa-search font-size-10"></i>
                  </span>
                  <BFormInput
                      v-model="searchValue"
                      type="search"
                      id="input-small"
                      class="form-control"
                      placeholder="Rechercher..."
                  />
                  </div>
                </div>
              </BCol>
              <BCol sm="12" md="2">
                  <BButton style="width: 100%;"  @click="recherche">Rechercher</BButton>
              </BCol>
            
          </BRow>
          

          <vue3-datatable
            :rows="items"
            :columns="headers"
            :loading="loading"
            :totalRows="serverItemsLength"
            :isServerMode="true"
            :pageSize="params.pagesize"
            :showNumbersCount="3"
            class="alt-pagination"
            :pageSizeOptions="[5, 10, 50, 200]"
            paginationInfo="Afficher de {0} à {1} sur {2} elements"
            skin="bh-table-striped"
            pageSize="5"
            noDataContent="Aucune donnée disponible"
            @change="changeServer"
        >

        <template #lib_statut="data">
          <strong>{{ data.value.email }}</strong>
          <span v-if="data.value.statut == 0" class="text-warning">{{ data.value.lib_statut }}</span>
            <span v-if="data.value.statut == 1" class="text-info">{{ data.value.lib_statut }}</span>
            <span v-if="data.value.statut == 2" class="text-success">{{ data.value.lib_statut }}</span>
            <span v-if="data.value.statut == 3" class="text-danger">{{ data.value.lib_statut }}</span>
            <span v-if="data.value.statut == 4" class="text-success">{{ data.value.lib_statut }}</span>
            <span v-if="data.value.statut == 5" class="text-dark">{{ data.value.lib_statut }}</span>
        </template>

        <template #actions="data">
              <div class="d-flex gap-1">
                <BButton 
                  v-if="permissions.some(perm => perm.show)" 
                  style="width: 15px; height: 15px;" 
                  variant="white" 
                  size="sm" 
                  class="d-flex text-primary justify-content-center align-items-center" 
                  @click="showDetailsModal(data.value.uuid)"
                >
                  <i class="fas fa-eye"></i>
                </BButton>

                 
                <BButton 
                  v-if="permissions.some(perm => perm.prt)" 
                  style="width: 15px; height: 15px;" 
                  variant="white" 
                  size="sm" 
                  class="d-flex text-primary justify-content-center align-items-center" 
                  @click="showTicket(data.value.uuid)"
                >
                  <i class="uil uil-print font-size-15"></i>
                </BButton>

                
                <BButton 
                  v-if="permissions.some(perm => perm.cancel)" 
                  style="width: 15px; height: 15px;" 
                  variant="white" 
                  size="sm" 
                  class="mr-1 fw-bold text-warning d-flex justify-content-center align-items-center" 
                  @click="rejet(data.value.uuid)" 
                  v-b-tooltip.hover.bottom="'rejeter'"
                >
                  <i class="uil uil-ban font-size-15 annuler"></i>
                </BButton>

                
                <BButton 
                  v-if="permissions.some(perm => perm.del)" 
                  style="width: 15px; height: 15px;" 
                  variant="white" 
                  size="sm" 
                  class="px-2 text-danger d-flex justify-content-center align-items-center" 
                  @click="confirmDelete(data.value.uuid)"
                >
                  <i class="uil uil-trash-alt font-size-15"></i>
                </BButton>
                      
              </div>
          </template>
          <template #heure_fin="data">
              <div>
                  <span>----</span>
              </div>
          </template>


        </vue3-datatable>

        
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth.js";
import apiClient from "../api/intercepteur";
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import Swal from 'sweetalert2';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import '@bhplugin/vue3-datatable/dist/style.css'
import Viewer from 'viewerjs'
 import 'viewerjs/dist/viewer.css';
 
    


const authStore = useAuthStore();

const headers = ref([
  { title: "Date", field: "created_at", width: "40px", sortable: true },
  { title: "Nom & Prénoms",width: "40px", field: "visiteur" },
  { title: "CNI",width: "40px", field: "numero_piece"},
  { title: "Société",width: "40px", field: "entreprise"},
  { title: "Code visiteur",width: "40px", field: "code_visiteur" },
  { title: "Code visite",width: "40px", field: "code_visite" },
  { title: "Employé",width: "40px", field: "employe" },
  { title: "Visite",width: "40px", field: "lib_visite" },
  { title: "H entrée",width: "40px", field: "heure_entree" },
  { title: "Statut",width: "40px", field: "lib_statut" },
  { title: "H Sortie",width: "40px", field: "heure_fin" },
  { title: "Actions",width: "40px", field: "actions" },
]);


const loadingReset = ref(false)
const permissions = ref([])
const items = ref([]);
const loading = ref(false);
const serverItemsLength = ref(0);
const searchValue = ref("");
const detailModal = ref(false)
const data = ref([])
const loadingDetail = ref(false)
const dateDebut = ref(null)
const dateFin = ref(null)
const dateselect = ref(null)
const currentPage = ref(1)
const params = reactive({ current_page: 1, pagesize: 5 });
const serverOptions = ref({
  page: params.current_page,
  rowsPerPage: params.pagesize,
  sortBy: 1,
  code_employe: '',
});


// visualiser piece
const imgViewer = (id) => {
    // Sélectionne l'image cliquée par son id
    const imageElement = document.getElementById(id);

    if (imageElement) {
      // Crée un nouvel objet Viewer pour cette image
      const viewer = new Viewer(imageElement, {
        inline: false,
        viewed() {
          viewer.zoomTo(1);  // Ajuste le zoom dès que l'image est vue
        },
        

      });

      // Affiche la vue modale de l'image cliquée
      viewer.show();
    } else {
      console.error('Image non trouvée');
    }
  }

// reactualiser
function resetAction(){
  loadingReset.value = true
  try{
    loadFromServer()
    searchValue.value = null
    dateDebut.value = null
    dateFin.value = null
  }catch{
    console.error("Erreur de lors de la reactualisation")
  }finally{
    loadingReset.value = false
  }
  
}

// Fonction pour charger les données depuis le serveur
const loadFromServer = async () => {
  loading.value = true;
  try {
      const response = await apiClient.get("/fvisites/lvisite", {
      params: {
        page: params.current_page,
        limit: params.pagesize,
        sort_type: serverOptions.value.sortBy,
        code_employe: serverOptions.value.code_employe,
      },
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },

    });

    if (!response.data.error) {
      
      const data = response.data.data;
      items.value = data?.data;
      serverItemsLength.value = response.data.data.total;

    }

  } catch (e) {
    console.error("Erreur lors de la récupération des données: " + e);

  } finally {
    loading.value = false;

  }
};

const changeServer = (data) => {
    params.current_page = data.current_page;
    params.pagesize = data.pagesize;

    loadFromServer();
};

// Appel initial pour charger les données
 onMounted( async () => {
  loadFromServer();
  
  const code = "visiteur"
  const response = await apiClient.get(`/permissions/menu_action/${authStore.user.role_id}/${code}`, 
  {
  headers: {
      'Authorization': `Bearer ${authStore.token}`,  // Utilisation du token d'authentification
      },
  })

  if(!response.data.error){
    permissions.value = response.data

  }else{
    console.error("Menu error: "+response.message)

  }
  
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1);
  const end = start + 1;
  return data.value.visiteurs.slice(start, end);
});

// recherche coté server
const recherche = async () => {
  loading.value = true;
  let date = {}
  let code = null
  
  if ((Array.isArray(dateselect.value) && dateselect.value.length === 2) ) {
    
    const startDate = new Date(dateselect.value[0]);
    let endDate = null
    if(dateselect.value[1]){
       endDate = new Date(dateselect.value[1]);
    }


    // Formater les dates au format 'YYYY-MM-DD HH:mm:ss'
    let formattedEndDate = null
    const formattedStartDate = startDate.toISOString().slice(0, 19).replace("T", " ");
    if(dateselect.value[1]){
      formattedEndDate = endDate.toISOString().slice(0, 19).replace("T", " ");
    }
    
    // Mettre à jour la valeur de dateselect pour chaque date
    
    // Vous pouvez faire d'autres opérations avec ces dates
    date = { start: formattedStartDate, end: formattedEndDate };
    
  }else if(searchValue.value){
    code = authStore.user.role.code == 'SUPADM' ?  searchValue.value : authStore.user.visite.code_visite  
  }
  else{
    resetAction()
    return
  }
  
  try {
    // code = authStore.user.role.code == 'SUPADM' ?  searchValue.value : authStore.user.visite.code_visite  
    const param = {
      page: 1,
      limit: 5,
      sort_type: null,
      code_employe: null,
      date_debut: null,
      date_fin: null
    }

    if(authStore.user.role.code == 'SUPADM'){

      // Vérification si dateDebut et dateFin sont définis
      if (date.start != null  && searchValue.value === "") {
        param.sort_type = 3;
        param.date_debut = date.start;
        param.date_fin = dateselect.value[1] != null ? date.end : date.start;

      } 
      // Vérification si searchValue est défini et pas dateDebut et dateFin
      else if (!date==false && searchValue.value) {
        alert(searchValue.value); // Retirer si plus nécessaire pour le débogage
        param.sort_type = 2;
        param.code_employe = searchValue.value;
      } 
      // Tous les critères sont définis
      else if (date.start && dateselect.value[1] !=null && searchValue.value) {
        param.sort_type = 4;
        param.date_debut = date.start;
        param.date_fin = date.end;
        param.code_employe = searchValue.value;

      }
    }else{
      param.sort_type = 4;
      param.date_debut = date.start;
      param.date_fin = date.end;
      param.code_employe = searchValue.value;
    }

    
    

    // Envoi de la requête à l'API
    const response = await apiClient.get("/fvisites/lvisite", {
      params: param,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    // Vérification de la réponse de l'API
    if (!response.data.error) {
      console.log("Réponse reçue:", response.data.data);
      const data = response.data.data;
      items.value = data?.data;
      serverItemsLength.value = response.data.data.total;
    } else {
      console.error("Erreur dans la réponse API:", response.data.error);
    }

  } catch (e) {
    console.error("Erreur lors de la récupération des données:", e);

  } finally {
    loading.value = false;

  }
  }

// Utilisation de debounce pour éviter des appels rapides au serveur
watch(serverOptions, (value) => { 
  loadFromServer(); 
  }, 
  { deep: true }
  );


const formatDateTime = (dateTime) => {
      // Convertir la date en objet Date
      const date = new Date(dateTime);
      
      // Formatter la date et l'heure au format 'YYYY-MM-DD HH:mm'
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
      
      return date.toLocaleString('fr-FR', options); // Utiliser le format français
}

// Fonction pour afficher/modifier les détails d'un visiteur
const showDetailsModal = async (uuid) => {
  if(uuid){
    detailModal.value = !detailModal.value;
    loadingDetail.value = true
    const response = await apiClient(`fvisites/${uuid}`, {
      headers: {
        Authorization : `Bearer ${authStore.token}`
      }
    })

    if(!response.data.error){
      data.value = response.data.data
      console.log('Detail-------------: '+JSON.stringify( data.value.visiteurs))
    }else{
      console.error(response.data)
    }

  }else{
    console.error("uuid obligatoire")
  }
  loadingDetail.value = false
  
};






const confirmDelete = async (uuid) => {
  if (uuid) {
    // Afficher la confirmation de suppression
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Cette action est irréversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Afficher un indicateur de chargement pendant la suppression
        const swalLoading = Swal.fire({
          title: 'Suppression en cours...',
          text: 'Veuillez patienter.',
          icon: 'info',
          showConfirmButton: false,
          allowOutsideClick: false,  // Empêche de fermer la popup avant la fin du processus
          didOpen: () => {
            Swal.showLoading();
          }
        });

        try {
          const response = await apiClient.delete(`fvisites/hdelete/${uuid}`, {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          });

          if (!response.data.error) {
            loadFromServer();
            // Fermer l'alerte de chargement et afficher une alerte de succès
            swalLoading.close();
            Swal.fire('Supprimé!', `${response.data.message}`, 'success');
          } else {
            console.error(response.data);
            swalLoading.close();
            Swal.fire('Erreur', 'Impossible de supprimer l\'élément', 'error');
          }

        } catch (error) {
          swalLoading.close();
          Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression.', 'error');
        }
      }
    });
  }
};



const rejet = async (uuid) => {
  if (uuid) {
    // Afficher la confirmation de suppression
    Swal.fire({
      title: 'Êtes-vous de vouloir REJETER?',
      text: 'Cette action est irréversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Afficher un indicateur de chargement pendant la suppression
        const swalLoading = Swal.fire({
          title: 'Rejet en cours...',
          text: 'Veuillez patienter.',
          icon: 'info',
          showConfirmButton: false,
          allowOutsideClick: false,  // Empêche de fermer la popup avant la fin du processus
          didOpen: () => {
            Swal.showLoading();
          }
        });

        try {
          if (!authStore.token) {
            Swal.fire('Erreur', 'Vous devez être connecté pour effectuer cette action', 'error');
            return;

          }

          const response = await apiClient.post(`fvisites/rejet/${uuid}`, null, {
            headers: {
              Authorization: `Bearer ${authStore.token}`,  // Le token est bien ajouté ici
              'Accept': 'application/json',  // Ajoutez cet en-tête pour demander une réponse JSON
              'X-CSRF-TOKEN': ''  // Si nécessaire, ajoutez le token CSRF
            },
          });
          if (!response.data.error) {
            loadFromServer();
            // Fermer l'alerte de chargement et afficher une alerte de succès
            swalLoading.close();
            Swal.fire('Supprimé!', `${response.data.message}`, 'success');
          } else {
            console.error(response.data);
            swalLoading.close();
            Swal.fire('Erreur', 'Impossible de supprimer l\'élément', 'error');
          }

        } catch (error) {
          swalLoading.close();
          console.error( error);
          Swal.fire('Erreur', 'Une erreur est survenue lors du rejet de la visite.', 'error');
        }
      }
    });
  }
};


const showTicket = async (uuid) =>{
  if(uuid){
    return navigateTo(`/visiteur/visiteurVisite/${uuid}`)
  }
}





const hideModal = () => {
  detailModal.value = false
}

</script>

<style>
  .customize-table{
      --easy-table-header-font-size: 14px;
      --easy-table-body-row-height: 30px;
      --easy-table-body-row-font-size: 14px;

      --easy-table-header-item-padding: 10px 15px;

      --easy-table-body-item-padding: 12px 5px;

      
  }
</style>
<style>
  .pagination-container {
    display: flex;

    column-gap: 10px;
  }

  .paginate-buttons {
    height: 40px;

    width: 40px;

    border-radius: 20px;

    cursor: pointer;

    background-color: rgb(242, 242, 242);

    border: 1px solid rgb(217, 217, 217);

    color: black;
  }

  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }

  .active-page {
    background-color: #3498db;

    border: 1px solid #3498db;

    color: white;
  }

  .active-page:hover {
    background-color: #2988c8;
  }
</style>