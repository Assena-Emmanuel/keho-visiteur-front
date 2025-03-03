

import { defineStore } from 'pinia';

export const useEditStore = defineStore('detailStore', {
  state: () => ({
    index: null,
    data: null,
    typeForm:null,
    isVisible: false,
    
  }),
  actions: {
    // Méthode pour mettre à jour les données
    setData(index, data, isvisible) {
      this.index = index;
      this.data = data;
      this.isVisible = isvisible;
    },

    // Méthode pour supprimer les données
    deleteData() {
      this.index = null;
      this.data = null;
      this.isVisible  = false;
    },
  },
});
