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
                <label for="departement" style="font-size: 12px;">Nom du Département</label>
                <input v-model="libelle" type="text" class="form-control border border-black form-control-sm" id="departement" placeholder="" />
              </div>

              <div class="mb-3">
                <label for="code" style="font-size: 12px;">Code du Département</label>
                <div>
                  <input 
                    v-model="code" 
                    id="code" 
                    class="form-control form-control-sm border border-black"  
                    type="text">

                </div>

              </div>

              <div class="mt-4 ">
                <BButton variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
                  enregistrer
                </BButton>
              </div>
    </BForm>

</template>