<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      submitted: false,
      isSuccess: false
    };
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    onReset() {
      this.submitted = true;
      this.isSuccess = false;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.isSuccess = true;
      }
    }
  }
};
</script>

<template>
  <BRow class="justify-content-center">
    <BCol md="8" lg="6" cols="xl-5">
      <BCard no-body>
        <BCardBody class="p-4">
          <div class="text-center mt-2">
            <h5 class="text-primary">Reset Password</h5>
            <p class="text-muted">Reset Password with Minible.</p>
          </div>
          <div class="p-2 mt-4">
            <div class="alert alert-success text-center mb-4" role="alert">
              Enter your Email and instructions will be sent to you!
            </div>
            <div v-if="isSuccess" class="alert alert-success text-center mb-4" role="alert">
              Reset link are sended to your mailbox, check there first
            </div>
            <BForm>
              <div class="mb-3">
                <label for="useremail">Email</label>
                <input v-model="email" type="email" class="form-control" id="useremail" placeholder="Enter email" :class="{
                  'is-invalid': v$.email.$error
                }" />
                <div v-if="submitted && v$.email.$error" class="invalid-feedback">
                  <span v-if="v$.email.email.$invalid">Email is not valid
                  </span>
                  <span v-if="v$.email.required.$invalid">Please Enter Your Email
                  </span>
                </div>
              </div>

              <div class="mt-3 text-end">
                <BButton variant="primary" class="w-sm waves-effect waves-light" @click="onReset">
                  Reset
                </BButton>
              </div>

              <div class="mt-4 text-center">
                <p class="mb-0">
                  Remember It ?

                  <nuxt-link to="/login" class="fw-medium text-primary">Signin</nuxt-link>
                </p>
              </div>
            </BForm>
          </div>
        </BCardBody>
      </BCard>
      <div class="mt-5 text-center">
        <p>
          © {{ new Date().getFullYear() }} Minible. Crafted with
          <i class="mdi mdi-heart text-danger"></i> by Themesbrand
        </p>
      </div>
    </BCol>
  </BRow>
</template>
