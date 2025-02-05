<script setup>
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useAuthStore } from "~/stores/auth.js";
import apiClient from '~/components/api/intercepteur';

const authStore = useAuthStore()

// Déclaration des props
const props = defineProps({
  isOpen: Boolean,
  id: Number,
  isEditMode: Boolean,
  selectedIndex: Number, // L'index de l'élément à éditer
});

// Déclaration des événements
const emit = defineEmits(["update:isOpen", "update:id"]);

// Variables réactives
const libelleDepartement = ref("");
const codeDepartement = ref("");
const slug = ref("");
const statut = ref("");
const categorie = ref("");
const submitted = ref(false);
const loading = ref(false);
const loadingEdit = ref(false);
const departementPrincipale = ref("");
const selectDepartements = ref({})


// Validation avec Vuelidate
const rules = computed(() => ({
  libelleDepartement: { required },
  codeDepartement: { required },
  slug: { required },
}));

const v$ = useVuelidate(rules, { libelleDepartement, codeDepartement, slug });

// Méthodes
const onSaveDepartement = () => {
  submitted.value = true;
  v$.value.$touch();
  if (v$.value.libelleDepartement.$error || v$.value.codeDepartement.$error) {
    return;
  }
};


onMounted(async () => {

try {
  // Récupérer tous les départements
  const departements = await toutesCategories("DPT");
  selectDepartements.value = departements; 
} catch (error) {
  console.error('Erreur lors de la récupération des données:', error);
}
});


watch(
  () => props.id,  
  async (newid) => {  
    if (newid) {
      await getCategorie(newid);  
    }
  },
  { immediate: true }  // Lance le watch dès que possible, même si la prop est déjà présente
);

const onUpdateDepartement = async () => {
  submitted.value = true;
  v$.value.$touch();
  if (v$.value.libelleDepartement.$error || 
    v$.value.codeDepartement.$error || 
    v$.value.slug.$error 
  ) {
    return;
  }else{
    loadingEdit.value = true;
    try {
      // Effectuer l'appel API pour récupérer les données de l'utilisateur
      const formData = new FormData();
      formData.append('libelle', libelleDepartement.value);
      formData.append('slug', slug.value);
      formData.append('code', codeDepartement.value);
      formData.append('position', 0);
      formData.append('statut', statut.value);
      formData.append('categorie_id', departementPrincipale.value || 0);

      const response = await apiClient.post(`/categorie/${props.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${authStore.token}`,  // Utilisation du token d'authentification
        }
      });
    // Vérification de la réponse
    if (!response.data.error) {
        successmsg(response.data.message);  
        resetForm(); 
      } else {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", response.data.error);

      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du departement :", error);

    } finally {
      // Fin du processus de chargement
      loadingEdit.value = false;
    }
  }
};

// Fonction asynchrone pour récupérer l'utilisateur par uuid
async function getCategorie(id) {
  loading.value = true;
  try {
    const response = await apiClient.get(`/categorie/${id}`, {
      headers: { 
        'Authorization': `Bearer ${authStore.token}`,  
      }
    });

    if (!response.data.error) {
      libelleDepartement.value = response.data.data.libelle
      slug.value = response.data.data.slug
      codeDepartement.value = response.data.data.code
      statut.value = response.data.data.statut
      departementPrincipale.value = response.data.data.categorie_id
      console.log('-------------------------- cat: '+JSON.stringify(response.data.data))
    }
  } catch (error) {
    console.error('Erreur durant la recuperation de la categorie:', error);
  }finally{
    loading.value = false; 
  }
}

async function toutesCategories(slug) {
  try {
    const response = await apiClient.get(`/categorie_by_slug/${slug}`, {
      headers: { 
        'Authorization': `Bearer ${authStore.token}`,  // Utilise `this.token` si `this` est disponible
      }
    });

    if (!response.data.error) {
      return response.data.data;
    }
  } catch (error) {
    console.error('Error fetching Departement-----:', error);
  }
}

const resetForm = () => {
  libelleDepartement.value = "";
  codeDepartement.value = "";
  slug.value = "";
  submitted.value = false;
  
  emit("update:isOpen", false);
  emit("update:id", null);

  v$.value.$reset();
};
</script>



