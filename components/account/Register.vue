<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations: {
    email: {
      required,
      email
    },
    username: {
      required
    },
    password: {
      required
    }
  },
  data() {
    return {
      email: "",
      username: "",
      password: "",
      submitted: false,
      isSuccess: false,
      processing: false
    };
  },
  methods: {
    onRegister() {
      this.isSuccess = false;
      this.submitted = true;
      this.processing = true;
      this.v$.$touch();
      if (this.v$.$invalid) {
        this.processing = false;
        return;
      } else {
        this.submitted = false;
        setTimeout(() => {
          this.isSuccess = true;
          this.processing = false;

          this.email = "";
          this.username = "";
          this.password = "";
        }, 2000);
      }
    }
  }
};
</script>

<template>
  <BRow class="align-items-center justify-content-center">
    <BCol md="8" lg="6" cols="xl-5">
      <BCard no-body>
        <BCardBody class="p-4">
          <div class="text-center mt-2">
            <h5 class="text-primary">Register Account</h5>
            <p class="text-muted">Get your free Minible account now.</p>
          </div>
          <div v-if="isSuccess" class="alert alert-success text-center mt-4" role="alert">
            Reset link are sended to your mailbox, check there first
          </div>
          <div class="p-2">
            <BForm>
              <div class="mb-3">
                <label for="useremail">Email</label>
                <input v-model="email" type="email" class="form-control" id="useremail" placeholder="Enter email" :class="{
                  'is-invalid': submitted && v$.email.$error
                }" />
                <div v-if="submitted && v$.email.$error" class="invalid-feedback">
                  <span v-if="v$.email.email.$invalid">Email is not valid
                  </span>
                  <span v-if="v$.email.required.$invalid">Please Enter Your Email
                  </span>
                </div>
              </div>

              <div class="mb-3">
                <label for="username">Username</label>
                <input v-model="username" type="text" class="form-control" id="username" placeholder="Enter username" :class="{
                  'is-invalid': submitted && v$.username.$error
                }" />
                <div v-if="submitted && v$.username.$error" class="invalid-feedback">
                  <span v-if="v$.username.required.$invalid">Please Enter Your username
                  </span>
                </div>
              </div>

              <div class="mb-3">
                <label for="userpassword">Password</label>
                <input v-model="password" type="password" class="form-control" id="userpassword" placeholder="Enter password" :class="{
                  'is-invalid': submitted && v$.password.$error
                }" />
                <div v-if="submitted && v$.password.$error" class="invalid-feedback">
                  <span v-if="v$.password.required.$invalid">Please Enter Your password
                  </span>
                </div>
              </div>

              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="auth-terms-condition-check" />

                <label class="form-check-label" for="auth-terms-condition-check">I accept
                  <a href="#" class="text-dark">Terms and Conditions</a></label>
              </div>

              <div class="mt-3 text-end">
                <BButton variant="primary" class="w-sm waves-effect waves-light" @click="onRegister">
                  {{ processing ? "Please wait..." : "Register" }}
                </BButton>
              </div>

              <div class="mt-4 text-center">
                <div class="signin-other-title">
                  <h5 class="font-size-14 mb-3 title">Sign up using</h5>
                </div>

                <ul class="list-inline">
                  <li class="list-inline-item">
                    <a href="#" class="social-list-item bg-primary text-white border-primary">
                      <i class="mdi mdi-facebook"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#" class="social-list-item bg-info text-white border-info">
                      <i class="mdi mdi-twitter"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#" class="social-list-item bg-danger text-white border-danger">
                      <i class="mdi mdi-google"></i>
                    </a>
                  </li>
                </ul>
              </div>

              <div class="mt-4 text-center">
                <p class="text-muted mb-0">
                  Already have an account ?
                  <nuxt-link to="/auth/login-1" class="fw-medium text-primary">Login</nuxt-link>
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
