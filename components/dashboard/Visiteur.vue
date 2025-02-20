<template>
  <DashboardCommonStat />
  

  <!-- Modal détail -->
  <BModal v-if="detailData.visiteurs" v-model="detailModal" hide-footer title="Détails des Visites" >
    <div class="d-flex justify-content-end">
        <BButton variant="primary" size="sm" style="padding: 2px;">
            <i class="uil uil-print font-size-15 annuler"></i> Imprimer
        </BButton>
    </div>
    <div v-for="item in detailData.visiteurs" :key="item['Code visite']">
      <div class="text-center"><span class="h4">M. {{  }}</span> <span v-if="item.Delegué" class="border border-primary rounded px-2 text-primary">Délégué</span>
        <div class="bg-secondary text-center text-light mt-1">En délégation</div>
      </div>
      <hr class="text-secondary">
      <div class="d-flex justify-content-between my-3">
          <span class="border border-primary rounded px-2 ms-2 text-primary fw-bold"><span>{{ item.Date }}</span></span>
          <span class="border border-success rounded px-2 ms-2 text-success">visite: <span class="fw-bold">Terminé</span></span>

      </div>
      <div class="row">
          
        <div class="col col-md-6">
          <p><strong>Téléphone:</strong> {{ item.Telephone }}</p>
        </div>
        <div class="col col-md-6">
          <p><strong>Société:</strong> {{ item.Société }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col col-md-6">
          <p><strong>E-mail:</strong> {{ item.Email }}</p>
        </div>
        <div class="col col-md-6">
          <p><strong>Code visiteur:</strong> {{ item['Code visiteur'] }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col col-md-6">
          <p><strong>Type pièce:</strong> {{ item.TypePiece }}</p>
        </div>
        <div class="col col-md-6">
          <p><strong>Num pièce:</strong> {{ item.CNI }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col col-md-6">
          <p><strong>Employé:</strong> {{ item.Employé }}</p>
        </div>
        <div class="col col-md-6">
          <p><strong>Code:</strong> {{ item["Code visite"] }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col col-md-6">
          <p><strong>Heure d'entrée:</strong> {{ item['H entrée'] }}</p>
        </div>
        <div class="col col-md-6">
          <p><strong>Heure de Sortie:</strong> {{ item["H Sortie"] }}</p>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-evenly mb-3">
      <div class="piece" align="center" @click="showImg('rectoVisible')">
        <div>Recto</div>
        <img :src="recto" alt="recto" width="200" height="90" />
      </div>
      <VueEasyLightbox
            :visible="rectoVisible"
            :imgs="recto"
            @hide="onHide('rectoVisible')"
        />
      
      <div>
        <div class="piece" align="center" @click="showImg('versoVisible')">
          <div>Verso</div>
          <img  :src="verso" width="200" height="90" alt="verso" />
        </div>
        <VueEasyLightbox
            :visible="versoVisible"
            :imgs="verso"
            @hide="onHide('versoVisible')"
          />
          <!-- :src="`data:${detailData.visiteurs[0].visiteur.mime_type_v};base64,${detailData.visiteurs[0].visiteur.image_p}`" -->
      </div>
    </div>

    <div class="d-flex justify-content-end" v-if="detailData.enDelegation">
      <BPagination
        v-model="page"
        :total-rows="detailData.visiteurs.length"
        :per-page="itemsPerPage"
        aria-controls="modal-pagination"
      ></BPagination>
    </div>
    
  </BModal>



  <div class="mb-2"><span>Visites enregistrées</span></div>
  <div>
    <!-- Tableau des visiteurs -->
    <BRow>
      <BCol cols="12">
        <BCard no-body>
          <div v-if="loading" class="loading-ellipses">
            <span class="dot text-success">.</span>
            <span class="dot text-primary">.</span>
            <span class="dot text-danger">.</span>
          </div>
          <BCardBody v-if="!loading && data">
            <BRow class="mb-3">
              <BCol sm="12" md="2">
                Debut
                <BFormInput type="datetime-local" v-model="dateDebut" class="border border-secondary":options="listVisiteur" size="sm" />
              </BCol>
              <BCol sm="12" md="2">
                Fin
                <BFormInput type="datetime-local" v-model="dateFin" class="border border-secondary":options="listVisiteur" size="sm" />
              </BCol>
              <BCol sm="12" md="5">
                <BFormSelect v-model="visiteurSelectionner" class="mt-4 border border-secondary":options="listVisiteur" size="sm" />
              </BCol>
              <BCol sm="12" md="3">
                <div class="input-group mt-4 border border-secondary rounded-1">
                    <span class="input-group-text">
                        <i class="fas fa-search font-size-10"></i>
                    </span>
                    <BFormInput v-model="filter" type="search" id="input-small" size="sm"  placeholder="Rechercher..." />
                </div>
              </BCol>
            </BRow>
            <div class="table-responsive mb-0">
            
              <BTable 
                :items="filteredData" 
                :fields="fields" 
                responsive="sm" 
                :per-page="perPage" 
                :current-page="currentPage" 
                v-model:sort-by.sync="sortBy" 
                v-model:sort-desc.sync="sortDesc" 
                @filtered="onFiltered" 
              >
              :
                <template #cell(Statut)="row">
                  <span v-if="row.item.Statut" class="badge rounded-pill text-bg-success">activé</span>
                  <span v-if="!row.item.Statut" class="badge rounded-pill text-bg-danger">Désactivé</span>
                </template>

                <template #cell(Actions)="row">
                    <div class="d-flex gap-1">
                        <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="d-flex text-primary justify-content-center align-items-center" @click="showDetailsModal(row.item)">
                          <i class="fas fa-eye"></i>
                        </BButton>

                        <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="d-flex text-primary justify-content-center align-items-center" @click="showTicket(row.item)">
                          <i class="uil uil-print font-size-15"></i>
                        </BButton>

                        <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="mr-1 fw-bold text-warning d-flex justify-content-center align-items-center" @click="handleEdit(row.index, data)" v-b-tooltip.hover.bottom="'rejeter'">
                          <i class="uil uil-ban font-size-15 annuler"></i>
                        </BButton>

                        <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="px-2 text-danger d-flex justify-content-center align-items-center" @click="confirmDelete(row.item.Code)">
                          <i class="uil uil-trash-alt font-size-15"></i>
                        </BButton>
                        
                    </div>
                </template>

              </BTable>
            </div>
            <hr class="border-1 border-secondary">
            <BRow>
              <BCol>
                <div class="dataTables_paginate paging_simple_numbers d-flex justify-content-between">
                  <div id="tickets-table_length" class="dataTables_length">
                    <BCol sm="12" md="6" class="">
                        <div id="tickets-table_length" class="dataTables_length">
                            <label class="d-inline-flex align-items-center">
                            Afficher&nbsp;
                            <BFormSelect class="border border-secondary" v-model="perPage" size="sm" :options="pageOptions"></BFormSelect>éléments&nbsp;
                            
                            </label>
                        </div>
                    </BCol>
                  </div>
                  <ul class="pagination pagination-rounded mb-0">
                    <BPagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" />
                  </ul>
                </div>
              </BCol>
            </BRow>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>
</div>

<!-- Affiche ticket -->

</template>
<script>
import apiClient from '../api/intercepteur';
import { useAuthStore } from "~/stores/auth.js";
import { PulseLoader } from '@saeris/vue-spinners'


export default {
components: {
  PulseLoader
},
setup(){
  const authStore = useAuthStore()

  return{
    authStore
  }
},
  data() {
      return {
        rectoVisible : false,
        versoVisible : false,
        isOpen: false,
        imgs : [
          "/images/bg-qrcode.png",
          "/images/pdf.png",
          "/images/pdf.png",
        ],
        detailData:{
          enDelegation:false,
          visiteurs:[]
        },
        page: 1,
        itemsPerPage: 1,
        loading: false,
        detailModal: false,
        isActive: 'Jour' ,
        verso:"",
        recto:"",
        dateDebut: '',
        dateFin: '',
        visiteurSelectionner: null,
        listVisiteur : [
        {value: null, text: 'Liste Employes'},
        {value: '1', text: 'YAO EMMANUEL (ADE)'},
        {value: '2', text: 'ABOU AZIZ (VST-002)'},
        ],

      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20],
      filter: "", 
      sortBy: "age",
      sortDesc: false,
      
      fields: [
          {key:"created_at", label: "Date"},
          {key:"visiteur", label: "Nom & Prénoms"},
          {key:"numero_piece",label: "CNI"},
          {key:"entreprise", label: "Société"},
          {key:"code_visiteur", label: "Code visiteur"},
          {key:"code_visite", label: "Code visite"},
          {key:"employe", label: "Employé"},
          {key:"lib_visite", label: "Visite"},
          {key:"heure_entree", label: "H entrée"},
          {key:"lib_statut", label: "statut"},
          {key:"heure_fin", label: "H Sortie"},
          {key: "Actions"},
      ],
      title: null,
      data: [],

  };
},

  methods: {
    showTicket(row){
      return navigateTo({
        path: `/visiteur/visiteurVisite/${row.uuid}`, // Envoie le paramètre dans l'URL
      });

    },

    hide(){
      this.isOpen = false
    }, 

    showImg(type){
      // this.indexRef = index;
      this[type] = true;
      // console.log("show")
    },

    onHide(type){
      this[type] = false;
      // console.log(`recto: ${this.rectoVisible} et verso: ${this.versoVisible}`)
    },
      onFiltered(filteredItems) {
        // Update totalRows and reset to first page after filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },

      handleEdit(index, data) {
        this.$swal.fire({
        text: "Voulez-vous rejeter?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non',
        reverseButtons: true // Inverser l'ordre des boutons
      }).then((result) => {
        if (result.isConfirmed) {
          // Logique pour supprimer l'élément ici
          this.deleteItem(code);

          this.$swal.fire(
            'Rejeter!',
            'Visite rejetée',
            'success'
          );
        }
      });
      },

      async showDetailsModal(row){
        
        if(row.uuid){
          const response = await apiClient.get(`/fvisites/${row.uuid}`, {
            headers: {
              'Authorization': `Bearer ${this.authStore.token}`,
            },
          })
          if(!response.data.error){
            this.detailData.visiteurs = response.data.data.visiteurs
            console.log("Donnée----------------------------: "+JSON.stringify(this.detailData.visiteurs))
            this.verso = `data:${this.detailData.visiteurs[0].visiteur.mime_type_v};base64,${this.detailData.visiteurs[0].visiteur.image_v}`
            this.recto = `data:${this.detailData.visiteurs[0].visiteur.mime_type_p};base64,${this.detailData.visiteurs[0].visiteur.image_p}`
            // detailData.visiteurs[0].visiteur.image_p
            this.detailModal = !this.detailModal
          }else{
            console.error("Erreur fiche visite :",response.data.message)
          }

        }else{
          console.error("----------- aucune donnée ------------")

        }
      },

      confirmDelete(code) {
      this.$swal.fire({
        title: 'Êtes-vous sûr?',
        text: "Cette action est irréversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non',
        reverseButtons: true // Inverser l'ordre des boutons
      }).then((result) => {
        if (result.isConfirmed) {
          // Logique pour supprimer l'élément ici
          this.deleteItem(code);

          this.$swal.fire(
            'Supprimé!',
            'Votre élément a été supprimé.',
            'success'
          );
        }
      });
    },

  },
  computed: {
  /**
   * Dynamically generate filterOn based on fields
   */
  filterOn() {
    // Return an array of keys from fields
    return this.fields.map(field => field.key);
  },

  /**
   * Total no. of records
   */
  rows() {
    return this.filteredData.length;
  },

  /**
   * Filtered data based on search input
   */
  filteredData() {
    if (this.filter) {
      return this.data.filter(item =>
        this.filterOn.some(key =>
          String(item[key]).toLowerCase().includes(this.filter.toLowerCase())
        )
      );
    }
    return this.data;
  },
  paginatedData() {
    const start = (this.page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.data.slice(start, end);
  }
},
async mounted() {
  this.totalRows = this.data.length;

  // recuperer les visiteurs 
  this.loading = true
  const params = {
    page: 1,
    limit: 5,
    sort_type: 1,
  };
  const response = await apiClient.get("/fvisites/lvisite", {
    params,
    headers: {
      'Authorization': `Bearer ${this.authStore.token}`,
    }
  });

  if(!response.data.error){
    // console.log("Mes Visiteur: ------------------------------ "+JSON.stringify(response.data.data.data))
    this.data = response.data.data.data

  }

  // const respUser = await apiClient.get("/user", {
  //   headers: {
  //     'Authorization': `Bearer ${this.authStore.token}`,
  //   }
  // });
  // if(!respUser.data.error){
  //   respUser.data.data.map(user =>{
  //     lis
  //   })
  //   console.log("----------------"+JSON.stringify(respUser.data.data))
  // }

  this.loading = false
},
}
</script>

<style>
.activeVisiteur {
  background-color: #007bff; 
  color: white;
}
.largeur{
  width: 90px;
  padding: 0;
}
.btn-inactive {
  border: 1px solid gray; /* Bordure grise */
  background-color: white; /* Fond blanc */
  color: gray; /* Couleur du texte */
}
</style>

<style scoped>
.image-container {
display: flex;           /* Utilisation de Flexbox */
flex-wrap: wrap;          /* Permet aux images de se replier si nécessaire */
justify-content: center;  /* Aligne les images à gauche */
}

.pic {
margin-right: 10px; /* Espacement entre les images */
margin-bottom: 10px; /* Espacement vertical entre les images */
}

img {
max-width: 100%; /* S'assure que les images ne débordent pas */
height: auto;
}

.piece:hover {
cursor: pointer;
}


/* spinner */
.loading-ellipses {
  font-size: 40px; /* Taille augmentée */
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
/* end spinner */


</style>