<template>
  <BModal 
      @hide="resetForm" 
      :modelValue="isOpen" 
      size="md"
      :title="isEditMode ? `Modifier le département ` : 'Création du département'" 
      title-class="font-18" 
      hide-footer
  >

  <div v-if="loading" class="loading-ellipses">
    <span class="dot">.</span>
    <span class="dot">.</span>
    <span class="dot">.</span>
  </div>

  <BForm v-else class="form-vertical px-3" role="form">

    <div class="row mb-3">
      <div class="col-sm-8 col-md-8">
      <label for="libelleDepartement" style="font-size: 12px;">Libellé</label>
      <input 
        v-model="libelleDepartement" 
        type="text" class="form-control form-control-sm" 
        id="departement" 
        placeholder="" 
        :class="{
        'is-invalid': submitted && v$.libelleDepartement.$error,
        'border border-danger': submitted && v$.libelleDepartement.$error,
        'border border-dark': !(submitted && v$.libelleDepartement.$error)
        }"
      />
      <div v-if="submitted && v$.libelleDepartement.$error" class="invalid-feedback">
          <span v-if="v$.libelleDepartement.required.$invalid" class="font-size-12">champ obligatoire
          </span>
        </div>
    </div>
    <div class="col-sm-4 col-md-4">
      <label for="departement" style="font-size: 12px;">Statut</label>
      <div class="input-group">
        <select v-model="statut" id="departement" class="form-select form-select-sm border border-secondary rounded-2" aria-label="Default select example"
        >
          <option value="1" :selected="statut === 1 ">activé</option>
          <option value="0" :selected="statut === 0 ">desactivé</option>

        </select>
      </div>
      
    </div>
    </div>
    
    <div class="row mb-3">
      <div class="col-6 col-sm-6 col-md-6">
      <label for="code" style="font-size: 12px;">Code </label>
      <div>
        <input 
          v-model="codeDepartement" 
          id="code" 
          class="form-control form-control-sm"  
          type="text"
          :class="{
          'is-invalid': submitted && v$.codeDepartement.$error,
          'border border-danger': submitted && v$.codeDepartement.$error,
          'border border-dark': !(submitted && v$.codeDepartement.$error)
        }">
        <div v-if="submitted && v$.codeDepartement.$error" class="invalid-feedback">
          <span v-if="v$.codeDepartement.required.$invalid" class="font-size-12">champ obligatoire
          </span>
        </div>
      </div>
    </div>


    <div class="col-6 col-sm-6 col-md-6">
      <label for="code" style="font-size: 12px;">Slug </label>
      <div>
        <input 
          v-model="slug" 
          id="code" 
          class="form-control form-control-sm"  
          type="text"
          :class="{
          'is-invalid': submitted && v$.slug.$error,
          'border border-danger': submitted && v$.slug.$error,
          'border border-dark': !(submitted && v$.slug.$error)
        }">
        <div v-if="submitted && v$.slug.$error" class="invalid-feedback">
          <span v-if="v$.slug.required.$invalid" class="font-size-12">champ obligatoire
          </span>
        </div>
      </div>
    </div>
    </div>


    <div class="mb-3">
      <label for="departement" style="font-size: 12px">Département Principal</label>
      <div class="input-group">
        <select v-model="departementPrincipale" id="departement" class="form-select form-select-sm border border-secondary rounded-2" aria-label="Default select example"
        >
          <option 
            v-for="departement in selectDepartements" 
            :key="departement.code" 
            :value="departement.id"
            :selected="departementPrincipale === departement.id "
          >
          
            {{ departement.libelle }}
          
          </option>

        </select>
      </div>
    </div>

    <div class="mt-4 d-flex justify-content-center">
      <BButton v-if="!isEditMode" @click="onSaveDepartement" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        Enregistrer
      </BButton>
      <BButton 
        v-if="isEditMode" 
        @click="onUpdateDepartement" 
        variant="primary" 
        class="w-sm waves-effect waves-light btn btn-sm" 
        :loading="loadingEdit" 
        loading-text="modification"
      >
        Modifier
      </BButton>
    </div>
  </BForm>
</BModal>
</template>

<style scoped>
.loading-ellipses {
  font-size: 40px; /* Taille augmentée */
  color: #3498db;
  text-align: center;
  font-weight: bold;
}

.dot {
  animation: blink 1s infinite;
  margin: 0 5px; /* Espacement entre les points */
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.3s;
}

.dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes blink {
  0%, 20% {
    opacity: 0;
  }
  50%, 100% {
    opacity: 1;
  }
}
</style>
