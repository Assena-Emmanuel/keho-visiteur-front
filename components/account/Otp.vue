<script>
export default {
  data() {
    return {
      otp: ['', '', '', ''],
      msgError: '',
      showAlert: false,

    }
  },
  
  methods: {
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
  <BRow class="justify-content-center">
    <BCol md="8" lg="6" cols="xl-5">
      <BCard no-body>
        <BCardBody class="p-4">
          <div class="text-center mt-2">
            <h3 class="text-primary">Vérification du code</h3>
          </div>
          <div class="p-2 mt-4">
            <div class="border-end-primary alert-info text-center mb-4" role="alert">
                Veuillez saisir le code de vérification envoyé à votre adresse email 
            </div>
            <div v-if="showAlert" class="alert alert-danger alert-dismissible fade show">
                {{ msgError }}
                <button type="button" class="btn-close" @click="showAlert = !showAlert"></button>
            </div>
            <!-- <div v-if="msgError" class="alert alert-danger text-center mb-4" role="alert">
              {{ msgError }}
            </div> -->
            <BForm>
                <div class="otp-container">
                    <input
                    v-for="(digit, index) in otp"
                    :key="index"
                    type="text"
                    class="form-control otp-input"
                    maxlength="1"
                    v-model="otp[index]"
                    @input="moveToNext(index)"
                    ref="otpField"
                    />
                </div>

              <div class="mt-3 text-center">
                <BButton variant="primary" class="w-sm waves-effect waves-light" @click="verifyOtp">
                  Vérifier
                </BButton>
              </div>

              <div class="mt-4 text-center">
                <p class="mb-0">
                  <nuxt-link to="/forgot-password" class="fw-medium text-primary"><i class="uil-arrow-left"></i>Retour</nuxt-link>
                </p>
              </div>
              <div class="mt-4 text-center">
                <p class="mb-0">
                  Vous avez déjà un compte ?
                  <nuxt-link to="/login" class="fw-medium text-primary">Connectez-vous</nuxt-link>
                </p>
              </div>
            </BForm>
          </div>
        </BCardBody>
      </BCard>
      
    </BCol>
  </BRow>
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
</style>