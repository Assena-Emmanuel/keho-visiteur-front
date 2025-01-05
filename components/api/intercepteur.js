import axios from 'axios';

// Configuration d'Axios
const apiClient = axios.create({
  baseURL: 'https://visitors.kehogroupe-ci.com/api', // Votre URL de base
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un interceptor
apiClient.interceptors.response.use(
  (response) => response, // Retourne directement la réponse si elle est OK
  async (error) => {
    if (error.response.status === 401 && !error.config._retry) {
      // Identifier les erreurs dues à un token expiré
      error.config._retry = true; // Empêche la boucle infinie
      try {
        const token = localStorage.getItem('token'); // Récupérer le refresh token
        const { data } = await apiClient.post('/auth/refresh', { refresh_token: token });

        // Mettre à jour le token
        localStorage.setItem('token', data.access_token);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;

        // Réessayer la requête initiale avec le nouveau token
        error.config.headers['Authorization'] = `Bearer ${data.access_token}`;
        return apiClient.request(error.config);
      } catch (refreshError) {
        console.error('Échec lors du rafraîchissement du token:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Exporter le client pour utilisation
export default apiClient;
