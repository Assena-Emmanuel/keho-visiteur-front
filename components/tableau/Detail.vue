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
            Service : <span class="fw-bold text-primary">{{ data.data[data.id].Libelle }}</span>
            </div>
            <div class=" h5">
            Département : <span class="fw-bold text-primary">{{ data.data[data.id].Département }}</span>
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
                Département: <span class="fw-bold">{{ data.data[data.id].Libelle }}</span>
                </div>
                <div class="text-primary h5">
                Code: <span class="fw-bold">{{ data.data[data.id].Code }}</span>
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


        <!-- Détail Profil -->
        <div v-if="data.formType === 'profil'" class="p-4 bg-light rounded border">
                <!-- En-tête du département -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="text-primary h5">
                Profil: <span class="fw-bold">{{ data.data[data.id].Libelle }}</span>
                </div>
                <div class="text-primary h5">
                Code: <span class="fw-bold">{{ data.data[data.id].Code }}</span>
                </div>
            </div>
        </div>
    </div>
</template>