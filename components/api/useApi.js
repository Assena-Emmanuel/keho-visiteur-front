// useApi.js
import apiClient from '~/components/api/intercepteur'; // Assurez-vous d'importer le client API

export const useApi = (token) => {
  // Fonction pour récupérer tous les éléments (GET)
  const getAll = async (endpoint) => {
    try {
      const response = await apiClient.get(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`, // Utilisation du token d'authentification
        }
      });

      if (response.data.error) {
        throw new Error(response.data.message); // Si l'API retourne une erreur
      }

      return response.data; // Retourne les données
    } catch (error) {
      console.error('Erreur lors de la récupération des éléments:', error);
      throw error; // Propager l'erreur si besoin
    }
  };

  // Fonction pour supprimer un élément (DELETE)
  const deleteItem = async (endpoint, id) => {
    try {
      const response = await apiClient.delete(`${endpoint}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Utilisation du token d'authentification
        }
      });

      if (response.data.error) {
        throw new Error(response.data.message); // Si l'API retourne une erreur
      }
      
      return response.data; // Retourne le message de succès ou d'erreur
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'élément:', error);
      throw error; // Propager l'erreur si besoin
    }
  };

  const getCategorieBySlug = async (slug) => {
    try {
      const response = await apiClient.get(`/categorie_by_slug/${slug}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response
    } catch (error) {
      console.error("Erreur lors de la récupération de la catégorie :", error);
      throw error;  // Relance l'erreur pour que le composant appelant puisse la gérer
    }
  };


  const getById = async (endpoint, id) => {
    try {
      const response = await apiClient.get(`/${endpoint}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data
    } catch (error) {
      console.error("Erreur lors de la récupération de la catégorie :", error);
      throw error;  // Relance l'erreur pour que le composant appelant puisse la gérer
    }
  };


  
  const createResource = async (endpoint, data) => {
    
    try {
      const response = await apiClient.post(`/${endpoint}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      return response
    } catch (error) {
      console.error(`Erreur lors de la création de la ressource à ${endpoint}:`, error);
      throw error;  // Relance l'erreur pour que le composant appelant puisse la gérer
    }
  };


  const updateResource = async (endpoint, data) => {
    
    try {
      const response = await apiClient.put(`/${endpoint}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.error) {
        throw new Error(response.data.message); // Si l'API retourne une erreur
      }

      return response
    } catch (error) {
      console.error(`Erreur lors de la mise a jour de la ressource à ${endpoint}:`, error);
      throw error;  
    }
  };



  return { getById, getAll, updateResource, deleteItem, getCategorieBySlug, createResource }; // Retourner les deux fonctions
};
