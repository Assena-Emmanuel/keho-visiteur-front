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
          <div class="rounded p-3 mb-3" style="border: 1px solid #0052a5;">
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
          <div class="d-flex justify-content-center">
          <vue-awesome-paginate
            :total-items="items.length"
            :items-per-page="1"
            :max-pages-shown="items.length>= 18 ? 2 : 5"
            v-model="currentPage"
          />
        </div>
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
    "Code Visiteur": "A123456",
    "Nom & Prénom": "KOFFI JEAN",
    "Pièce": "CNI",
    "numPiece": "C0078453691",
    "Société": "Keho Groupe",
    "Contact": "+225 0707142536"
  },
  {
    "Code Visiteur": "B654321",
    "Nom & Prénom": "DOE MARIE",
    "Pièce": "Passeport",
    "numPiece": "P0098765432",
    "Société": "Abidjan Services",
    "Contact": "+225 0587943625"
  },
  {
    "Code Visiteur": "C098765",
    "Nom & Prénom": "OUATTARA ALI",
    "Pièce": "CNI",
    "numPiece": "C0078943125",
    "Société": "Transco",
    "Contact": "+225 0758213456"
  },
  {
    "Code Visiteur": "D678901",
    "Nom & Prénom": "KOUADIO EMMANUEL",
    "Pièce": "Passeport",
    "numPiece": "P0054897321",
    "Société": "Groupe Omega",
    "Contact": "+225 0745932186"
  },
  {
    "Code Visiteur": "E345678",
    "Nom & Prénom": "TRA BI AMANDINE",
    "Pièce": "CNI",
    "numPiece": "C0082365478",
    "Société": "Ivotel",
    "Contact": "+225 0792435681"
  },
  {
    "Code Visiteur": "F234567",
    "Nom & Prénom": "YAO ANNE",
    "Pièce": "Passeport",
    "numPiece": "P0043218765",
    "Société": "CIE",
    "Contact": "+225 0543287945"
  },
  {
    "Code Visiteur": "G456789",
    "Nom & Prénom": "BLE GUILLAUME",
    "Pièce": "CNI",
    "numPiece": "C0098354721",
    "Société": "Sotra",
    "Contact": "+225 0589632147"
  },
  {
    "Code Visiteur": "H567890",
    "Nom & Prénom": "SANGARE MARIAM",
    "Pièce": "Passeport",
    "numPiece": "P0012457893",
    "Société": "Prosuma",
    "Contact": "+225 0532174896"
  },
  {
    "Code Visiteur": "I789012",
    "Nom & Prénom": "FOFANA AMARA",
    "Pièce": "CNI",
    "numPiece": "C0038745126",
    "Société": "MTN CI",
    "Contact": "+225 0712345896"
  },
  {
    "Code Visiteur": "J890123",
    "Nom & Prénom": "N'DRI MATHIEU",
    "Pièce": "Passeport",
    "numPiece": "P0075123468",
    "Société": "Orange CI",
    "Contact": "+225 0551234789"
  },
  {
    "Code Visiteur": "K901234",
    "Nom & Prénom": "ADOU PAUL",
    "Pièce": "CNI",
    "numPiece": "C0084567391",
    "Société": "NSIA",
    "Contact": "+225 0703456892"
  },
  {
    "Code Visiteur": "L012345",
    "Nom & Prénom": "TOURE FATOU",
    "Pièce": "Passeport",
    "numPiece": "P0032674819",
    "Société": "CNPS",
    "Contact": "+225 0591342678"
  },
  {
    "Code Visiteur": "M123456",
    "Nom & Prénom": "DIALLO ISMAEL",
    "Pièce": "CNI",
    "numPiece": "C0065432189",
    "Société": "CFAO",
    "Contact": "+225 0745671293"
  },
  {
    "Code Visiteur": "N234567",
    "Nom & Prénom": "KONE MARIAMA",
    "Pièce": "Passeport",
    "numPiece": "P0043527186",
    "Société": "Air Côte d'Ivoire",
    "Contact": "+225 0554728391"
  },
  {
    "Code Visiteur": "O345678",
    "Nom & Prénom": "ZADI FLORENT",
    "Pièce": "CNI",
    "numPiece": "C0089764325",
    "Société": "Sedec",
    "Contact": "+225 0791342589"
  },
  {
    "Code Visiteur": "P456789",
    "Nom & Prénom": "KOUAME THOMAS",
    "Pièce": "Passeport",
    "numPiece": "P0056893247",
    "Société": "EECI",
    "Contact": "+225 0782135469"
  },
  {
    "Code Visiteur": "Q567890",
    "Nom & Prénom": "SIA ANNE-MARIE",
    "Pièce": "CNI",
    "numPiece": "C0032145897",
    "Société": "La BICICI",
    "Contact": "+225 0541237896"
  },
  {
    "Code Visiteur": "R678901",
    "Nom & Prénom": "N'GUESSAN CYRIL",
    "Pièce": "Passeport",
    "numPiece": "P0091245783",
    "Société": "BNI",
    "Contact": "+225 0532146789"
  },
  {
    "Code Visiteur": "S789012",
    "Nom & Prénom": "TANOH SIMON",
    "Pièce": "CNI",
    "numPiece": "C0074359821",
    "Société": "Ecobank",
    "Contact": "+225 0712345698"
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
  