<template>
    <BRow>
      <BCol cols="12">
        <BCard no-body>
          <BCardBody>
            <!-- <BRow class="mb-3">
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
            </BRow> -->
            <div class="row g-3">
              <!-- Info visiteur -->

                <div class="card rounded-0 col-sm-6 col-md-6 p-0" style="box-shadow: none;">
                    <div class="card-header rounded-0 text-light fw-bold" style="background-color: #265FFB;">
                        VISITEUR
                    </div>
                    <div class="card-boby " style="background-color: #f6f6f6;">
                      <!-- <PulseLoader v-if="isLoading" :loading="isLoading" size="40px" color="#4fa94d" /> -->
                        <!-- <div v-if="isLoading" class="loading-ellipses">
                          <span class="dot text-primary">.</span>
                          <span class="dot text-success">.</span>
                          <span class="dot text-danger">.</span>
                        </div> -->
                        <ScaleLoader :loading="isLoading" style="margin: 10em 0;" :height="'30px'" :color="'#FE0201'" />
                        <div v-if="!isLoading" class="">
                            <div class="row">
                                <div style="height: 100%;" class="col-sm-6 col-md-6 containerimgVisiteur">
                                    <img src="/images/personne.png" width="100%" class="pt-2 pb-2 ps-2 imgVisiteur" height="260" alt="Image personne">
                                </div>
                                
                                 <div class="col-sm-6 col-md-6 pt-4 containerInfoVisiteur">
                                    <div class="d-flex justify-content-between  font-size-12 line">
                                        <span  class="texte">{{ visiteurs.users.nom }} {{ visiteurs.users.prenom }}</span>
                                    </div>

                                   <div class="d-flex justify-content-between  font-size-12 line">
                                        <span class="texte">{{ visiteurs.entreprise.libelle }}</span> 
                                    </div>

                                    <div class="d-flex justify-content-between  font-size-12 line">
                                        <span class="texte">{{ visiteurs.telephone }}</span>  
                                    </div>
                                    <div class="d-flex justify-content-between font-size-12 line">
                                        <span class="texte">{{ visiteurs.cni.libelle }}</span> 
                                    </div>
                                    <div class="d-flex justify-content-between  font-size-12 line">
                                        <span class="texte">{{ visiteurs.numCni }}</span> 
                                    </div>
                                    <!-- <div class="d-flex justify-content-between font-size-12 line">
                                        <span class="texte">{{ visiteurs.visite }}</span>
                                    </div> -->
                                </div> 
                                
                            </div>
                            <div class="row px-3 line mx-3">

                                <div class="col-6">
                                    <div class="texte row heure">
                                        <div class="col-12 col-sm-6 col-md-7">
                                            Heure arrivée
                                        </div>
                                        <div class="col-12 col-sm-6 col-md-5">{{ visiteurs.heure_entree }}</div>     
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="texte row text-end">
                                        <div class="col-12 col-sm-7 col-md-7">
                                            Heure départ
                                        </div>
                                        <div class="col-12 col-sm-5 col-md-5">
                                            <span> ---/--/---</span>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                            <div style="margin: 0 100px;" class=" line mt-3">
                                <div class="d-flex justify-content-between texte">
                                    <span>Numero Badge</span>
                                    <span>{{ visiteurs.visite }}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div v-if="!isLoading" class="row carte mt-5 mb-4">
                            <div class="col-6 d-flex justify-content-center">
                                <img  :src="`data:${visiteurs.cni.mime_type_p};base64,${visiteurs.cni.image_p}`" height="100" class="cni" alt="CNI recto">
                                <!-- <img src="/images/cni.png" height="100" class="cni" alt="CNI recto"> -->
                            </div>
                            <div class="col-6 d-flex justify-content-center">
                              <img :src="`data:${visiteurs.cni.mime_type_v};base64,${visiteurs.cni.image_v}`" height="100" class="cni" alt="CNI recto">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Visité -->
                <div class="card rounded-0 border-0 col-sm-6 col-md-6 p-0 visite" style="box-shadow: none; margin-left: 5px;">
                    <div class="card-header rounded-0 text-light fw-bold" style="background-color: #FAD400;">
                        HOTE
                    </div>
                    <div class="card-boby " style="background-color: #f6f6f6;">
                        <!-- <div v-if="isLoadingUser" class="loading-ellipses">
                          <span class="dot text-primary">.</span>
                          <span class="dot text-success">.</span>
                          <span class="dot text-danger">.</span>
                        </div> -->
                        <ScaleLoader :loading="isLoadingUser" style="margin: 10em 0;" :height="'30px'" :color="'#FE0201'" />
                        <div v-if="!isLoadingUser" class="">
                            <div class="row ">
                                <div style="height: 100%;" class="col-sm-6 col-md-6 containerimgVisiteur">
                                    <img :src="`data:${employe.mime_type};base64,${employe.image}`" width="100%" class="pt-2 pb-2 ps-2 imgVisiteur" height="260" alt="Image personne">
                                </div>
                                
                                <div class="col-sm-6 col-md-6 pt-4 containerInfoVisiteur">
                                    <div class="d-flex justify-content-between  font-size-12 line">
                                        <span  class="texte">Code visite</span>
                                        <span  class="texte">{{ employe.codeVisite }}</span>
                                    </div>

                                    <div class="d-flex justify-content-between  font-size-12 line">
                                        <span class="texte">{{ (employe.nomPrenom).toUpperCase() }} </span>
                                    </div>

                                    <div class="d-flex justify-content-between font-size-12 line">
                                        <span  class="texte">Site</span>
                                        <span  class="texte">Abidjan-sud</span>
                                    </div>

                                    <div class="d-flex justify-content-between  font-size-12 line">
                                        <span class="texte">{{ employe.departement }}</span>
                                    </div>

                                    <div class="d-flex justify-content-between  font-size-12 line">
                                        <span class="texte">{{ employe.service }}</span>
                                    </div>

                                    <div class="d-flex justify-content-between  font-size-12 line">
                                        <span  class="texte">Fixe</span>
                                        <span  class="texte">22 22 33 33 44</span>
                                    </div>

                                </div>
                                
                            </div>
                            <div class="d-flex justify-content-between texte line mx-2">
                                <span>Heure de fin</span>
                                <span>---/--/---</span>
                            </div>
                            <div class="mx-5 mb-3 mt-3 planning">
                                <button class="btn btn-outline-dark fw-bold w-100 rounded-0" @click="onPlanning">
                                    <div class="row">
                                        <div class="col-5 text-start"><i class="uil uil-schedule"></i></div>
                                    <div class="col-7 text-start">Planning</div>
                                    </div>
                                </button>
                            </div>
                            <div class="d-flex align-items-center justify-content-evenly mb-3 impression mx-4">
                                <div class="">
                                    <button class="btn btn-success w-100 fw-bold" style="background-color: #6BFA88;" @click="showTicket"><i class="uil uil-print"></i>IMPRIMER LE TICKET</button>
                                </div>
                                <div class="">
                                    <span class="border border-secondary" style="padding: 9px;"><strong style="color: red;">{{ visiteurs.visiteur.length }}</strong></span>
                                </div>

                            </div>
                        </div>
                      
                    </div>

                </div>
            </div>
        
        </BCardBody>
        </BCard>
      </BCol>
    </BRow>
    
    <!-- Ticket -->
    <BModal 
        :modelValue="isOpen" 
        @hide="hide"
        title-class="font-18" 
        hide-footer
        no-close-on-backdrop
        class=""
        size="md"
    >
    <div class="card shadow-none">
      <div class=" ticket">
        <div class="d-flex justify-content-center mt-4"><img src="/images/total-removebg.png" alt="" width="100"></div>
        <div class="text-center">
          <span class="texte" style="font-weight: bolder; font-size: 3em;">VTR-0224-0004</span>
          <p><h5 class="texte">Bienvenue chez nous</h5></p>
          <div class="mt-2">
            <div class="row text-center">
              <div class="col-5 text-end"><strong class="texte element">Code visiteur:</strong></div>
              <div class="col-7 text-start"><span class="code">KA2410-17-05</span></div>
            </div>
            <div class="row">
              <div class="col-5 text-end"><strong class="texte element">Service visité:</strong></div>
              <div class="col-7 text-start"><span class="service">COMMERCIAL</span></div>
            </div>
            <div class="row">
              <div class="col-5 text-end"><strong class="texte element">Nom visiteur:</strong></div>
              <div class="col-7 text-start"><span class="nom">Mme ROKIA SYLLA</span></div>
            </div>
            
          </div>

        </div>
        <div class="d-flex justify-content-end" style="padding: 25px 20px 0 20px;">
          <span><small>17/10/2024 09:15:05</small></span>
        </div>
      </div>
      
    </div>
    <div class="d-flex justify-content-between align-items-center">
        <button class="btn text-danger" @click="hide">Annuler</button>
        <button class="btn btn-success" @click="imprimerTicket(codeVisiteur)">
          <i v-if="!loadingImpression" class="uil uil-print"></i>
          <i v-else class="fas fa-spinner fa-spin"></i> 
        </button>
      </div>
  </BModal>

  
