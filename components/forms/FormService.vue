<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default{
  setup() {
    return { v$: useVuelidate() };
  },

  data(){
      return{
        libelleService: "",
        codeService: "",
        submitted: false,
        isEditMode: false
      }
  },

  validations: {
    libelleService: {
      required,
    },
    codeService: {
      required,
    },
  },

  props: {
    modelValue: Boolean,
    isEditMode: Boolean,
    dataUpdate: Object,  // L'index de l'élément à éditer
    data: Array,
  },
  mounted(){
    if(this.dataUpdate){
      alert("ok")
    }
  },
  methods:{
    onSaveService() {
      this.submitted = true;
      this.v$.$touch();
      if (this.v$.libelleService.$error || this.v$.codeService.$error) {
        return;
      }
    },
    resetForm() {
      this.libelleService = '';
      this.codeService = '';
      this.submitted = false;

      if (this.$v) {
        this.$v.$reset();
      }
    },
  }

}
</script>
<template>
  <BModal 
      @hide="resetForm" 
      :modelValue="modelValue" 
      @update:modelValue="$emit('update:modelValue', $event)"
      size="md"
      :title="isEditMode ? `Modifier le service ` : 'Création du service'" 
      title-class="font-18" 
      hide-footer
  >
  <BForm class="form-vertical px-3" role="form">
    <div class="mb-3">
      <label for="service" style="font-size: 12px;">Libellé</label>
      <input 
        v-model="libelleService" 
        type="text" class="form-control form-control-sm" 
        id="service" 
        placeholder="" 
        :class="{
        'is-invalid': submitted && v$.libelleService.$error,
        'border border-danger': submitted && v$.libelleService.$error,
        'border border-dark': !(submitted && v$.libelleService.$error)
        }"
      />
      <div v-if="submitted && v$.libelleService.$error" class="invalid-feedback">
          <span v-if="v$.libelleService.required.$invalid" class="font-size-12">champ obligatoire
          </span>
        </div>
    </div>

    <div class="mb-3">
      <label for="code" style="font-size: 12px;">Code </label>
      <div>
        <input 
          v-model="codeService" 
          id="code" 
          class="form-control form-control-sm"  
          type="text"
          :class="{
          'is-invalid': submitted && v$.codeService.$error,
          'border border-danger': submitted && v$.codeService.$error,
          'border border-dark': !(submitted && v$.codeService.$error)
        }">
        <div v-if="submitted && v$.codeService.$error" class="invalid-feedback">
          <span v-if="v$.codeService.required.$invalid" class="font-size-12">champ obligatoire
          </span>
        </div>
      </div>
    </div>

    <div class="mt-4 d-flex justify-content-center">
      <BButton v-if="!isEditMode" @click="onSaveService" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        Enregistrer
      </BButton>
      <BButton v-if="isEditMode" @click="onUpdate" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        Modifier
      </BButton>
    </div>
  </BForm>
</BModal>
</template>