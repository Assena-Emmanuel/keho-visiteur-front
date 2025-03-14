<script>
export default {
  props: {
    titre: String,
    valeur: Number,
    imageUrl: String,
    couleur: String,
    type: String
  },

  data() {
    return {
      coul: "rgba(255, 255, 255, 1)" // Valeur par défaut
    };
  },

  watch: {
    // Surveille les changements de la prop `type`
    type(newVal) {
      if (newVal === 'TV') {
        this.coul = 'rgba(54, 162, 235, 1)'; // Si type est TV, couleur bleue
      } else if (newVal === 'AR') {
        this.coul = 'rgba(75, 192, 192, 1)'; // Exemple pour un autre type
      } else if (newVal === 'ARj') {
        this.coul = 'rgba(255, 99, 132, 1)'; // Exemple pour un autre type
      }
    }
  }
};
</script>


<template>
    <BCard no-body style="height: 80px;">
      <BCardBody style="padding: 10px">
        <!-- TV: total visiteurs -->
        <div class="d-flex justify-content-between align-items-center" v-if="type === 'TV'">
          <div class="circle-container" :style="{ backgroundColor: couleur }">
            <img :src="imageUrl" class="responsive-image" />
          </div>
          <div class="text-end">
            <p class="text-muted mb-0 title-text" style="font-size: 13px;">{{ titre }}:  
              <span style="font-size:30px; font-weight:bold">{{ valeur }}</span>
            </p>
          </div>
        </div>
  
        <!-- AR: Accepté Rejeté -->
        <div class="d-flex justify-content-between align-items-center" v-else-if="type === 'AR'">
          <div class="d-flex justify-content-between gap-2">
            <div class="circle-container" :style="{ backgroundColor: couleur }">
              <img :src="imageUrl" class="responsive-image" />
            </div>
            <div>
              <p class="text-muted mb-0 title-text">
                <span class="d-none d-sm-inline" style="font-size: 13px;">Visites acceptées</span>
                <span class="text-success" style="font-size:18px; font-weight:bold"> 111 </span>
              </p>
            </div>
          </div>
  
          <div class="d-flex justify-content-between gap-2">
            <div class="circle-container" style="background-color: #F1947F">
              <img src="/images/stats/rejetes.png" class="responsive-image" />
            </div>
  
            <div>
              <p class="text-muted mb-0 title-text">
                <span class="d-none d-sm-inline" style="font-size: 13px;">Visites rejetées</span>
                <span class="text-danger" style="font-size:18px; font-weight:bold"> 12</span>
              </p>
            </div>
          </div>
        </div>
  
        <!-- Total visite jour -->
        <div v-else-if="type === 'ARj'">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-between gap-2">
              <div class="circle-container" :style="{ backgroundColor: couleur }">
                <img :src="imageUrl" class="responsive-image" />
              </div>
              <div>
                <p class="text-muted mb-0 title-text">
                  <span class="d-none d-sm-inline" style="font-size: 13px;">Visites acceptées</span>
                  <span class="text-success" style="font-size:18px; font-weight:bold"> 09 </span>
                </p>
              </div>
            </div>
  
            <div class="d-flex justify-content-between gap-2">
              <div class="circle-container" style="background-color: #F1947F">
                <img src="/images/stats/rejetes.png" class="responsive-image" />
              </div>
  
              <div>
                <p class="text-muted mb-0 title-text">
                  <span class="d-none d-sm-inline" style="font-size: 13px;">Visites rejetées</span>
                  <span class="text-danger" style="font-size:18px; font-weight:bold"> 01</span>
                </p>
              </div>
            </div>
          </div>
          <div class="text-center" style="margin-top: -8px;">
            <small class="text-secondary">Journalière</small>
          </div>
        </div>
      </BCardBody>
    </BCard>
  </template>
  
<style>
.circle-container {
    width: 33px; /* Largeur de la div */
    height: 33px; /* Hauteur de la div */
    border-radius: 50%; /* Rendre la div circulaire */
    display: flex;
    align-items: center; /* Centrer verticalement */
    justify-content: center; /* Centrer horizontalement */
    overflow: hidden; /* Cacher les débordements */
}
.circle-container1 {
    width: 30px; /* Largeur de la div */
    height: 30px; /* Hauteur de la div */
    border-radius: 50%; /* Rendre la div circulaire */
    display: flex;
    align-items: center; /* Centrer verticalement */
    justify-content: center; /* Centrer horizontalement */
    overflow: hidden; /* Cacher les débordements */
}

.circle-container img {
    width: 50%; /* Prendre toute la largeur */
    height: auto; /* Conserver le ratio d'aspect */
}

/* Media queries pour tablette et mobile */
@media (max-width: 768px) { /* Ajustements pour les tablettes */
    .circle-container {
        width: 40px; /* Réduire la taille de la div */
        height: 40px; /* Réduire la taille de la div */
    }
    
    .circle-container img {
        width: 80%; /* Ajuster la taille de l'image */
    }

    .title-text {
        font-size: 0.8rem; /* Réduire la taille du titre */
    }

    .value-text {
        font-size: 1rem; /* Réduire la taille de la valeur */
    }
}

@media (max-width: 480px) { /* Ajustements pour les mobiles */
    .circle-container {
        width: 30px; /* Réduire encore la taille de la div */
        height: 30px; /* Réduire encore la taille de la div */
    }
    
    .circle-container img {
        width: 90%; /* Ajuster la taille de l'image */
    }

    .title-text {
        font-size: 0.6rem; /* Réduire davantage la taille du titre */
    }

    .value-text {
        font-size: 0.7rem; /* Réduire davantage la taille de la valeur */
    }
}
</style>
