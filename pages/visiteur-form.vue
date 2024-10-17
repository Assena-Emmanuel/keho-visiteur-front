<template>
    <BCard
        no-body 
        class="mx-3 border-0"
        title="Je m'identifie"
        style="background-color: rgba(204, 200, 200, 0.5);"
        id="qr-topbar"
    >
        
        <BCardBody>
            <h3 class="text-center">Je m'identifie</h3>
            <hr>
            <BForm class="form-vertical  px-3" role="form">
                <BRow>
                    <BCol md="6">
                        <div class="mb-3">
                        <label for="nom" class="fw-bold text-black" style="font-size: 12px;">Nom</label>
                        <input 
                            v-model="nom" 
                            typePiece="text" class="form-control form-control-sm" 
                            id="departement" 
                            placeholder="" 
                            :class="{
                            'is-invalid': submitted && v$.nom.$error,
                            'border border-danger': submitted && v$.nom.$error,
                            'border border-secondary': !(submitted && v$.nom.$error)
                            }"
                        />
                        <div v-if="submitted && v$.nom.$error" class="invalid-feedback">
                            <span v-if="v$.nom.required.$invalid" class="font-size-12">champ obligatoire
                            </span>
                            </div>
                        </div>
                    </BCol>

                    <BCol md="6">
                        <div class="mb-3">
                            <label for="prenom" class="fw-bold text-black" style="font-size: 12px;">Prénoms </label>
                            <div>
                                <input 
                                v-model="prenom" 
                                id="prenom" 
                                class="form-control form-control-sm"  
                                typePiece="text"
                                :class="{
                                'is-invalid': submitted && v$.prenom.$error,
                                'border border-danger': submitted && v$.prenom.$error,
                                'border border-secondary': !(submitted && v$.prenom.$error)
                                }">
                                <div v-if="submitted && v$.prenom.$error" class="invalid-feedback">
                                <span v-if="v$.prenom.required.$invalid" class="font-size-12">champ obligatoire
                                </span>
                                </div>
                            </div>
                        </div>
                    </BCol>
                    <BCol md="6">
                        <div class="mb-3">
                            <label for="entreprise" class="fw-bold text-black" style="font-size: 12px;">Entreprise </label>
                            <div>
                                <input 
                                v-model="entreprise" 
                                id="entreprise" 
                                class="form-control form-control-sm"  
                                typePiece="text"
                                :class="{
                                'is-invalid': submitted && v$.entreprise.$error,
                                'border border-danger': submitted && v$.entreprise.$error,
                                'border border-secondary': !(submitted && v$.entreprise.$error)
                                }">
                                <div v-if="submitted && v$.entreprise.$error" class="invalid-feedback">
                                <span v-if="v$.entreprise.required.$invalid" class="font-size-12">champ obligatoire
                                </span>
                                </div>
                            </div>
                        </div>
                    </BCol>

                    <BCol md="6">
                        <div class="mb-3">
                            <label for="telephone" class="fw-bold text-black" style="font-size: 12px;">Téléphone </label>
                            <div>
                                <input 
                                v-model="telephone" 
                                id="telephone" 
                                class="form-control form-control-sm"  
                                typePiece="text"
                                :class="{
                                'is-invalid': submitted && v$.telephone.$error,
                                'border border-danger': submitted && v$.telephone.$error,
                                'border border-secondary': !(submitted && v$.telephone.$error)
                                }">
                                <div v-if="submitted && v$.telephone.$error" class="invalid-feedback">
                                <span v-if="v$.telephone.required.$invalid" class="font-size-12">champ obligatoire
                                </span>
                                </div>
                            </div>
                        </div>
                    </BCol>

                    <BCol md="6">
                        <div class="mb-3">
                            <label for="typePiece" class="fw-bold text-black" style="font-size: 12px;">Pièce </label>
                            <div class="input-group">
                                <select v-model="typePiece" id="typePiece" class="form-select form-select-sm border border-secondary rounded-2" aria-label="Default select example">
                                    <option value="CNI">Carte Nationale d'Identité (CNI)</option>
                                    <option value="PASSPORT">PASSPORT</option>
                                </select>
                            </div>
                        </div>
                    </BCol>
                    <BCol md="6">
                        <div class="mb-3">
                            <label for="numPiece" class="fw-bold text-black" style="font-size: 12px;">N° Pièce </label>
                            <div>
                                <input 
                                v-model="numPiece" 
                                id="numPiece" 
                                class="form-control form-control-sm"  
                                typePiece="text"
                                :class="{
                                'is-invalid': submitted && v$.numPiece.$error,
                                'border border-danger': submitted && v$.numPiece.$error,
                                'border border-secondary': !(submitted && v$.numPiece.$error)
                                }">
                                <div v-if="submitted && v$.numPiece.$error" class="invalid-feedback">
                                <span v-if="v$.numPiece.required.$invalid" class="font-size-12">champ obligatoire
                                </span>
                                </div>
                            </div>
                        </div>
                    </BCol>

                    <BCol md="6">
                        <div class="mb-3">
                            <label for="visite" class="fw-bold text-black" style="font-size: 12px;">Visite </label>
                            <div>
                                <input 
                                v-model="visite" 
                                id="visite" 
                                class="form-control form-control-sm"  
                                typePiece="text"
                                :class="{
                                'is-invalid': submitted && v$.visite.$error,
                                'border border-danger': submitted && v$.visite.$error,
                                'border border-secondary': !(submitted && v$.visite.$error)
                                }">
                                <div v-if="submitted && v$.visite.$error" class="invalid-feedback">
                                <span v-if="v$.visite.required.$invalid" class="font-size-12">champ obligatoire
                                </span>
                                </div>
                            </div>
                        </div>
                    </BCol>
                    <BCol md="6">
                        <BCol md="2">
                            <BFormCheckbox
                                id="chefEquipe"
                                v-model="chefEquipe"
                                name="chefEquipe"
                                value="true"
                                unchecked-value="false"
                                class="border border-secondary"
                            
                            >
                                <label for="chefEquipe" class="fw-bold text-black">Chef d'Equipe</label>
                            </BFormCheckbox>
                        </BCol>
                        <BCol md="2">
                            <BFormCheckbox
                                id="delegation"
                                v-model="delegation"
                                name="delegation"
                                value="true"
                                unchecked-value="false"
                                class="border border-secondary"
                            >
                                
                                <label for="delegation" class="fw-bold text-black">Délégation</label>
                            </BFormCheckbox>
                        </BCol>
                        <BCol md="2">
                            <BFormCheckbox
                                id="vehicule"
                                v-model="vehicule"
                                name="vehicule"
                                value="true"
                                unchecked-value="false"
                                class="border border-secondary"
                                
                            >
                                
                                <label for="vehicule" class="fw-bold text-black">Véhicule</label>
                            </BFormCheckbox>
                        </BCol>
                    </BCol>
                    
                    

                    <BCol md="6">
                        <div class="mb-3">
                            <label for="codeVisite" class="fw-bold text-black" style="font-size: 12px;">Code Visite </label>
                            <div>
                                <input 
                                v-model="codeVisite" 
                                id="codeVisite" 
                                class="form-control form-control-sm"  
                                typePiece="text"
                                :class="{
                                'is-invalid': submitted && v$.codeVisite.$error,
                                'border border-danger': submitted && v$.codeVisite.$error,
                                'border border-secondary': !(submitted && v$.codeVisite.$error)
                                }">
                                <div v-if="submitted && v$.codeVisite.$error" class="invalid-feedback">
                                <span v-if="v$.codeVisite.required.$invalid" class="font-size-12">champ obligatoire
                                </span>
                                </div>
                            </div>
                        </div>
                    </BCol>
                    <!-- <BCol md="6">
                        <div class="mb-3">
                            <PhotoCamera @photo-captured="handlePhoto" />
                        </div>
                    </BCol> -->
                    
            
                </BRow>

                <div class="mt-4 d-flex justify-content-center">
                <BButton @click="onSave" variant="primary" class="w-sm waves-effect waves-light btn btn-lg" >
                    ENREGISTRER
                </BButton>
                </div>
                </BForm>

        </BCardBody>
    </BCard>
</template>
  
<script>
    definePageMeta({
        layout: "utility"
    });

    import PhotoCamera from '~/components/camera/PhotoCamera.vue';
    export default {
        components: {
            PhotoCamera
        },
        data(){
            return{
                nom: "",
                prenom: "",
                entreprise: "",
                telephone: "",
                typePiece: "",
                numPiece: "",
                visite: "",
                delegation: false,
                vehicule: false,
                chefEquipe: false,
                immatricule: "",
                codeVisite: "",
                photoPiece: ""

            }
        },
        methods: {
            handlePhoto(photo) {
                this.form.photo = photo;
            },
        },
    };

</script>

<style>
.bg-card {
    background-color: rgba(204, 200, 200, 0.5); /* Gris avec 50% de transparence */
}
#qr-topbar{
    margin-top: 8em;
  }

@media (max-width: 576px) {
  #qr-topbar{
    margin-top: 4em;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  #qr-topbar{
    margin-top: 4em;
  }
}

@media (min-width: 992px) {
 
}

</style>

  <!-- <style>
  .qr-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('/path/to/your/background-image.jpg'); 
    background-position: center;
  }
  
  
  .camera-box {
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8); 
    border-radius: 8px;
  }
  </style> -->
  