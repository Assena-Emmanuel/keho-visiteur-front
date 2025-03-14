<script>
export default {
  components: {
  },
  data() {
    return {
      datas: [
        {titre: "Total Visiteurs", valeur: 123},
        {titre: "Total Visite Visites", valeur: 111},
        // {titre: "Sur RDV", valeur: 0},
        // {titre: "Inopinées", valeur: 0},
        {titre: "Totals Visites Rejetées", valeur: 12},
      ],
      dataStatic: [
        {imageUrl: '/images/stats/visiteurs.png', couleur: '#60F6FD'},
        {imageUrl: '/images/stats/surRDV.png', couleur: '#118214'},
        {imageUrl: '/images/stats/inopinees.png', couleur: '#EFC257'},
        {imageUrl: '/images/stats/rejetes.png', couleur: '#F1947F'},
      ],
      type: ['TV', 'AR', 'ARj']
    }

  },


  computed:{
    getCol(){
      return 12 / this.datas.length
    }
  }
}
</script>

<template>
  <BRow>
    <BCol v-for="(data, index) in datas" :key="index" :md="getCol" :sm="getCol" :cols="getCol">
      <LayoutsCommonStatStatatistique 
        :titre="data.titre" 
        :valeur="data.valeur" 
        :imageUrl="dataStatic[index].imageUrl"
        :couleur="dataStatic[index].couleur"
        :type="type[index]"
      />
    </BCol>
  </BRow>
</template>
