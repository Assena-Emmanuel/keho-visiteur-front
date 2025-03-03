// stores/editStore.js

import { defineStore } from 'pinia';

export const useGestionStore = defineStore('gestion', {
  state: () => ({
    departements: [],
    services: [],
    categories: [],
    agences: [],
    menus: [],
    actions: [],
    users: [],
    profils: [],

  }),
  actions: {
    // Méthode pour mettre à jour les données
    setDepartements(departements) {
      this.departements = departements;
    },
    setServices(services) {
      this.services = services;
    },
    setCategories(categories) {
      this.categories = categories;
    },
    setAgences(agences) {
      this.agences = agences;
    },
    setMenus(menus) {
      this.menus = menus;
    },
    setProfils(profils) {
      this.profils = profils;
    },
    setActions(actions) {
      this.actions = actions;
    },
    setUsers(user) {
        this.users = user;
      },

    // Méthode pour supprimer les données
    deleteData() {
      this.users = [];
    },
  },
});
