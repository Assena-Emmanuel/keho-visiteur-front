<template>
    <div id="msg">
      <div class="d-flex justify-content-center" id="id-logo">
        <div>
          <img src="/images/total-removebg.png" id="img-log" alt="logo-light" />
        </div>
      </div>

      <BCard
      border-variant="primary"
      header="Primary"
      header-bg-variant="primary"
      header-text-variant="white"
      style="background-color: white;" id="qr-topbar"
      >

      <template #header>
        <BCol cols="12" class="d-flex justify-content-end"><BButton @click="handleSortie" variant="outline-primary" id="btnSortie">Sortie</BButton></BCol>
      </template>

      <!-- <BCard no-body class="border-0" title="Je m'identifie" style="background-color: white;" id="qr-topbar"> -->
        <BCardBody>
          <BForm>
          <BRow>
            <BCol md="6">
              <div class="mb-3">
                <label for="codeVisite" class="fw-bold" style="font-size: 13px; color: #0052a5;">
                  <strong>Code de Visite</strong> <strong class="text-danger">*</strong>
                </label>
                <div>
                  <input
                    v-model="codeVisite"
                    id="codeVisite"
                    class="form-control"
                    style="min-height: 44px;"
                    :style="{border: !(submitted && v$.codeVisite.$error) && '1px solid #0052a5'}"
                    type="text"
                    :class="{
                      'is-invalid': submitted && v$.codeVisite.$error,
                      'border border-danger': submitted && v$.codeVisite.$error,
                    }"
                  />
                  <div v-if="submitted && v$.codeVisite.$error" class="invalid-feedback">
                    <span v-if="v$.codeVisite.required.$invalid" class="font-size-12">champ obligatoire</span>
                  </div>
                </div>
              </div>
            </BCol>
            <BCol sm="6" class="mb-3">
              <div><label class="typo__label" style="color: #0052a5">Code Visiteur<strong class="text-danger">*</strong></label>
                <multiselect 
                  v-model="codeVisiteur" 
                  :options="options" 
                  :option-height=31
                  :custom-label="nameWithLang" 
                  placeholder="Selectionnez le code Visiteur" 
                  :style="{border: !(submitted && v$.codeVisiteur.$error) && '1px solid #0052a5'}"
                  label="code"
                  track-by="code"
                  :select-label="'sélectionner'"
                  :deselect-label="'désélectionner'"
                  :class="{
                      'is-invalid': submitted && v$.codeVisiteur.$error,
                      'border border-danger': submitted && v$.codeVisiteur.$error,
                    }"
                ></multiselect>
                <div v-if="submitted && v$.codeVisiteur.$error" class="invalid-feedback">
                    <span v-if="v$.codeVisiteur.required.$invalid" class="font-size-12">champ obligatoire</span>
                  </div>
                <!-- <pre class="language-json"><code>{{ value }}</code></pre> -->
              </div>
            </BCol>
          </BRow>
          <div class="border border-success p-3 mb-3">
            <div v-for="(item, index) in paginatedData" :key="index">
              <p style="background-color: #ff7900; color: #fff;" class="fw-bold text-center">Code Visiteur: {{ item['Code Visiteur'] }}</p>
              <BRow>
                <BCol md="6">
                  <div>Nom & Prénom: <span class="text-color"><strong>{{ item['Nom & Prénom'] }}</strong></span></div>
                  
                </BCol>
                <BCol md="6">
                  <div>Société: <span class="text-color"><strong>{{ item.Société }}</strong></span></div>
                  
                </BCol>
                <BCol md="6">
                  <div>Type de Pièce: <span class="text-color"><strong>{{ item.Pièce }}</strong></span></div>
                  
                </BCol>
                <BCol md="6">
                  <div>N° Pièce: <span class="text-color"><strong>{{ item.numPiece }}</strong></span></div>
                  
                </BCol>
                <BCol md="6">
                  <div>Contact: <span class="text-color"><strong> {{ item.Contact }}</strong></span></div>
                  
                </BCol>
              </BRow>
              
              
              
              
              
            </div>
          </div>
          <vue-awesome-paginate
            :total-items="items.length"
            :items-per-page="1"
            :max-pages-shown="5"
            v-model="currentPage"
          />
        </BForm>
        </BCardBody>
      </BCard>
    </div>
  </template>
  
  <script>
  definePageMeta({
        layout: "utility"
    });
  import { useVuelidate } from "@vuelidate/core";
  import { required } from "@vuelidate/validators";
  import Multiselect from 'vue-multiselect'
  
  export default {
    components: {
      Multiselect
    },
    setup() {
      return { v$: useVuelidate() };
    },
    data() {
      return {
        submitted:false,
        codeVisite: "",
        employ: "",
        submitted: false,
        currentPage: 1,
        items: [
          {
            'Code Visiteur': '------------',
            'Nom & Prénom': 'KOFFI JEAN',
            Pièce: 'CNI',
            numPiece: 'C0078453691',
            Société: 'Keho Groupe',
            Contact: '+225 0707142536'
          },
          {
            'Code Visiteur': '------------',
            'Nom & Prénom': 'ZIE Fatou',
            Pièce: 'CNI',
            numPiece: 'C0097353689',
            Société: 'Keho Groupe',
            Contact: '+225 0709182532'
          },
        ],
        codeVisiteur: null,
        options: [
          {code: 'VTR-001'},
          {code: 'VTR-002'},
          {code: 'VTR-101'},
          {code: 'VTR-211'},
          {code: 'VTR-777'}
        ]  
      };
    },
    methods: {
      nameWithLang ({code}) {
        return `${code}`
      },
      handleSortie(){
        this.submitted = true;
        this.v$.$touch();
        if (this.v$.codeVisite.$error || 
            this.v$.codeVisite.$error
        ) {
            return;
        }else{
            this.submitted = false
        }
      }
    },
    computed: {
      paginatedData() {
        const start = (this.currentPage - 1);
        const end = start + 1;
        return this.items.slice(start, end);
      }
    },
    validations: {
      codeVisite: { required },
      codeVisiteur: { required },
    },
  };
  </script>
  
  <style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
  <style>
  /* Styles personnalisés pour pagination et disposition */
  .bg-card {
    background-color: rgba(204, 200, 200, 0.5); /* Gris avec 50% de transparence */
  }
  #qr-topbar {
    margin-top: 1em;
    /* background: linear-gradient(90deg, 
        #e50000, 
        #ff7900, 
        #ffdd00, 
        #00b140, 
         #0072ce, 
        #0052a5  
    );
    color: white; Texte en blanc pour contraster
    padding: 10px;
    border-radius: 10px; */
    @media (max-width: 576px) {
        max-width: 350px;
    }

    @media (min-width: 768px) and (max-width: 991px) {
      width: 600px;
    }

    @media (min-width: 992px) {
      width: 700px;
    }

  }
  #msg {
    
    @media (max-width: 576px) {
        height: 100vh;
    }

    @media (min-width: 768px) and (max-width: 991px) {
        height: 100vh;
    }

    @media (min-width: 992px) {
        height: 110vh;
    }

  }



  .pagination-container {
    display: flex;
    column-gap: 10px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }
  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }
  .active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
  }
  .active-page:hover {
    background-color: #2988c8;
  }
  .multiselect__option {
    height: 31px; /* Remplacez par la hauteur souhaitée */
}

#id-logo {
  @media (max-width: 576px) {
    margin-top: 2em;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    margin-top: 3em;
  }

  @media (min-width: 992px) {
    margin-top: 3em;
  }
}
#img-log {
  @media (max-width: 576px) {
    height: 100px;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    height: 130px;
  }

  @media (min-width: 992px) {
    height: 150px;
  }
}


#btnSortie {
  background: #00b140;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

#btnSortie:hover {
  transform: scale(1.05);
}

.text-color{
  color: #0052a5;
}

  </style>
  