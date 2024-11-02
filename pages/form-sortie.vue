<template>
    <div id="msg">
      <div class="d-flex justify-content-center" style="margin-top: 3em;">
        <div>
          <img src="/images/total-removebg.png" alt="logo-light" height="150" />
        </div>
      </div>
      <BCard no-body class="border-0" title="Je m'identifie" style="background-color: white;" id="qr-topbar">
        <BCardBody>
          <BRow>
            <BCol md="6">
              <div class="mb-3">
                <label for="codeVisite" class="fw-bold text-black" style="font-size: 12px;">
                  Code de Visite <strong class="text-danger">*</strong>
                </label>
                <div>
                  <input
                    v-model="codeVisite"
                    id="codeVisite"
                    class="form-control form-control-sm"
                    type="text"
                    :class="{
                      'is-invalid': submitted && v$.codeVisite.$error,
                      'border border-danger': submitted && v$.codeVisite.$error,
                      'border border-secondary': !(submitted && v$.codeVisite.$error)
                    }"
                  />
                  <div v-if="submitted && v$.codeVisite.$error" class="invalid-feedback">
                    <span v-if="v$.codeVisite.required.$invalid" class="font-size-12">champ obligatoire</span>
                  </div>
                </div>
              </div>
            </BCol>
            <BCol sm="6" class="mb-3">
              <label for="civilite" style="font-size: 12px; font-weight: bolder">
                Employé <strong class="text-danger">*</strong>
              </label>
              <div class="input-group">
                <select
                  v-model="employ"
                  id="civilite"
                  class="form-select form-select-sm border border-secondary rounded-2"
                  :class="{
                    'is-invalid': submitted && v$.employ.$error,
                    'border border-danger': submitted && v$.employ.$error,
                    'border border-secondary': !(submitted && v$.employ.$error)
                  }"
                >
                  <option value="" selected>civilité...</option>
                  <option value="MONSIEUR">MONSIEUR</option>
                  <option value="MADAME">MADAME</option>
                  <option value="MADEMOISELLE">MADEMOISELLE</option>
                </select>
                <div v-if="submitted && v$.employ.$error" class="invalid-feedback">
                  <span v-if="v$.employ.required.$invalid">champ obligatoire</span>
                </div>
              </div>
            </BCol>
          </BRow>
          <div class="border border-black p-3 mb-3">
            <div v-for="(item, index) in paginatedData" :key="index">
              <p>Code Visiteur: {{ item['Code Visiteur'] }}</p>
              <p>Nom & Prénom: {{ item['Nom & Prénom'] }}</p>
              <p>Pièce: {{ item.Pièce }}</p>
              <p>N° Pièce: {{ item.numPiece }}</p>
              <p>Société: {{ item.Société }}</p>
              <p>Contact: {{ item.Contact }}</p>
            </div>
          </div>
          <vue-awesome-paginate
            :total-items="items.length"
            :items-per-page="1"
            :max-pages-shown="5"
            v-model="currentPage"
          />
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
  
  export default {
    setup() {
      return { v$: useVuelidate() };
    },
    data() {
      return {
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
        ]
      };
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
      employ: { required },
    },
  };
  </script>
  
  <style>
  /* Styles personnalisés pour pagination et disposition */
  .bg-card {
    background-color: rgba(204, 200, 200, 0.5); /* Gris avec 50% de transparence */
  }
  #qr-topbar {
    margin-top: 1em;
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
  </style>
  