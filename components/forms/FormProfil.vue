<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";


export default{
  setup() {
    return { v$: useVuelidate() };
  },
  data(){
    return{
      libelleProfil: "",
      codeProfil: "",
      submitted: false,
      isEditMode: false
    }
  },
  validations: {
    libelleProfil: {
      required,
    },
    codeProfil: {
      required,
    },
  },

  props: {
    modelValue: Boolean,
    isEditMode: Boolean,
    selectedIndex: Number,  // L'index de l'élément à éditer
    data: Array,
  
  },

  methods:{
    onSaveprofil() {
      this.submitted = true;
      this.v$.$touch();
      if (this.v$.libelleProfil.$error || this.v$.codeProfil.$error) {
        return;
      }
    },
    resetForm() {
      // Reset all form fields and validation state
      this.libelleProfil = '';
      this.codeProfil = '';
      this.submitted = false;
      // Reset validation (if using Vuelidate or similar)
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
      size="sm"
      :title="isEditMode ? `Modifier le profil ${selectedIndex}` : 'Création du profil'" 
      title-class="font-18" 
      hide-footer
  >
  <BForm class="form-vertical" role="form">
    <div class="mb-3">
      <label for="profil" style="font-size: 12px;">Libellé</label>
      <input 
        v-model="libelleProfil" 
        type="text" class="form-control form-control-sm" 
        id="profil" 
        placeholder="" 
        :class="{
        'is-invalid': submitted && v$.libelleProfil.$error,
        'border border-danger': submitted && v$.libelleProfil.$error,
        'border border-dark': !(submitted && v$.libelleProfil.$error)
        }"
      />
      <div v-if="submitted && v$.libelleProfil.$error" class="invalid-feedback">
          <span v-if="v$.libelleProfil.required.$invalid" class="font-size-12">champ obligatoire
          </span>
        </div>
    </div>

    <div class="mb-3">
      <label for="code" style="font-size: 12px;">Code </label>
      <div>
        <input 
          v-model="codeProfil" 
          id="code" 
          class="form-control form-control-sm"  
          type="text"
          :class="{
          'is-invalid': submitted && v$.codeProfil.$error,
          'border border-danger': submitted && v$.codeProfil.$error,
          'border border-dark': !(submitted && v$.codeProfil.$error)
        }">
        <div v-if="submitted && v$.codeProfil.$error" class="invalid-feedback">
          <span v-if="v$.codeProfil.required.$invalid" class="font-size-12">champ obligatoire
          </span>
        </div>
      </div>
    </div>

    <div class="mt-4 d-flex justify-content-center">
      <BButton v-if="!isEditMode" @click="onSaveprofil" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        Enregistrer
      </BButton>
      <BButton v-if="isEditMode" @click="onUpdateprofil" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        Modifier
      </BButton>
    </div>
  </BForm>
</BModal>
</template>