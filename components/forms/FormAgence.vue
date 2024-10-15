<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";


export default{
  setup() {
    return { v$: useVuelidate() };
  },
  data(){
    return{
        libelle: "",
        code: "",
        libelle: "",
        position: "",
        statut: "ACTIVE",
        submitted: false,
        isEditMode: false
    }
  },
  validations: {
    libelle: {
      required,
    },
    code: {
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
    onSaveslug() {
      this.submitted = true;
      this.v$.$touch();
      if (this.v$.libelle.$error || this.v$.code.$error) {
        return;
      }
    },
    resetForm() {
      // Reset all form fields and validation state
      this.libelle = '';
      this.code = '';
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
      :title="isEditMode ? `Modifier l'Agence` : 'Création de l\'Agence'" 
      title-class="font-18" 
      hide-footer
  >
  <BForm class="form-vertical" role="form">
    <div class="mb-2">
      <label for="slug" style="font-size: 12px;">Slug</label>
      <input 
        v-model="libelle" 
        type="text" class="form-control form-control-sm" 
        id="slug" 
        placeholder="" 
        :class="{
        'is-invalid': submitted && v$.libelle.$error,
        'border border-danger': submitted && v$.libelle.$error,
        'border border-dark': !(submitted && v$.libelle.$error)
        }"
      />
      <div v-if="submitted && v$.libelle.$error" class="invalid-feedback">
          <span v-if="v$.libelle.required.$invalid" class="font-size-12">champ obligatoire
          </span>
        </div>
    </div>

    <div class="mb-2">
      <label for="code" style="font-size: 12px;">Code </label>
      <div>
        <input 
          v-model="code" 
          id="code" 
          class="form-control form-control-sm"  
          type="text"
          :class="{
          'is-invalid': submitted && v$.code.$error,
          'border border-danger': submitted && v$.code.$error,
          'border border-dark': !(submitted && v$.code.$error)
        }">
        <div v-if="submitted && v$.code.$error" class="invalid-feedback">
          <span v-if="v$.code.required.$invalid" class="font-size-12">champ obligatoire
          </span>
        </div>
      </div>
    </div>

    <div class="mb-2">
      <label for="libelle" style="font-size: 12px;">Libellé </label>
      <div>
        <input 
          v-model="libelle" 
          id="libelle" 
          class="form-control form-control-sm"  
          type="text"
          :class="{
          'is-invalid': submitted && v$.libelle.$error,
          'border border-danger': submitted && v$.libelle.$error,
          'border border-dark': !(submitted && v$.libelle.$error)
        }">
        <div v-if="submitted && v$.libelle.$error" class="invalid-feedback">
          <span v-if="v$.libelle.required.$invalid" class="font-size-12">champ obligatoire
          </span>
        </div>
      </div>
    </div>

    <div class="mb-2">
      <label for="position" style="font-size: 12px;">Position </label>
      <div>
        <input 
          v-model="position" 
          id="position" 
          class="form-control form-control-sm"  
          type="text"
          :class="{
          'is-invalid': submitted && v$.position.$error,
          'border border-danger': submitted && v$.position.$error,
          'border border-dark': !(submitted && v$.position.$error)
        }">
        <div v-if="submitted && v$.position.$error" class="invalid-feedback">
          <span v-if="v$.position.required.$invalid" class="font-size-12">champ obligatoire
          </span>
        </div>
      </div>
    </div>

    <div class="mb-2">
        <label for="statut" style="font-size: 12px; font-weight: bolder" >Statut</label>
        <div class="input-group">
            <select v-model="statut" id="statut" class="form-select form-select-sm border border-black rounded-2" aria-label="Default select example" :class="{
            'is-invalid': submitted && v$.statut.$error
            }">
            <option value="ACTIVE">ACTIVE</option>
            <option value="DESACTIVE">DESACTIVE</option>

            </select>
            <!-- <div v-if="submitted && v$.service.$error" class="invalid-feedback">
            <span v-if="v$.service.required.$invalid">Service obligatoire
            </span>
            </div> -->
        </div>
    </div>
    <div class="mb-2">
      <label for="position" style="font-size: 12px;">Position </label>
      <div>
        <input 
          v-model="position" 
          id="position" 
          class="form-control form-control-sm"  
          type="text"
          :class="{
          'is-invalid': submitted && v$.position.$error,
          'border border-danger': submitted && v$.position.$error,
          'border border-dark': !(submitted && v$.position.$error)
        }">
        <div v-if="submitted && v$.position.$error" class="invalid-feedback">
          <span v-if="v$.position.required.$invalid" class="font-size-12">champ obligatoire
          </span>
        </div>
      </div>
    </div>

    <div class="mt-4 d-flex justify-content-center">
      <BButton v-if="!isEditMode" @click="onSaveslug" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        Enregistrer
      </BButton>
      <BButton v-if="isEditMode" @click="onUpdateslug" variant="primary" class="w-sm waves-effect waves-light btn btn-sm" >
        Modifier
      </BButton>
    </div>
  </BForm>
</BModal>
</template>