// stores/editStore.js

import { defineStore } from 'pinia';

export const useEditStore = defineStore('editStore', {
  state: () => ({
    rowIndex: null,
    rowData: null,
    editMode: false,
    isVisible: false,
  }),
  actions: {
    // Méthode pour mettre à jour les données
    setData(index, data, editMode, isvisible) {
      this.rowIndex = index;
      this.rowData = data;
      this.editMode = editMode;
      this.isVisible = isvisible;
    },

    // Méthode pour supprimer les données
    deleteData() {
      this.rowIndex = null;
      this.rowData = null;
      this.editMode = false;
      this.isVisible  = false;
    },
  },
});
