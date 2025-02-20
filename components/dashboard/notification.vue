<template>
    <BModal 
      :modelValue="afficherModalNotification" 
      title="Notification et envoi du visiteur" 
      hide-footer
      no-close-on-backdrop
      @hide="hide"
      @update:modelValue="updateModalVisibility"
    >
      <div class="d-flex justify-content-center gap-3 pb-2">
        <div style="height: 100%;">
          <BImg thumbnail fluid src="/images/pages/personne.png" width="140" height="100" alt="Image 1" />
        </div>
        <div >
          <div>
            <p>Bonjour monsieur <strong>{{ visiteur.nomEmploye }}</strong><br>Vous avez un visiteur en Salle</p>
          </div>
          <div>
            <div class="d-flex justify-content-between line font-size-12 line">
              <span >Nom & Prénom</span>
              <span>{{visiteur.nom}}</span>
            </div>

            <div class="d-flex justify-content-between line font-size-12 line">
              <span>Entreprise</span>
              <span>{{ visiteur.entreprise }}</span>
            </div>

            <div class="d-flex justify-content-between line font-size-12 line">
              <span>Contact</span>
              <span>{{ visiteur.contact }}</span>
            </div>
          </div>
        </div>
      </div>
    </BModal>
</template>
<script setup>
  import { defineModel, ref, watch } from 'vue';

  // const firstName = defineModel('firstName')
  // const lastName = defineModel('lastName')

  const afficherModalNotification = defineModel('afficherModalNotification')
  const visiteur = defineModel('visiteur')

  // const updateModalVisibility = (newVisibility) => {
  //   afficherModalNotification.value = newVisibility;
  // };
  const hide = () =>{
    afficherModalNotification.value = false
    visiteur.value = {}
  }

</script>
<style>
.line{
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>