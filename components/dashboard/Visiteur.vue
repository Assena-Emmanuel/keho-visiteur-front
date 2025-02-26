<template>
  <DashboardCommonStat />
    <!-- Modal détail -->
    <BModal v-model="detailModal" @hide="hideModal" hide-footer title="Détail Visiteur" >
    <ScaleLoader :loading="loadingDetail" style="margin: 10em 0;" :height="'30px'" :color="'#FE0201'" />
    <div v-if="data && data.visiteurs && !loadingDetail"  v-for="item in data.visiteurs" :key="item['Code visite']">
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
      <!-- <div class="row">
        <div class="col col-md-6">
          <p><strong>Employé:</strong> {{ item.Employé }}</p>
        </div>
        <div class="col col-md-6">
          <p><strong>Code:</strong> {{ item["Code visite"] }}</p>
        </div>
      </div> -->
      <div class="row">
        <div class="col col-md-6">
          <p><strong>Heure d'entrée:</strong> {{ data.fvisite.heure_entree }}</p>
        </div>
        <div class="col col-md-6">
          <p><strong>Heure de Sortie:</strong> {{ !data.fvisite.heure_fin ? "---------" : data.fvisite.heure_fin }}</p>
        </div>
      </div>
      <div class="bg-danger text-center text-light" v-if="item.delegation">En délégation</div>
      <hr />
    </div>
    <div class="d-flex justify-content-end" v-if="data && data.visiteurs && data.visiteurs.length > 1 && !loadingDetail">
      <BPagination
      v-model="page"
      :total-rows="data.length"
      :per-page="itemsPerPage"
      aria-controls="modal-pagination"
    ></BPagination>
    </div>
    
  </BModal>  

  <BCard style="min-height: 10em;">
    <BCardBody>
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-3xl">Visites enregistrées</h3>
        </div>

          <BRow class="mb-3">
              <BCol sm="12" md="3">
              Debut
              <BFormInput
                  type="datetime-local"
                  v-model="dateDebut"
                  class="border border-secondary"
                  size="sm"
              />
              </BCol>
              <BCol sm="12" md="3">
              Fin
              <BFormInput
                  type="datetime-local"
                  v-model="dateFin"
                  class="border border-secondary"
                  size="sm"
              />
              </BCol>
              <BCol sm="12" md="5">
                  <div>
                      <div class="input-group mt-4 border border-secondary rounded-1">
                      <span class="input-group-text">
                          <i class="fas fa-search font-size-10"></i>
                      </span>
                      <BFormInput
                          v-model="searchValue"
                          type="search"
                          id="input-small"
                          size="sm"
                          placeholder="Rechercher..."
                      />
                      </div>
                  </div>
              </BCol>
              <BCol sm="12" md="1">
                  <BButton class="mt-4" size="sm" @click="recherche">Rechercher</BButton>
              </BCol>
            
          </BRow>
          <div class="d-flex justify-content-end mb-3" style="margin-top: -5px;">
            <button 
              @click="resetAction" 
              :disabled="loadingReset"
              class="btn btn-outline-primary">
              <i v-if="!loadingReset" class="fas fa-sync-alt"></i>
              <i v-else class="fas fa-spinner fa-spin"></i> 
            </button>
          </div>

        <!-- Table avec pagination -->
        <EasyDataTable
          v-model:server-options="serverOptions"
          :server-items-length="serverItemsLength"
          :loading="loading"
          :headers="headers"
          :items="items"
          rows-of-page-separator-message="sur"
          buttons-pagination
          table-class-name="customize-table"
          header-text-direction="center"
          body-text-direction="center"
          :rows-items="range"
          :rows-per-page="range[0]"
          empty-message="Aucune donnée disponible"
          rows-per-page-message="Ligne par page"
          :search-field="searchField"
          :search-value="searchValue"

          >


          <template #item-lib_statut="item">
            <span v-if="item.statut == 0" class="text-warning">{{ item.lib_statut }}</span>
            <span v-if="item.statut == 1" class="text-info">{{ item.lib_statut }}</span>
            <span v-if="item.statut == 2" class="text-success">{{ item.lib_statut }}</span>
            <span v-if="item.statut == 3" class="text-danger">{{ item.lib_statut }}</span>
            <span v-if="item.statut == 4" class="text-success">{{ item.lib_statut }}</span>
            <span v-if="item.statut == 5" class="text-dark">{{ item.lib_statut }}</span>
          </template>

          <template #item-actions="item">
              <div class="d-flex gap-1">
                <BButton 
                  v-if="permissions.some(perm => perm.show)" 
                  style="width: 15px; height: 15px;" 
                  variant="white" 
                  size="sm" 
                  class="d-flex text-primary justify-content-center align-items-center" 
                  @click="showDetailsModal(item.uuid)"
                >
                  <i class="fas fa-eye"></i>
                </BButton>

                 <!-- Bouton d'impression (prt) -->
                <BButton 
                  v-if="permissions.some(perm => perm.prt)" 
                  style="width: 15px; height: 15px;" 
                  variant="white" 
                  size="sm" 
                  class="d-flex text-primary justify-content-center align-items-center" 
                  @click="showTicket(item.uuid)"
                >
                  <i class="uil uil-print font-size-15"></i>
                </BButton>

                <!-- Bouton de modification (edit) -->
                <BButton 
                  v-if="permissions.some(perm => perm.edit)" 
                  style="width: 15px; height: 15px;" 
                  variant="white" 
                  size="sm" 
                  class="mr-1 fw-bold text-warning d-flex justify-content-center align-items-center" 
                  @click="rejet(item.uuid)" 
                  v-b-tooltip.hover.bottom="'rejeter'"
                >
                  <i class="uil uil-ban font-size-15 annuler"></i>
                </BButton>

                <!-- Bouton de suppression (del) -->
                <BButton 
                  v-if="permissions.some(perm => perm.del)" 
                  style="width: 15px; height: 15px;" 
                  variant="white" 
                  size="sm" 
                  class="px-2 text-danger d-flex justify-content-center align-items-center" 
                  @click="confirmDelete(item.uuid)"
                >
                  <i class="uil uil-trash-alt font-size-15"></i>
                </BButton>
                      
              </div>
          </template>

          <template #item-heure_fin="item">
              <div>
                  <span>----</span>
              </div>
          </template>

          <!-- Personnaliser le loading -->
          <template #loading>
              <ScaleLoader :loading="loading" style="margin: 10em 0;" :height="'30px'" :color="'#FE0201'" />
          </template>
          

          </EasyDataTable>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth.js";
