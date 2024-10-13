<script>
export default {
  data() {
    return {
      otp: Array(4).fill(''),
      msgError: '',
      showAlert: false,

    }
  },
  
  methods: {
    // Empêcher toute saisie autre qu'un chiffre
    validateInput(event) {
      // On permet seulement les chiffres (de 0 à 9), et les touches de contrôle (backspace, tab, etc.)
      if (!/^\d$/.test(event.key) && event.key !== "Backspace" && event.key !== "Tab") {
        event.preventDefault();
      }
    },
    moveToNext(index) {
      // Déplace automatiquement le curseur vers le champ suivant
      if (this.otp[index].length === 1 && index < 3) {
        this.$refs.otpField[index + 1].focus();
      }
    },
    async verifyOtp() {
      // Vérifie que tous les champs sont remplis
      const otpCode = this.otp.join('');
      if (otpCode.length === 4) {
        // console.log(`__________________________: ${this.otp.join("")}`)
        this.$router.push({path: "/reset-password"})
        // try {
        // //   const response = await this.$axios.post('/api/verify-otp', { otp: otpCode });
        // const response = otpCode
        //   if (response.data.success) {
        //     this.$router.push({path: "/reset-password"})
        //   } else {
        //     this.msgError = "Code incorrecte"
        //     this.showAlert = true
        //   }
        // } catch (error) {
        //   console.error('Failed to verify OTP', error);
        // }
      } else {
        this.msgError = "Veuillez renseigner ces champs svp"
        this.showAlert = true
      }
    }
  }
}
</script>

<template>
  <BForm>
      <BCard class="card-auth-otp">
        <BCardBody>
          <div class="text-center">
            <h3 class="text-light">Vérification du code</h3>
          </div>
          <div class="">
            <div class="text-light alert-info text-center mb-3 d-none d-md-block" role="alert">
                Veuillez saisir le code de vérification envoyé à votre adresse email 
            </div>
            <div class="text-center text-light mb-3 d-block d-md-none" role="alert">
                Veuillez saisir le code de vérification envoyé à votre adresse email 
            </div>
            <div class="otp-container">
                <input
                v-for="(digit, index) in otp"
                :key="index"
                type="text"
                class="form-control otp-input"
                
                maxlength="1"
                v-model="otp[index]"
                @keydown="validateInput"
                @input="moveToNext(index)"
                ref="otpField"
                />
            </div>    
          </div>
          <div v-if="showAlert" class="text-danger text-center">
                {{ msgError }}
            </div>
        </BCardBody>
      </BCard>
      <div class="mt-3 text-center">
        <BButton variant="success" class="btn-bg w-sm waves-effect waves-light btn btn-sm" @click="verifyOtp">
          Vérifier
        </BButton>
      </div>

      <div class="mt-4 text-center">
        <p class="mb-0">
          <nuxt-link to="/forgot-password" class="fw-medium text-primary"><i class="uil-arrow-left"></i>Retour</nuxt-link>
        </p>
      </div>
      <div class="mt-4 text-center">
        <p class="mb-0" style="font-size: 12px;">
          Vous avez déjà un compte ?
          <nuxt-link to="/login" class="fw-medium text-primary">Connectez-vous</nuxt-link>
        </p>
      </div>
</BForm>
</template>
<style scoped>
/* Style de conteneur pour resserrer les champs */
.otp-container {
  display: flex;
  justify-content: center;
  gap: 0.5rem; /* Espace réduit entre les champs */
}

/* Style carré et espacement des champs OTP */
.otp-input {
  width: 3rem;
  height: 3rem; /* Forme carrée en définissant la hauteur et la largeur égales */
  text-align: center;
  font-size: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px; /* Coins légèrement arrondis, tu peux ajuster selon ton besoin */
  margin-right: 0; /* Retirer l'espacement supplémentaire à droite */
  box-shadow: none;
  outline: none;
  transition: all 0.2s ease-in-out;
}

/* Ajouter un effet visuel lorsque l'utilisateur clique sur un champ */
.otp-input:focus {
  border-color: #007bff; /* Couleur de bordure active */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.card-auth-otp {
    background-color: #194698;
    border: none;
    border-radius: 30px;
    width: 500px;
    height: auto;
  } 
.btn-bg{
  background-color: #3DA92A;
  border: none;
  width: 150px;
  padding: 10px 0;
  border-radius: 20px
}

.btn-loading {
  background-color: #28a745 !important; /* Vert durant le chargement */
  color: white;
}

@media (max-width: 768px) {  Pour les tablettes 
  .card-auth-otp {
    width: 100%;
    background-color:  #194698;
  } 
  }
  
  @media (max-width: 576px) { /* Pour les téléphones */
  .card-auth-otp {
    margin-top: 3em;
    width: 100% !important; /* Forcer la largeur */
    background-color: #194698;
  }
  .otp-input {
  width: 2.5rem;
  height: 2.5rem; /* Forme carrée en définissant la hauteur et la largeur égales */
  text-align: center;
  font-size: 1.5rem;
  border-radius: 4px; /* Coins légèrement arrondis, tu peux ajuster selon ton besoin */
  
}
  }
</style>
