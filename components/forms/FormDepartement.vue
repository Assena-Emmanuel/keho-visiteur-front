<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";


export default{
  setup() {
    return { v$: useVuelidate() };
  },
  data(){
    return{
      libelleDepartement: this.formData.Libelle || "",
      codeDepartement: this.formData.Code ||  "",
      submitted: false,
      isEditMode: false
    }
  },
  validations: {
    libelleDepartement: {
      required,
    },
    codeDepartement: {
      required,
    },
  },

  props: {
    modelValue: Boolean,
    isEditMode: Boolean,
    selectedIndex: Number,  // L'index de l'élément à éditer
    formData: Object,
  
  },

  methods:{
    onSaveDepartement() {
      this.submitted = true;
      this.v$.$touch();
      if (this.v$.libelleDepartement.$error || this.v$.codeDepartement.$error) {
        return;
      }
    },
    resetForm() {
      // Reset all form fields and validation state
      this.libelleDepartement = '';
      this.codeDepartement = '';
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
      size="md"
      :title="isEditMode ? `Modifier le département ` : 'Création du département'" 
      title-class="font-18" 
      hide-footer
  >
  <BForm class="form-vertical px-3" role="form">
    <div class="mb-3">
      <label for="departement" style="font-size: 12px;">Libellé</label>
      <input 
        v-model="libelleDepartement" 
        type="text" class="form-control form-control-sm" 
        id="departement" 
        placeholder="" 
        :class="{
        'is-invalid': submitted && v$.libelleDepartement.$error,
        'border border-danger': submitted && v$.libelleDepartement.$error,
        'border border-dark': !(submitted && v$.libelleDepartement.$error)
        }"
      />
      <div v-if="submitted && v$.libelleDepartement.$error" class="invalid-feedback">
          <span v-if="v$.libelleDepartement.required.$invalid" class="font-size-12">champ obligatoire
          </span>
        </div>
    </div>

    <div class="mb-3">
      <label for="code" style="font-size: 12px;">Code </label>
      <div>
        <input 
          v-model="codeDepartement" 
          id="code" 
          class="form-control form-control-sm"  
          type="text"
          :class="{
          'is-invalid': submitted && v$.codeDepartement.$error,
          'border border-danger': submitted && v$.codeDepartement.$error,
          'border border-dark': !(submitted && v$.codeDepartement.$error)
        }">
        <div v-if="submitted && v$.codeDepartement.$error" class="invalid-feedback">
          <span v-if="v$.codeDepartement.required.$invalid" class="font-size-12">champ obligatoire
          </span>
        </div>
      </div>
    </div>

    <div class="mt-4 d-flex justify-content-center">
      <BButton v-if="!isEditMode" @click="onSaveDepartement" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        Enregistrer
      </BButton>
      <BButton v-if="isEditMode" @click="onUpdateDepartement" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        Modifier
      </BButton>
    </div>
  </BForm>
</BModal>
</template>