import apiClient from "../api/intercepteur";
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import Swal from 'sweetalert2';

const authStore = useAuthStore();

const headers = [
  { text: "Date", value: "created_at", sortable: true },
  { text: "Nom & Prénoms", value: "visiteur" },
  { text: "CNI", value: "numero_piece"},
  { text: "Société", value: "entreprise"},
  { text: "Code visiteur", value: "code_visiteur" },
  { text: "Code visite", value: "code_visite" },
  { text: "Employé", value: "employe" },
  { text: "Visite", value: "lib_visite" },
  { text: "H entrée", value: "heure_entree" },
  { text: "Statut", value: "lib_statut" },
  { text: "H Sortie", value: "heure_fin" },
  { text: "Actions", value: "Actions" },
];
const loadingReset = ref(false)
const permissions = ref([])
const range = ref([5,10,15,20])
const items = ref([]);
const loading = ref(false);
const serverItemsLength = ref(0);
const searchField = ["visiteur", "entreprise", "numero_piece", "code_visite", "code_visiteur", "employe", "lib_visite"];
const searchValue = ref("");
const detailModal = ref(false)
const data = ref([])
const loadingDetail = ref(false)
const dateDebut = ref(null)
const dateFin = ref(null)
const serverOptions = ref({
  page: 1,
  rowsPerPage: 5,
  sortBy: 1,
  code_employe: '',
});


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
        page: serverOptions.value.page,
        limit: serverOptions.value.rowsPerPage,
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

// recherche coté server
const recherche = async () => {
  loading.value = true;
  try {
    const param = {
      page: 1,
      limit: 5,
      sort_type: null,
      code_employe: null,
      date_debut: null,
      date_fin: null
    }

    // Vérification si dateDebut et dateFin sont définis
    if (dateDebut.value != null && dateFin.value != null && searchValue.value == null) {
      param.sort_type = 3;
      param.date_debut = dateDebut.value;
      param.date_fin = dateFin.value;
      // alert(4); // Retirer si plus nécessaire pour le débogage
    } 
    // Vérification si searchValue est défini et pas dateDebut et dateFin
    else if (dateDebut.value == null && dateFin.value == null && searchValue.value != null) {
      // alert(2); // Retirer si plus nécessaire pour le débogage
      param.sort_type = 2;
      param.code_employe = searchValue.value;
    } 
    // Tous les critères sont définis
    else if (dateDebut.value && dateFin.value && searchValue.value) {
      param.sort_type = 4;
      param.date_debut = dateDebut.value;
      param.date_fin = dateFin.value;
      param.code_employe = searchValue.value;
      // alert(4); // Retirer si plus nécessaire pour le débogage
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
            
            console.log("Sup-----------: " + JSON.stringify(response.data));
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