</template>


<script setup>
  import { ref, onMounted } from 'vue';
  import apiClient from '../api/intercepteur';
  import { useAuthStore } from '~/stores/auth.js';
  
  import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

  // Props
  const props = defineProps({
    uuid: String,
  });

  const codeVisiteur = ref("")

  // Variables réactives
  const isOpen = ref(false);
  const visiteurs = ref({
    users: {},
    telephone: "",
    numCni:"",
    cni: {},
    entreprise:{},
    heure_entree: "",
    visite: "",
    visiteur:[]

  });
  const loadingImpression = ref(false)


  const employe = ref({
    nomPrenom:"",
    codeVisite: "",
    departement:"",
    service:"",
    telephone: "",
    image:"",
    mime_type:""
  })

  const isLoading = ref(false);
  const isLoadingUser = ref(false);

  // Store
  const authStore = useAuthStore();

  // Méthodes
  const showDetailsModal = () => {
    // Assurez-vous de manipuler la bonne variable
    isOpen.value = !isOpen.value;
  };

  const hide = () => {
    isOpen.value = false;
  };

  const showTicket = () => {
    isOpen.value = true;
  };


  const userData = async () => {
    try {
      isLoadingUser.value = true;
        const response = await apiClient.get(`/user/${authStore.user.uuid}`, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`,
          },
        });

        if(!response.data.error){
          const data = response.data.data
          employe.value.nomPrenom = data.nom+" "+data.prenom
          employe.value.departement =data.visite.departement.libelle
          employe.value.service = data.visite.service.libelle
          employe.value.telephone = data.telephone1
          employe.value.codeVisite = data.visitecode_visite
          employe.value.image = data.image
          employe.value.mime_type = data.mime_type

        }

      }catch (error) {
        console.error('Erreur lors de la recuperation des infos: ', error);

      }finally{
        isLoadingUser.value = false

      }
  }

  const onPlanning = () =>{
    return navigateTo({ path: "/agenda/agenda" });
  }

  const fetchVisitorData = async () => {
    if (props.uuid) {
      
      try {
        isLoading.value = true;
        const response = await apiClient.get(`/fvisites/${props.uuid}`, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`,
          },
        });

        if (!response.data.error) {
          codeVisiteur.value = response.data.data.fvisite.code_fvisite
          if (!response.data.data.fvisite.delegation) {
            const data = response.data.data;
            // Remplissage des données dans la structure réactive `visiteurs`
            visiteurs.value = {
              visite: data.fvisite.code_fvisite,
              users: {
                id: data.visiteurs[0].visiteur.users.id,
                nom: data.visiteurs[0].visiteur.users.nom,
                prenom: data.visiteurs[0].visiteur.users.prenom,
                email: data.visiteurs[0].visiteur.users.email,
              },
              telephone: data.visiteurs[0].visiteur.users.telephone2,
              numCni: data.visiteurs[0].visiteur.numero_piece,
              cni: {
                image_p: data.visiteurs[0].visiteur.image_p,
                image_v: data.visiteurs[0].visiteur.image_v,
                mime_type_p: data.visiteurs[0].visiteur.mime_type_p,
                mime_type_v: data.visiteurs[0].visiteur.mime_type_v,
                libelle: data.visiteurs[0].visiteur.type_piece.libelle, 
              },
              entreprise: {
                id: data.visiteurs[0].visiteur.entreprise.id,
                libelle: data.visiteurs[0].visiteur.entreprise.libelle,
                code: data.visiteurs[0].visiteur.entreprise.code,
              },
              heure_entree: data.fvisite.heure_entree,
              visiteur: data.visiteurs
            };
          }else{
            console.error("En delegation "+JSON.stringify(response.data.data))

          }

        } else {
          alert('Erreur dans la récupération des données');
        }
      } catch (error) {
        console.error('Error fetching visitor data: ', error);
        alert('Une erreur est survenue lors de la récupération des informations');
      }finally{
        isLoading.value = false
      }
    } else {
      alert('UUID manquant');
    }
  };

  // Appeler la fonction au moment du montage du composant
  onMounted(() => {
    fetchVisitorData();
    userData()
  });

  const imprimerTicket = async (codeV) => {
    loadingImpression.value = true
    try{
      if(codeV){
        window.open(`https://visitors.kehogroupe-ci.com/api/fvisites/print/${codeV}`, '_blank');
      }
    }catch(e){
      console.log("Erreur lors de l'impression: "+e)

    }finally{
      loadingImpression.value = false
    }
    
};




