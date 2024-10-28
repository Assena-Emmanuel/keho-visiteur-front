<script>
export default {
  props: {
    titre: String,
    valeur: Number,
    imageUrl: String,
    couleur: String
  }
}
</script>

<template>
    <BCard no-body style="height: 80px;">
        <BCardBody style="padding: 10px;"> 
            <div class="d-flex justify-content-between align-items-center">
                <div class="circle-container" :style="{ backgroundColor: couleur }">
                    <img :src="imageUrl" class="responsive-image">
                </div>
                <div class="text-end">
                    <p class="text-muted mb-0 title-text">{{ titre }}</p>
                    <h4 class="mt-1 value-text">{{ valeur }}</h4>
                </div>
            </div>
        </BCardBody>
</BCard>

</template>
<style>
.circle-container {
    width: 50px; /* Largeur de la div */
    height: 50px; /* Hauteur de la div */
    border-radius: 50%; /* Rendre la div circulaire */
    display: flex;
    align-items: center; /* Centrer verticalement */
    justify-content: center; /* Centrer horizontalement */
    overflow: hidden; /* Cacher les débordements */
}

.circle-container img {
    width: 70%; /* Prendre toute la largeur */
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
        font-size: 0.7rem; /* Réduire davantage la taille du titre */
    }

    .value-text {
        font-size: 0.9rem; /* Réduire davantage la taille de la valeur */
    }
}
</style>
