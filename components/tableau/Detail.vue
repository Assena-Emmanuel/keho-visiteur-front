<script setup>
// Props
const props = defineProps({
  user: Object,
  data: Object,
});

const user = ref({})

watch(
  () => props.user, (newUuid) => {  

    // if (newUuid) {
    //   data.value = await getUser(newUuid);  
    //   if(data.value){
    //     nom.value = data.value.nom
    //     prenom.value = data.value.prenom
    //     e_mail.value = data.value.email
    //     telephone1.value = data.value.telephone1
    //     telephone2.value = data.value.telephone2
    //     civilite.value = data.value.civilite
    //     uuid.value = data.value.uuid

    //     matricule.value = data.value.visite ? data.value.visite.matricule : ""
    //     codeVisite.value = data.value.visite ? data.value.visite.code_visite : ""
    //     departement.value = data.value.visite ? data.value.visite.departement.libelle : ""
    //     service.value = data.value.visite ? data.value.visite.service.libelle : ""

    //   }
    // }
  },
  { immediate: true }  // Lance le watch dès que possible, même si la prop est déjà présente
);


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
                Département: <span class="fw-bold">{{ data.nom }}</span>
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



        




    </div>  
</template>