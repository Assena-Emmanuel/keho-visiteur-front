<script>
import { data } from '../parametres/useData';

export default{
    props:{
        data: Object
    }
}
</script>
<template>
    <div>
        <!-- Détail Service -->
        <div v-if="data.formType === 'service'" class="p-4 bg-light rounded border">
        <!-- En-tête du service -->
        <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <div class=" h5">
            Service : <span class="fw-bold text-primary">{{ data.data.Libelle }}</span>
            </div>
            <div class=" h5">
            Département : <span class="fw-bold text-primary">{{ data.data.Département }}</span>
            </div>
        </div>

        <!-- Titre des autres services du département -->
        <h6 class="mb-3">Autres <strong>Services</strong> du département</h6>

        <!-- Liste des autres services -->
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
            <strong>Développement</strong>
            <span class="badge bg-secondary">DEP001</span>
            </li>
            <!-- Ajouter d'autres services ici si nécessaire -->
        </ul>
        </div>

        <!-- Détail Département -->
        <div v-if="data.formType === 'departement'" class="p-4 bg-light rounded border">
                <!-- En-tête du département -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="text-primary h5">
                Département: <span class="fw-bold">{{ data.data.Libelle }}</span>
                </div>
                <div class="text-primary h5">
                Code: <span class="fw-bold">{{ data.data.Code }}</span>
                </div>
            </div>

            <!-- Titre des services -->
            <h5 class="border-bottom pb-3 mb-3">Services du département <strong>{{ data.libelle }}</strong></h5>

            <!-- Liste des services -->
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                <strong>Informatique</strong>
                <span class="badge bg-secondary">SEV003</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                <strong>Développement</strong>
                <span class="badge bg-secondary">SEV005</span>
                </li>
                <!-- Ajoutez d'autres services ici si nécessaire -->
            </ul>
        </div>


        <!-- Détail Menu -->
        <div>
          <!-- Détail Page -->
          <div v-if="data.formType === 'menu'" class="p-4 bg-light rounded border">
            
            <!-- En-tête de la page -->
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div class="text-primary h5">
                Target: <span class="fw-bold">{{ data.data.Target }}</span>
              </div>
              <div class="text-primary h5">
                Position: <span class="fw-bold">{{ data.data.Position }}</span>
              </div>
            </div>

            <!-- Informations détaillées de la page -->
            <h5 class="border-bottom pb-3 mb-3">Détails de la page <strong>{{ data.data.Name }}</strong></h5>

            <ul class="list-group">
              <!-- Libellé -->
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <strong>Libellé</strong>
                <span>{{ data.data.Libelle }}</span>
              </li>
              <!-- Type -->
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <strong>Type</strong>
                <span>{{ data.data.Type }}</span>
              </li>
              <!-- Icone -->
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <strong>Icône</strong>
                <span>{{ data.data.Icon }}</span>
              </li>
              <!-- Menu -->
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <strong>Menu</strong>
                <span>{{ data.data.Menu }}</span>
              </li>
            </ul>
          </div>
        </div>



        <!-- Détail Profil -->
        <div v-if="data.formType === 'profil'" class="p-4 bg-light rounded border">
                <!-- En-tête du département -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="text-primary h5">
                Profil: <span class="fw-bold">{{ data.data.Libelle }}</span>
                </div>
                <div class="text-primary h5">
                Code: <span class="fw-bold">{{ data.data["Code profil"] }}</span>
                </div>
            </div>
        </div>

        <!-- Détail Agence -->
          <!-- Détail Section -->
        <div v-if="data.formType === 'agence'" class="p-4 bg-light rounded border">
          
          <!-- En-tête de la section -->
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="text-primary h5">
              Slug: <span class="fw-bold">{{ data.data.Slug }}</span>
            </div>
            <div class="text-primary h5">
              Position: <span class="fw-bold">{{ data.data.Position }}</span>
            </div>
          </div>

          <!-- Informations détaillées de la section -->
          <h5 class="border-bottom pb-3 mb-3">Détails de la section <strong>{{ data.data.Libellé }}</strong></h5>

          <ul class="list-group">
            <!-- Code -->
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <strong>Code</strong>
              <span>{{ data.data.Code }}</span>
            </li>
            <!-- Catégorie -->
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <strong>Catégorie</strong>
              <span>{{ data.data.Catégorie }}</span>
            </li>
            <!-- Statut -->
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <strong>Statut</strong>
              <span>{{ data.data.Statut }}</span>
            </li>
          </ul>
        </div>

        <!-- Détail Catégorie -->
        <div v-if="data.formType === 'categorie'" class="p-4 bg-light rounded border">
          
          <!-- En-tête de la section -->
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="text-primary h5">
              Slug: <span class="fw-bold">{{ data.data.Slug }}</span>
            </div>
            <div class="text-primary h5">
              Position: <span class="fw-bold">{{ data.data.Position }}</span>
            </div>
          </div>

          <!-- Informations détaillées de la section -->
          <h5 class="border-bottom pb-3 mb-3">Détails de la section <strong>{{ data.data.Libellé }}</strong></h5>

          <ul class="list-group">
            <!-- Code -->
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <strong>Code</strong>
              <span>{{ data.data.Code }}</span>
            </li>
            <!-- Catégorie -->
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <strong>Catégorie</strong>
              <span>{{ data.data.Catégorie }}</span>
            </li>
            <!-- Statut -->
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <strong>Statut</strong>
              <span>{{ data.data.Statut }}</span>
            </li>
          </ul>
        </div>



        <!-- Détail User -->
        <div v-if="data.formType === 'utilisateur'" class="p-4 bg-light rounded">
        <div class="row mb-3">
          <div class="col-md-4">
            <img src="/images/images.png" alt="Photo" class="img-thumbnail" style="max-width: 100px;">
          </div>
          <div class="col-md-8">
            <h4>{{ data.data["Civilité"] }} {{ data.data["Nom"] }} {{ data.data["Prénoms"] }}</h4>
            <div class="mb-1"><span class="border border-secondary p-1 rounded-3">EMPLOYE</span></div>
            <BBadge v-if="data.data.statut" variant="success">Activé</BBadge>
            <BBadge v-if="!data.data['Statut']" variant="danger">Désactivé</BBadge>
          </div>
        </div>
        <div class="row mb-3">
          
          <div class="col-md-6">
            <strong>Mobile 1:</strong> <span>{{ data.data.telefone1 }}</span>
          </div>
          <div class="col-md-6">
            <strong>Mobile 2:</strong> <span>{{ data.data["Tel 2"] }}</span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-12">
            <strong>Email:</strong> <span>{{ data.data["E-mail"] }}</span>
          </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-6">
                <strong>Département:</strong> <span>{{ data.data["Département"] }}</span>
            </div>
            <div class="col-md-6">
                <strong>Service:</strong> <span>{{ data.data["Service"] }}</span>
            </div>
        </div>
        <hr>
      <div class="row mb-3">
          <div class="col-md-6">
            <strong>Code Visite:</strong> <span>{{ data.data["Code Visite"] }}</span>
          </div>
          <div class="col-md-6">
            <strong>Matricule:</strong> <span>{{ data.data["Matricule"] }}</span>
          </div>
        </div>
      </div>
      




    </div>  
</template>