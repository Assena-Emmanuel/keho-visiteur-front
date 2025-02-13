<template>
    <BCard
        no-body 
        class="mx-3 border-0 bg-card"
        title="Je m'identifie"
        
        id="qr-topbar"
    >
    
    <!-- Test Modal -->


        <BCardBody>
            <h3 class="text-center">Je m'identifie</h3>
            <hr>
            <BForm class="form-vertical  px-3" role="form">
                <BRow>
                    <BCol sm="4" class="mb-3">
                        <label for="civilite" style="font-size: 12px; font-weight: bolder">Civilité<strong class="text-danger">*</strong></label>
                        <div class="input-group">
                        <select v-model="civilite" id="civilite" class="form-select form-select-sm border border-secondary rounded-2" aria-label="Default select example" 
                        :class="{
                            'is-invalid': submitted && v$.civilite.$error,
                            'border border-danger': submitted && v$.civilite.$error,
                            'border border-secondary': !(submitted && v$.civilite.$error)
                            }"
                        >
                            <option value="" selected>civilité...</option>
                            <option value="M.">M.</option>
                            <option value="Mme">Mme</option>
                            <option value="Mlle">Mlle</option>
                        </select>
                        <div v-if="submitted && v$.civilite.$error" class="invalid-feedback">
                            <span v-if="v$.civilite.required.$invalid">champ obligatoire
                            </span>
                        </div>
                        </div>
                    </BCol>

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
                            <label for="email" class="fw-bold text-black" style="font-size: 12px;">E-mail <strong class="text-danger">*</strong></label>
                            <div>
                                <input 
                                v-model="email" 
                                id="email" 
                                placeholder="exemple@gmail.com"
                                class="form-control form-control-sm"  
                                type="email" 
                                :class="{
                                'is-invalid': submitted && v$.email.$error,
                                'border border-danger': submitted && v$.email.$error,
                                'border border-secondary': !(submitted && v$.email.$error)
                                }">
                                <div v-if="submitted && v$.email.$error" class="invalid-feedback">
                                    <span v-if="v$.email.required.$invalid" class="font-size-12">champ obligatoire
                                    </span>
                                    <span v-if="v$.email.email.$invalid">Email invalide
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
                                    <option value="1">SUR RENDEZ-VOUS</option>
                                    <option value="2">INOPINÉE</option>
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
                            <label for="codeVisite" class="fw-bold text-black" style="font-size: 12px;">Code de Visite <strong class="text-danger">*</strong></label>
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


                    <BCol md="4">
                        <div class="mb-3">
                            <label for="codeVisite" class="fw-bold text-black" style="font-size: 12px;">Agence <strong class="text-danger">*</strong></label>
                            <div>
                                <input 
                                v-model="agence" 
                                id="agence" 
                                class="form-control form-control-sm"  
                                type="text"
                                :class="{
                                'is-invalid': submitted && v$.agence.$error,
                                'border border-danger': submitted && v$.agence.$error,
                                'border border-secondary': !(submitted && v$.agence.$error)
                                }">
                                <div v-if="submitted && v$.agence.$error" class="invalid-feedback">
                                <span v-if="v$.agence.required.$invalid" class="font-size-12">champ obligatoire
                                </span>
                                </div>
                            </div>
                        </div>
                    </BCol>


                    <BCol v-if="vehicule" md="4">
                        <div  class="mb-3">
                            <label for="immatricule" class="fw-bold text-black" style="font-size: 12px;">Immatricule <strong class="text-danger">*</strong></label>
                            <div>
                                <input 
                                v-model="immatricule" 
                                id="immatricule" 
                                class="form-control form-control-sm w-100"  
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
                    

                    <BRow class="d-flex flex-wrap">
                    <BCol md="4">
                        <BRow>
                            <BCol col="6">
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
                            <BCol col="6">
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
                        </BRow>
                    </BCol>
                    </BRow>
                    <BRow>   
                        <BCol  v-if="delegation">
                            <BFormCheckbox
                                id="chefEquipe"
                                v-model="chefEquipe"
                                name="chefEquipe"
                                value="true"
                                unchecked-value="false"
                                class="border border-secondary"
                            
                            >
                                <label for="chefEquipe" class="fw-bold text-black">Délégué(e)</label>
                            </BFormCheckbox>
                        </BCol>
                    </BRow>

                    <hr>
                    <BRow class="d-flex align-items-center">
                        <BCol col="4">
                            <BFormCheckbox
                                id="entreprise"
                                v-model="isEntreprise"
                                @click="isEntreprise=!isEntreprise"
                                class="border border-secondary"
                                
                                
                            >
                                <label for="vehicule" class="fw-bold text-black">Entreprise </label>
                            </BFormCheckbox>
                        </BCol>
                        <BCol md="4" v-if="isEntreprise">
                            <div class="mb-3">
                                <label for="entreprise" class="fw-bold text-black" style="font-size: 12px;">Entreprise <strong class="text-danger">*</strong></label>
                                <div>
                                    <input 
                                        v-model="entreprise" 
                                        id="entreprise" 
                                        placeholder="NOM DE L'ENTREPRISE"
                                        class="form-control form-control-sm"  
                                        type="text"
                                    >

                                </div>
                            </div>
                        </BCol>
                        <BCol md="4" v-if="isEntreprise">
                            <div class="mb-3">
                                <label for="entreprise" class="fw-bold text-black" style="font-size: 12px;">Sigle de l'entreprise </label>
                                <div>
                                    <input 
                                        v-model="sigle" 
                                        id="sigle" 
                                        placeholder="Sigle"
                                        class="form-control form-control-sm"  
                                        type="text"
                                    >

                                </div>
                            </div>
                        </BCol>
                    </BRow>
                    
                    
                    <BRow>
                        
                    </BRow>
                    
                </BRow>
                <hr>
                <BRow>
                    
                    <div class="mb-3">
                        <ClientOnly>
                            <vue-web-cam v-model:rectoImage="rectoImage" v-model:versoImage="versoImage" />
                        </ClientOnly>
                    </div>
                   <div class="alert alert-danger" v-if="submitted && (!rectoImage || !versoImage)"> Photo de la piece (recto et verso) obligatoire</div>
                </BRow>


                <!-- Debugging log -->
                <p>Recto Image: {{ rectoImage ? rectoImage.name : 'Aucune image' }}</p>
                <p>Verso Image: {{ versoImage ? versoImage.name : 'Aucune image' }}</p>

                <div class="mt-4 d-flex justify-content-center">

                <BButton :loading="loading" loading-text="Enregistrement ..." @click="onSaveVisiteur" variant="primary" class="w-sm waves-effect waves-light btn btn-lg" >
                    ENREGISTRER
                </BButton>


                </div>
                </BForm>

        </BCardBody>
    </BCard>
