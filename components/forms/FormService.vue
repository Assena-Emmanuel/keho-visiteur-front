<script>
export default{
    data(){
        return{
            libelle: "",
            code: ""
        }
    }
}
</script>
<template>
    <BForm class="form-vertical" role="form">
      <div class="mb-3">
        <label for="departement" style="font-size: 12px;">Nom du Service</label>
        <input v-model="libelle" type="text" class="form-control border border-black form-control-sm" id="departement" placeholder="" />
        

        <!-- <div v-if="submitted && v$.email.$error" class="invalid-feedback">
          <span v-if="v$.email.email.$invalid">Email invalide
          </span>
          <span v-if="v$.email.required.$invalid">Email obligatoire
          </span>
        </div> -->
      </div>

      <div class="mb-3">
        <label for="code" style="font-size: 12px;">Code du Service</label>
        <div>
          <input 
            v-model="code" 
            id="code" 
            class="form-control form-control-sm border border-black"  
            type="text">

        </div>
        <!-- <div v-if="submitted && v$.password.$error" class="invalid-feedback">
          <span v-if="v$.password.required.$invalid">Mot de passe obligatoire
          </span>
        </div> -->
      </div>

      <div class="mt-4 ">
        <BButton variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
          enregistrer
        </BButton>
      </div>
    </BForm>

</template>