</script>




<style>
    .line{
    border-bottom: 1px solid #ffffff;
    margin-bottom: 10px;
    }

    .texte{
        font-size: 20px;
    }

    @media (max-width: 768px) { /* Pour les tablettes */

    }
  
    @media (max-width: 576px) { /* Pour les téléphones */
        
        
    }

    /* Style par défaut */
.card-boby {
  background-color: #f6f6f6;
}

.containerimgVisiteur img {
  width: 100%;
  height: 260px;
}
.containerInfoVisiteur div{
    margin-right: 10px;
}
.containerInfoVisiteur {
  padding-top: 1rem;
}

.texte {
  font-size: 12px;
}

.impression{
    margin-top: 7.4em;
  }

/* Media Query pour petits écrans (mobile) */
@media (max-width: 576px) {
  .containerimgVisiteur, 
  .containerInfoVisiteur {
    text-align: center;
    padding: 1rem;
  }

  .containerimgVisiteur img {
    width: 100%;
    height: auto;
  }

  .card-boby {
    padding: 1rem;
  }

  .d-flex {
    flex-direction: column;
    align-items: center;
  }

  .line {
    margin-bottom: 1rem;
  }
  .cni{
    width: 150px;
  }
}

/* Media Query pour écrans moyens (tablettes et plus grandes tailles) */
@media (min-width: 577px) and (max-width: 991px) {
  .containerimgVisiteur img {
    height: 220px;

  }

  .containerInfoVisiteur {
    padding-top: 2rem;
  }

  .texte {
    font-size: 14px;
  }

  .cni{
    width: 150px;
  }

  .impression{
    margin-top: 8.6em;
  }

  .imgVisiteur{
        width: 100%;
        padding-right: 6px;
    }

    .containerimgVisiteur{
        display: flex;
        justify-content: center;
    }

    .containerInfoVisiteur div{
        margin: 0 10px;
    }

    .containerInfoVisiteur div span{
        padding-top: 5px;
    }


}

