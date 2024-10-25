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
                    <img :src="imageUrl">
                </div>
                <div class="text-end">
                    <p class="text-muted mb-0">{{ titre }}</p>
                    <h4 class=" mt-1">{{ valeur }}</h4>
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
</style>
