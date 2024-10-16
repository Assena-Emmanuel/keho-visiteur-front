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
      target: "",
      type: "",
      icon: "",
      position: "",
      name: "",
      statut: "",
      menu: "",
      submitted: false,
      isEditMode: false
    }
  },
  validations: {
    libelle: {
      required,
    },
    target: {
      required,
    },
    type: {
      required,
    },
    icon: {
      required,
    },
    position: {
      required,
    },
    name: {
      required,
    },
    menu: {
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
      if (this.v$.libelle.$error || 
        this.v$.target.$error || 
        this.v$.type.$error || 
        this.v$.icon.$error || 
        this.v$.position.$error || 
        this.v$.name.$error || 
        this.v$.menu.$error 
    ) {
        return;
      }
    },
    resetForm() {
      // Reset all form fields and validation state
        this.target = ""
        this.type = ""
        this.icon = "" 
        this.position = "" 
        this.name= "" 
        this.menu= "" 

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
      size="lg"
      :title="isEditMode ? `Modification du Menu ` : 'Création du Menu'" 
      title-class="font-18" 
      hide-footer
  >
  <BForm class="form-vertical  px-3" role="form">

    <BRow>
        <BCol md="6">
            <div class="mb-3">
            <label for="libelle" style="font-size: 12px;">Libellé</label>
            <input 
                v-model="libelle" 
                type="text" class="form-control form-control-sm" 
                id="departement" 
                placeholder="" 
                :class="{
                'is-invalid': submitted && v$.libelle.$error,
                'border border-danger': submitted && v$.libelle.$error,
                'border border-secondary': !(submitted && v$.libelle.$error)
                }"
            />
            <div v-if="submitted && v$.libelle.$error" class="invalid-feedback">
                <span v-if="v$.libelle.required.$invalid" class="font-size-12">champ obligatoire
                </span>
                </div>
            </div>
        </BCol>

        <BCol md="6">
            <div class="mb-3">
                <label for="target" style="font-size: 12px;">Target </label>
                <div>
                    <input 
                    v-model="target" 
                    id="target" 
                    class="form-control form-control-sm"  
                    type="text"
                    :class="{
                    'is-invalid': submitted && v$.target.$error,
                    'border border-danger': submitted && v$.target.$error,
                    'border border-secondary': !(submitted && v$.target.$error)
                    }">
                    <div v-if="submitted && v$.target.$error" class="invalid-feedback">
                    <span v-if="v$.target.required.$invalid" class="font-size-12">champ obligatoire
                    </span>
                    </div>
                </div>
            </div>
        </BCol>

        <BCol md="6">
            <div class="mb-3">
                <label for="type" style="font-size: 12px;">Type </label>
                <div class="input-group">
                    <select v-model="type" id="type" class="form-select form-select-sm border border-secondary rounded-2" aria-label="Default select example">
                        <option value="PARA">PARAMETRES</option>
                        <option value="SIDE">SIDEBAR</option>
                    </select>
                </div>
            </div>
        </BCol>
        <BCol md="6">
            <div class="mb-3">
                <label for="icon" style="font-size: 12px;">Icon </label>
                <div>
                    <input 
                    v-model="icon" 
                    id="icon" 
                    class="form-control form-control-sm"  
                    type="text"
                    :class="{
                    'is-invalid': submitted && v$.icon.$error,
                    'border border-danger': submitted && v$.icon.$error,
                    'border border-secondary': !(submitted && v$.icon.$error)
                    }">
                    <div v-if="submitted && v$.icon.$error" class="invalid-feedback">
                    <span v-if="v$.icon.required.$invalid" class="font-size-12">champ obligatoire
                    </span>
                    </div>
                </div>
            </div>
        </BCol>
        <BCol md="6">
            <div class="mb-3">
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
                    'border border-secondary': !(submitted && v$.position.$error)
                    }">
                    <div v-if="submitted && v$.position.$error" class="invalid-feedback">
                    <span v-if="v$.position.required.$invalid" class="font-size-12">champ obligatoire
                    </span>
                    </div>
                </div>
            </div>
        </BCol>
        <BCol md="6">
            <div class="mb-3">
                <label for="name" style="font-size: 12px;">Name </label>
                <div>
                    <input 
                    v-model="name" 
                    id="name" 
                    class="form-control form-control-sm"  
                    type="text"
                    :class="{
                    'is-invalid': submitted && v$.name.$error,
                    'border border-danger': submitted && v$.name.$error,
                    'border border-secondary': !(submitted && v$.name.$error)
                    }">
                    <div v-if="submitted && v$.name.$error" class="invalid-feedback">
                    <span v-if="v$.name.required.$invalid" class="font-size-12">champ obligatoire
                    </span>
                    </div>
                </div>
            </div>
        </BCol>
        <BCol md="6">
            <div class="mb-3">
                <label for="position" style="font-size: 12px;">Statut </label>
                <div class="input-group">
                    <select v-model="statut" id="statut" class="form-select form-select-sm border border-secondary rounded-2" aria-label="Default select example">
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="DESACTIVE">DESACTIVE</option>
                    </select>
                </div>
            </div>
        </BCol>
        <BCol md="6">
            <div class="mb-3">
                <label for="menu" style="font-size: 12px;">Menu </label>
                <div class="input-group">
                    <select v-model="menu" id="menu" class="form-select form-select-sm border border-black rounded-2" aria-label="Default select example">
                        <option value="AGENDA">AGENDA</option>
                        <option value="PARAMETRE">PARAMETRE</option>
                    </select>
                </div>
            </div>
        </BCol>

    </BRow>

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