/* Media Query pour grands écrans (ordinateur de bureau) */
@media (min-width: 992px) {
  .containerimgVisiteur img {
    height: 260px;
  }

  .containerInfoVisiteur {
    padding-top: 2.5rem;
  }

  .texte {
    font-size: 16px;
  }

  .cni{
    width: 200px;
  }
  .visite{
    width: 590px
  }

}

/* Media Query pour écrans de 820px à 1180px */
@media (min-width: 820px) and (max-width: 1180px) {
  .containerimgVisiteur img {
    height: 260px; 
    
  }

  .containerInfoVisiteur {
    padding-top: 2rem;  /* Ajouter du padding au-dessus du conteneur des informations */
  }

  .texte {
    font-size: 14px;  /* Augmenter la taille de la police pour les écrans de taille moyenne */
  }

  .card-boby {
    padding: 0.1rem;  /* Ajouter du padding à la carte */
  }

  .d-flex {
    flex-direction: row;  /* Garder une disposition en ligne (row) pour les colonnes */
  }

  /* Exemple de réorganisation des éléments (si nécessaire) */
  .line {
    margin-bottom: 1rem;  /* Espacement entre les lignes */
  }

  .cni{
    width: 160px;
  }

  .visite{
    width: 360px
  }
  
}



</style>

<style scoped>
.ticket {
    background-image: linear-gradient(rgba(255, 254, 254, 0.97), rgba(255, 255, 255, 0.97)), url("/images/total-removebg.png");
    background-repeat: no-repeat;
    background-size: contain;
    /* background-position: center; */
    block-size: 100%;
    height: 55vh;
    inline-size: 100%;
  }

  small{
    color: #ccc;
  }
  .texte{
    font-family: Arial, Helvetica, sans-serif;
  }

  .code{
    font-size: 2em; font-weight: bold; color: red;
  }
  .nom{
    font-size: 2em; font-weight: bold; color: blue;
  }
  .service{
    font-size: 1.9em; font-weight: bold; color: green;
  }

  .element{
      font-size: 21px;
    }

  @media (max-width: 576px) {
    .element{
      font-size: 15px;
    }
    .code{
      font-size: 1.5em; font-weight: bold; color: red;
    }
  .nom{
      font-size: 1.5em; font-weight: bold; color: blue;
    }
  
 
  .ticket {
    height: 45vh;
  }
}


</style>