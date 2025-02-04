<template>

    <div class="mb-2"><span>Visites enregistrées</span></div>
    <div>
      <!-- Tableau des visiteurs -->
      <BRow>
        <BCol cols="12">
          <BCard no-body>
            <BCardBody>
                <BRow class="mb-3">
                    
                    <BCol cols="12">
                    <BFormSelect v-model="employeSelectionner" class="mt-4 border border-secondary":options="listEmploye" size="sm" />
                    </BCol>
                    
                </BRow>



                <BCardGroup deck>
                    <BCard header-class="header-bg" text-variant="white" header="Visiteur" class="text-center cardBody">
                        <BCardBody style="padding: 0;">
                            <div class="d-flex justify-content-center gap-3">
                                <div>
                                    <BImg thumbnail fluid src="/images/pages/personne.png" width="140" height="100" alt="Image 1" />
                                </div>
                                <div >
                                    <div>
                                        <div class="d-flex justify-content-between underLine font-size-12 text-dark">
                                            <div class=""><span>{{visiteur.nom}}</span></div>
                                            
                                        </div>

                                        <div class="d-flex justify-content-between underLine font-size-12 text-dark">
                                            <span>{{ visiteur.entreprise }}</span>
                                        </div>
                                        <div class="d-flex justify-content-between underLine font-size-12 text-dark">
                                            <span>{{ visiteur.contact }}</span>
                                        </div>

                                        <div class="d-flex justify-content-between underLine font-size-12  text-dark">
                                            <span>{{ visiteur.typePiece }}</span>
                                        </div>
                                        <div class="d-flex justify-content-between underLine font-size-12 text-dark">
                                            <span>{{ visiteur.numPiece }}</span>
                                        </div>
                                        <div class="d-flex justify-content-between underLine font-size-12 text-dark">
                                            <span>Visite{{ visiteur.visite }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center gap-5 text-dark">
                                <div class="underLine font-size-12">
                                    <span>Heure arrivée:  ---/--/---</span>
                                </div>
                                <div class="underLine font-size-12">
                                    <span>Heure départ:  ---/--/---</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between gap-5 underLine font-size-12 text-dark">
                                <div>
                                    <span>Numero Badge</span>
                                </div>
                                <div>
                                    <span>---/--/---</span>
                                </div>
                            </div>
                            
                        </BCardBody>
                    </BCard>

                    <BCard header-class="header-bg" text-variant="white" header="Hote" class="text-center cardBody">
                        <BCardBody style="padding: 0;">
                            <div class="d-flex justify-content-center gap-3">
                                <div>
                                    <BImg thumbnail fluid src="/images/pages/personne.png" width="140" height="100" alt="Image 1" />
                                </div>
                                <div >
                                    <div>
                                        <div class="font-size-12 text-dark">
                                            <div class="underLine d-flex justify-content-between">
                                                <div>Code Visite</div>
                                                <div>{{employe.codeVisite}}</div>
                                            </div>
                                            
                                        </div>
                                        <div class="font-size-12 text-dark">
                                            <div class="underLine text-start"><span>{{employe.nom}}</span></div>
                                        </div>

                                        <div class="underLine text-start font-size-12 text-dark">
                                            <span>{{ employe.Dept }}</span>
                                        </div>
                                        <div class="underLine d-flex justify-content-between text-dark">
                                            <div>Site:</div>
                                            <div>{{employe.site}}</div>
                                        </div>

                                        <div class="underLine d-flex justify-content-between text-dark">
                                            <div>Fixe:</div>
                                            <div>{{employe.fix}}</div>
                                        </div>
                                        <div class="underLine text-start font-size-12 text-dark">
                                            <span>{{ visiteur.numPiece }}</span>
                                        </div>
                                        <div class="underLine text-start font-size-12 text-dark">
                                            <span>Visite{{ visiteur.visite }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center gap-5 text-dark">
                                <div class="underLine font-size-12">
                                    <span>Heure de fin:</span>
                                </div>
                                <div class="underLine font-size-12">
                                    <span>---/--/---</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <BFormSelect v-model="planning" class="mt-4 border border-secondary":options="listplanning" size="sm" />
                            </div>
                            <BRow>
                                <BCol md="8" class=""><button class="btn btn-success">IMPRIMER LE ICKER</button></BCol>
                                <BCol md="4"><input v-model="nbTicket" type="number" class="form-control"></BCol>
                            </BRow>
                            
                        </BCardBody>
                    </BCard>
                </BCardGroup>

            </BCardBody>
          </BCard>
        </BCol>
      </BRow>
  </div>
</template>
<script>
export default {
    data() {
        return {
            nbTicket: 1,
            employeSelectionner:null,
            planning: null,
            listplanning:[
            {value: null, text: 'Planning'},
            ],
            listEmploye:[
                {value: null, text: 'Sélectionnez ou recherchez un employé'},
                {value: '1', text: 'AKA ANDRE'},
            ],
            visiteur: {
                nom: 'Koffi Jean',
                entreprise: 'KEHO GROUPE',
                contact: '+225 07 07 07 07 00',
                typePiece: "Carte nationale d'identité (CNI)",
                numPiece: 'C0078453691',
                visite:'',
                },
            employe: {
                codeVisite: 'DI003',
                nom: 'Koffi Jean',
                Dept: 'Dept-Informatique',
                site: "Abidjan Sud",
                fix: '27 22 22 22 22',

                },
    };
  },

    methods: {
        

    },
    computed: {
    
  },
  mounted() {

  },
}
</script>

<style>

.cardBody{
    background-color: #CCC;
}
.header-bg{
    background-color: #328CEB;
}
.underLine{
    border-bottom: 1px solid #FFF;
}
</style>