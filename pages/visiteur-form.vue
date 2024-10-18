<template>
    <BCard
        no-body 
        class="mx-3 border-0 bg-card"
        title="Je m'identifie"
        
        id="qr-topbar"
    >
        
        <BCardBody>
            <h3 class="text-center">Je m'identifie</h3>
            <hr>
            <BForm class="form-vertical  px-3" role="form">
                <BRow>
                    <BCol md="4">
                        <div class="mb-3">
                        <label for="nom" class="fw-bold text-black" style="font-size: 12px;">Nom <strong class="text-danger">*</strong></label>
                        <input 
                            v-model="nom" 
                            type="text" class="form-control form-control-sm" 
                            id="departement" 
                            placeholder="VOTRE NOM" 
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

                    <BCol md="4">
                        <div class="mb-3">
                            <label for="prenom" class="fw-bold text-black" style="font-size: 12px;">Prénoms <strong class="text-danger">*</strong></label>
                            <div>
                                <input 
                                v-model="prenom" 
                                id="prenom" 
                                placeholder="VOTRE PRENOMS"
                                class="form-control form-control-sm"  
                                type="text"
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
                    <BCol md="4">
                        <div class="mb-3">
                            <label for="entreprise" class="fw-bold text-black" style="font-size: 12px;">Entreprise </label>
                            <div>
                                <input 
                                    v-model="entreprise" 
                                    id="entreprise" 
                                    placeholder="NOM DE L'ENTREPRISE"
                                    class="form-control form-control-sm"  
                                    type="text"
                                >
                                <!-- <div v-if="submitted && v$.entreprise.$error" class="invalid-feedback">
                                <span v-if="v$.entreprise.required.$invalid" class="font-size-12">champ obligatoire
                                </span>
                                </div> -->
                            </div>
                        </div>
                    </BCol>

                    <BCol md="4">
                        <div class="mb-3">
                            <label for="telephone" class="fw-bold text-black" style="font-size: 12px;">Téléphone <strong class="text-danger">*</strong></label>
                            <div>
                                <input 
                                v-model="telephone" 
                                id="telephone" 
                                placeholder="VOTRE NUMERO DE TELEPHONE"
                                class="form-control form-control-sm"  
                                type="tel"
                                maxlength="10" 
                                @input="telephone = $event.target.value.replace(/\D/g, '')" 
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

                    <BCol md="4">
                        <div class="mb-3">
                            <label for="typePiece" class="fw-bold text-black" style="font-size: 12px;">Type de Pièce <strong class="text-danger">*</strong></label>
                            <div class="input-group">
                                <select 
                                    v-model="typePiece" 
                                    id="typePiece" 
                                    class="form-select form-select-sm border border-secondary rounded-2" 
                                    :class="{
                                        'is-invalid': submitted && v$.typePiece.$error,
                                        'border border-danger': submitted && v$.typePiece.$error,
                                        'border border-secondary': !(submitted && v$.typePiece.$error)
                                        }"
                                >
                                    <option value="">SÉLECTIONNER LE TYPE DE PIÈCE...</option>
                                    <option value="CNI">Carte Nationale d'Identité (CNI)</option>
                                    <option value="PASSPORT">PASSPORT</option>
                                </select>
                                <div v-if="submitted && v$.typePiece.$error" class="invalid-feedback">
                                    <span v-if="v$.typePiece.required.$invalid" class="font-size-12">champ obligatoire
                                    </span>
                                </div>
                            </div>
                            
                        </div>
                    </BCol>
                    <BCol md="4">
                        <div class="mb-3">
                            <label for="numPiece" class="fw-bold text-black" style="font-size: 12px;">N° Pièce <strong class="text-danger">*</strong></label>
                            <div>
                                <input 
                                v-model="numPiece" 
                                id="numPiece" 
                                placeholder="NUMERO DE LA PIECE"
                                class="form-control form-control-sm"  
                                type="text"
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

                    <BCol md="4">
                        <div class="mb-3">
                            <label for="visite" class="fw-bold text-black" style="font-size: 12px;">Type de Visite <strong class="text-danger">*</strong></label>
                            <div class="input-group">
                                <select 
                                    v-model="visite" 
                                    id="visite" 
                                    class="form-select form-select-sm border border-secondary rounded-2" 
                                    aria-label="Default select example"
                                    :class="{
                                    'is-invalid': submitted && v$.visite.$error,
                                    'border border-danger': submitted && v$.visite.$error,
                                    'border border-secondary': !(submitted && v$.visite.$error)
                                }"
                                >
                                    <option value="">SÉLECTIONNER LE TYPE DE VISITE...</option>
                                    <option value="RDV">SUR RENDEZ-VOUS</option>
                                    <option value="INOPINEE">INOPINÉE</option>
                                </select>
                                <div v-if="submitted && v$.visite.$error" class="invalid-feedback">
                                    <span v-if="v$.visite.required.$invalid" class="font-size-12">champ obligatoire
                                    </span>
                                </div>
                            </div>
                        </div>
                    </BCol>

                    <BCol md="4">
                        <div class="mb-3">
                            <label for="codeVisite" class="fw-bold text-black" style="font-size: 12px;">Code de Visite </label>
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
                                }">
                                <div v-if="submitted && v$.codeVisite.$error" class="invalid-feedback">
                                <span v-if="v$.codeVisite.required.$invalid" class="font-size-12">champ obligatoire
                                </span>
                                </div>
                            </div>
                        </div>
                    </BCol>

                    <BRow>
                    <BCol md="4">
                        <BRow>
                            <BCol md="4">
                                <BFormCheckbox
                                    id="delegation"
                                    v-model="delegation"
                                    name="delegation"
                                    value="true"
                                    @click="delegation=!delegation"
                                    class="border border-secondary"
                                >
                                    <label for="delegation" class="fw-bold text-black">Délégation</label>
                                </BFormCheckbox>
                            </BCol>
                            <BCol  v-if="delegation">
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
                        </BRow>
                    </BCol>
                    <BCol md="4">
                        <BRow>
                            <BCol>
                                <BFormCheckbox
                                    id="vehicule"
                                    v-model="vehicule"
                                    name="vehicule"
                                    @click="vehicule=!vehicule"
                                    class="border border-secondary"
                                    
                                    
                                >
                                    <label for="vehicule" class="fw-bold text-black">Véhicule </label>
                                </BFormCheckbox>
                            </BCol>
                            <BCol v-if="vehicule" md="12">
                                <div  class="mb-3">
                                    <label for="immatricule" class="fw-bold text-black" style="font-size: 12px;">Immatricule <strong class="text-danger">*</strong></label>
                                    <div>
                                        <input 
                                        v-model="immatricule" 
                                        id="immatricule" 
                                        class="form-control form-control-sm"  
                                        type="text"
                                        placeholder="IMMATRICULATION DU VÉHICULE"
                                        :class="{
                                        'is-invalid': submitted && v$.immatricule.$error,
                                        'border border-danger': submitted && v$.immatricule.$error,
                                        'border border-secondary': !(submitted && v$.immatricule.$error)
                                        }">
                                        <div v-if="submitted && vehicule && v$.immatricule.$error" class="invalid-feedback">
                                            <span v-if="v$.immatricule.required.$invalid" class="font-size-12">champ obligatoire
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </BCol>
                        </BRow>
                    </BCol>
                    </BRow>
                    

                    
                    <!-- <BCol md="6">
                        <div class="mb-3">
                            <PhotoCamera @photo-captured="handlePhoto" />
                        </div>
                    </BCol> -->
                    
            
                </BRow>

                <div class="mt-4 d-flex justify-content-center">
                <BButton @click="onSaveVisiteur" variant="primary" class="w-sm waves-effect waves-light btn btn-lg" >
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

    import { useVuelidate } from "@vuelidate/core";
    import { required } from "@vuelidate/validators";
    import PhotoCamera from '~/components/camera/PhotoCamera.vue';
    export default {
        setup() {
            return { v$: useVuelidate() };
        },
        components: {
            PhotoCamera
        },
        data(){
            return{
                submitted: false,
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
        
        validations: {
            nom: {
                required,
            },
            prenom: {
                required,
            },
            telephone: {
                required,
            },
            typePiece: {
                required,
            },
            numPiece: {
                required,
            },
            visite: {
                required,
            },
            immatricule: {
                required,
            },

        },
        methods: {
            handlePhoto(photo) {
                this.form.photo = photo;
            },
            onSaveVisiteur(){
                this.submitted = true;
                this.v$.$touch();
                if (this.v$.nom.$error || 
                    this.v$.prenom.$error || 
                    this.v$.typePiece.$error ||
                    this.v$.telephone.$error ||
                    this.v$.numPiece.$error ||
                    (this.vehicule && this.v$.immatricule.$error)
                ) {
                    return;
                }else{
                    this.submitted = false
                    this.$router.push({
                        path: "/visiteur-save"
                    });
                }
            },
        },
    };

</script>

<style>
.bg-card {
    background-color: rgba(255, 255, 255, 0.7); 
/* Gris avec 50% de transparence */
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
  