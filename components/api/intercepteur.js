import axios from 'axios';

// Configuration d'Axios
const apiClient = axios.create({
  //baseURL: 'https://visitors.kehogroupe-ci.com/api', // Votre URL de base
  baseURL:'https://keho-visitors.local/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Exporter le client pour utilisation
export default apiClient;
