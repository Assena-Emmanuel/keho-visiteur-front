<script>
import axios from "axios";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "admin@themesbrand.com",
      password: "123456",
      isRemember: true,
      processing: false,
      errorMsg: "",
      submitted: false
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  mounted() {
    // Vide le localStorage lorsque ce composant est monté
    localStorage.clear();
  },
  methods: {

    async onLogin() {
      this.submitted = true;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.errorMsg = "";
        try {
          this.processing = true;
          const { data } = await axios.post(
            "https://api-node.themesbrand.website/auth/signin",
            {
              email: this.email,
              password: this.password
            }
          );
          const status = data.status;
          const response = data.data;
          if (status === "success") {
            localStorage.setItem("user", JSON.stringify(response));
            this.$router.push({
              path: "/"
            });
          } else {
            this.errorMsg = response;
          }
        } catch (error) {
          console.error("failed at onLogin", { error });
          localStorage.removeItem("user");
        } finally {
          this.processing = false;
        }
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
            <h5 class="text-primary">KEHO-VISITEUR</h5>
            <p class="text-muted">Se connecter a son compte</p>
          </div>
          <div class="p-2 mt-4">
            <BForm>
              <div class="mb-3">
                <label for="email">Email</label>
                <input v-model="email" type="text" class="form-control" id="email" placeholder="Enter email" :class="{
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
                <label for="userpassword">Password</label>
                <input v-model="password" type="password" id="userpassword" class="form-control" aria-describedby="passwordHelpBlock" placeholder="Enter password" :class="{
                  'is-invalid': submitted && v$.password.$error
                }">
                <!-- <input v-model="password" type="password" class="form-control" id="userpassword" placeholder="Enter password" :class="{
                  'is-invalid': submitted && v$.password.$error
                }" /> -->
                <div v-if="submitted && v$.password.$error" class="invalid-feedback">
                  <span v-if="v$.password.required.$invalid">Password is required
                  </span>
                </div>
              </div>

              

              <div class="d-flex justify-content-between">
                <div class="form-check">
                  <input v-model="isRemember" type="checkbox" class="form-check-input" id="auth-remember-check" />
                  <label class="form-check-label" for="auth-remember-check">Se souvenir</label>
                </div>
                <div class="">
                  <nuxt-link to="/forgot-password" >
                    Mot de passe oublié?</nuxt-link>
                </div>
              </div>
              
              <div class="mt-3 text-danger">{{ errorMsg }}</div>
              <div class="mt-4 text-center">
                <BButton variant="primary" class="w-sm waves-effect waves-light" :disabled="processing" @click="onLogin">
                  {{ processing ? "Please wait..." : "Se connecter" }}
                </BButton>
              </div>

              <!-- <div class="mt-4 text-center">
                <div class="signin-other-title">
                  <h5 class="font-size-14 mb-3 title">Sign in with</h5>
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
              </div> -->

              <!-- <div class="mt-4 text-center">
                <p class="mb-0">
                  Don't have an account ?
                  <nuxt-link to="/register" class="fw-medium text-primary">
                    Signup now</nuxt-link>
                </p>
              </div> -->
            </BForm>
          </div>
        </BCardBody>
      </BCard>

      <!-- <div class="mt-5 text-center">
        <p>
          © {{ new Date().getFullYear() }} Minible. Crafted with
          <i class="mdi mdi-heart text-danger"></i> by Themesbrand
        </p>
      </div> -->
    </BCol>
  </BRow>
</template>