</template>
  
<script>
    import { useVuelidate} from "@vuelidate/core";
    import Visiteur from "~/components/detail/Visiteur.vue";
    import { email, required } from "@vuelidate/validators";
    import { useApi } from '~/components/api/useApi';
    import apiClient from '~/components/api/intercepteur';
    import Swal from "sweetalert2";

    definePageMeta({
        layout: "utility"
    });
    
    export default {
        setup() {
            return { v$: useVuelidate(),  };
        },

        mounted() {
            

        },

        components: {
            Visiteur,
        },

        data(){
            return{
                detailModal:true,
                loading: false,
                submitted: false,
                agence: "",
                nom: "",
                sigle: "",
                prenom: "",
                entreprise: "",
                telephone: "",
                typePiece: "",
                numPiece: "",
                civilite: "",
                visite: "",
                delegation: false,
                vehicule: false,
                chefEquipe: false,
                immatricule: "",
                codeVisite: "",
                email: "",
                isEntreprise: false,
                rectoImage: null,
                versoImage: null
            }
        },
        
        validations: {
            nom: {
                required,
            },
            rectoImage: {
                required,
            },
            versoImage: {
                required,
            },
            agence: {
                required,
            },
            civilite: {
                required,
            },
            codeVisite: {
                required,
            },
            email: {
                required,
                email
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

            alertMessage(message, icon = "error") {
                Swal.fire({
                position: "top",
                icon: icon, // Vous pouvez aussi écrire `icon` directement ici
                text: message,
                showConfirmButton: false,
                timer: 2000,
                customClass: {
                    popup: 'custom-popup',
                    icon: 'custom-icon',
                    title: 'custom-title'
                }
                })
            },

            async onSaveVisiteur(){
                this.submitted = true;
                this.v$.$touch();
                
                console.log("verso --------- "+JSON.stringify(this.versoImage)+"(---------) recto--------"+this.rectoImage.name)
                if (this.v$.nom.$error || 
                    this.v$.prenom.$error || 
                    this.v$.typePiece.$error ||
                    this.v$.telephone.$error ||
                    this.v$.numPiece.$error ||
                    this.v$.codeVisite.$error ||
                    this.v$.email.$error ||
                    this.v$.civilite.$error ||
                    this.v$.rectoImage.$error ||
                    this.v$.versoImage.$error ||
                    (this.vehicule && this.v$.immatricule.$error)
                ) {
                    return;
                }else{
                    this.submitted = false
                    this.loading = true
                    try{

                        if (!this.rectoImage) {
                            console.error("Le fichier recto est manquant.");
                            return; // Empêche l'envoi si le fichier recto est manquant
                        }

                        if (!this.versoImage) {
                            console.error("Le fichier verso est manquant.");
                            return; // Empêche l'envoi si le fichier verso est manquant
                        }

                        console.log("type----------------------------: "+typeof this.rectoImage)

                        const formData = {
                            nom: this.nom,
                            prenom: this.prenom,
                            email: this.email,  // Exemple de valeur pour position
                            telephone: this.telephone,
                            entreprise: this.entreprise,
                            entreprise_sigle: this.sigle,
                            type_piece: this.typePiece,
                            numero_piece: this.numPiece,
                            type_fvisite: this.visite,
                            delegation: this.delegation,
                            vehicule: this.vehicule,
                            immatriculation: this.immatricule,
                            chef_equipe: this.chefEquipe,
                            code_visite: this.codeVisite,
                            agence: this.agence,
                            image_p: this.rectoImage,
                            image_v: this.versoImage,
                        }

                        
                        console.log("Start--------------- : 1"+JSON.stringify(this.rectoImage)+" 2-- "+JSON.stringify(this.versoImage));
                        const response = await apiClient.post('/fvisites', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },

                        });

                        // Vérification de la réponse
                        if (!response.data.error) {
                        console.log("visite--------------- : ",JSON.stringify( response.data)[0]);
                        this.loading = false
                        
                        this.alertMessage(response.data.message, 'success')

                        this.$router.push({
                            path: "/visiteur-save"
                        });

                        } else {
                        console.error(response.data);
                        this.alertMessage(response.data.message, 'error')
                        }

                        
                    }catch(error){
                        console.error("Error a l'enregistrement -------------------"+error);
                    }finally{
                        this.loading = false
                        
                        
                    }

                    
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

/* Alert */
.custom-popup {
  display: flex;
  align-items: center;
  padding: 10px;
}

/* Classe pour l'icône */
.custom-icon {
  font-size: 10px;
  float: left;
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
  