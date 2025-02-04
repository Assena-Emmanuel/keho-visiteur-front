<script>
import { data } from '../parametres/useData';

export default{
    props:{
        delegation: true,
    }
}
</script>
<template>
    <div>
        <div v-if="delegation">
          <div class="d-flex justify-content-between line font-size-12 line">
            <span >Nom & Prénom</span>
            <span>AKA MARC</span>
          </div>
          <div class="d-flex justify-content-between line font-size-12 line">
            <span >Entreprise</span>
            <span>Keho-Goupe</span>
          </div>
          <div class="d-flex justify-content-between line font-size-12 line">
            <span >Téléphone</span>
            <span>000000000</span>
          </div>
          <div class="d-flex justify-content-between line font-size-12 line">
            <span >E-mail</span>
            <span>ahsgss@gmail.com</span>
          </div>
          <div class="d-flex justify-content-between line font-size-12 line">
            <span >Type de pièce</span>
            <span>CNI</span>
          </div>
          <div class="d-flex justify-content-between line font-size-12 line">
            <span >Numéro de pièce</span>
            <span>C000233461</span>
          </div>
          <div class="d-flex justify-content-between line font-size-12 line">
            <span >Code de visite</span>
            <span>VRT-xxxx</span>
          </div>
        </div>
        <div v-else></div>
    </div>  
</template>