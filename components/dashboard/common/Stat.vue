<script setup>
import { computed, watch, ref } from 'vue';

// Définir la prop stat
const stat =  defineModel('stat')

// Data
const datas = ref([
  { titre: "Total Visiteurs", valeur: stat.total },
  { titre: "Total Visites Effectuées", valeur: stat.recu },
  { titre: "Total Visites Rejetées", valeur: stat.rejeter },
]);

const dataStatic = [
  { imageUrl: '/images/stats/visiteurs.png', couleur: '#60F6FD' },
  { imageUrl: '/images/stats/surRDV.png', couleur: '#3BF2CB' },
  { imageUrl: '/images/stats/inopinees.png', couleur: '#EFC257' },
  { imageUrl: '/images/stats/rejetes.png', couleur: '#F1947F' },
];

// Watcher pour mettre à jour les datas lorsque props.stat change
watch(
  () => stat.value, // On surveille props.stat
  (newStat) => {
    if (newStat) {
      datas.value = [
        { titre: "Total Visiteurs", valeur: newStat.total },
        { titre: "Total Visites Effectuées", valeur: newStat.recu },
        { titre: "Total Visites Rejetées", valeur: newStat.rejeter },
      ];
    }
  },
  { immediate: true }
);

// Calculer la taille des colonnes
const getCol = computed(() => 12 / datas.value.length);
</script>

<template>
  <BRow>
    <BCol v-for="(data, index) in datas" :key="index" :md="getCol" :sm="getCol" :cols="getCol">
      <LayoutsCommonStatStatatistique 
        :titre="data.titre" 
        :valeur="data.valeur" 
        :imageUrl="dataStatic[index].imageUrl"
        :couleur="dataStatic[index].couleur"
      />
    </BCol>
  </BRow>
</template>
