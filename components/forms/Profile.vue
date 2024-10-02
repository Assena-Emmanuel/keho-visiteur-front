<script>
    export default{
        data(){
            return{
                typeform: {
                    name: "",
                    password: "",
                    confirmPassword: "",
                    email: "",
                    url: "",
                    digit: "",
                    number: "",
                    alphanum: "",
                    textarea: ""
                },
            }
        }
    }
</script>

<template>
    <div>
        <BRow>
      <BCol lg="6">
        <BCard no-body>
          <BCardBody class="pb-0">
            <BCardTitle>Validation type</BCardTitle>
            <p class="card-title-desc">
              Parsley is a javascript form validation library. It helps you
              provide your users with feedback on their form submission before
              sending it to your server.
            </p>

            <BForm action="#">
              <div class="mb-3">
                <label>Required</label>
                <input v-model="typeform.name" type="text" class="form-control" placeholder="Type something" name="name" :class="{
                  'is-invalid': typesubmit && v$.typeform.name.$error
                }" />
                <div v-if="typesubmit && v$.typeform.name.$error" class="invalid-feedback">
                  <span v-if="v$.typeform.name.required.$invalid">This value is required.</span>
                </div>
              </div>

              <!-- <div class="mb-3">
                <label>Equal To</label>
                <div>
                  <input v-model="typeform.password" type="password" name="password" class="form-control" :class="{
                    'is-invalid': typesubmit && v$.typeform.password.$error
                  }" placeholder="Password" />
                  <div v-if="typesubmit && v$.typeform.password.$error" class="invalid-feedback">
                    <span v-if="v$.typeform.password.required.$invalid">This value is required.</span>
                    <span v-else-if="v$.typeform.password.minLength.$invalid">Password must be at least 6 characters.</span>
                  </div>
                </div>
                <div class="mt-2">
                  <input v-model="typeform.confirmPassword" type="password" name="confirmPassword" class="form-control" :class="{
                    'is-invalid':
                      typesubmit && v$.typeform.confirmPassword.$error
                  }" placeholder="Re-Type Password" />
                  <div v-if="typesubmit && v$.typeform.confirmPassword.$error" class="invalid-feedback">
                    <span v-if="v$.typeform.confirmPassword.required.$invalid">This value is required.</span>
                    <span v-else-if="v$.typeform.confirmPassword.sameAsPassword.$invalid
                      ">This value should be the same.</span>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label>E-Mail</label>
                <div>
                  <input v-model="typeform.email" type="email" name="email" class="form-control" :class="{
                    'is-invalid': typesubmit && v$.typeform.email.$error
                  }" placeholder="Enter a valid e-mail" />
                  <div v-if="typesubmit && v$.typeform.email.$error" class="invalid-feedback">
                    <span v-if="v$.typeform.email.required.$invalid">This value is required.</span>
                    <span v-else-if="v$.typeform.email.email.$invalid">This value should be a valid email.</span>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label>URL</label>
                <div>
                  <input v-model="typeform.url" type="url" name="url" class="form-control" placeholder="URL" :class="{
                    'is-invalid': typesubmit && v$.typeform.url.$error
                  }" />
                  <div v-if="typesubmit && v$.typeform.url.$error" class="invalid-feedback">
                    <span v-if="v$.typeform.url.required.$invalid">This value is required.</span>
                    <span v-else-if="v$.typeform.url.url.$invalid">This value should be a valid url.</span>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label>Digits</label>
                <div>
                  <input v-model="typeform.digit" type="text" name="digit" class="form-control" :class="{
                    'is-invalid': typesubmit && v$.typeform.digit.$error
                  }" placeholder="Enter only digits" />
                  <div v-if="typesubmit && v$.typeform.digit.$error" class="invalid-feedback">
                    <span v-if="v$.typeform.digit.required.$invalid">This value is required.</span>
                    <span v-else-if="v$.typeform.digit.numeric.$invalid">This value should be digits.</span>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label>Number</label>
                <div>
                  <input v-model="typeform.number" type="text" name="number" class="form-control" :class="{
                    'is-invalid': typesubmit && v$.typeform.number.$error
                  }" placeholder="Enter only numbers" />
                  <div v-if="typesubmit && v$.typeform.number.$error" class="invalid-feedback">
                    <span v-if="v$.typeform.number.required.$invalid">This value is required.</span>
                    <span v-else-if="v$.typeform.number.numeric.$invalid">This value should be a valid number.</span>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label>Alphanumeric</label>
                <div>
                  <input v-model="typeform.alphanum" type="text" name="alphanum" class="form-control" :class="{
                    'is-invalid': typesubmit && v$.typeform.alphanum.$error
                  }" placeholder="Enter alphanumeric value" />
                  <div v-if="typesubmit && v$.typeform.alphanum.$error" class="invalid-feedback">
                    <span v-if="v$.typeform.alphanum.required.$invalid">This value is required.</span>
                    <span v-else-if="v$.typeform.alphanum.alphaNum.$invalid">This value should be alphanumeric.</span>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label>Textarea</label>
                <div>
                  <textarea v-model="typeform.textarea" class="form-control" name="textarea" :class="{
                    'is-invalid': typesubmit && v$.typeform.textarea.$error
                  }" rows="5"></textarea>
                  <div v-if="typesubmit && v$.typeform.textarea.$error" class="invalid-feedback">
                    <span v-if="v$.typeform.textarea.required.$invalid">This value is required.</span>
                  </div>
                </div>
              </div> -->
              <div class="mb-3 mb-0">
                <div>
                  <BButton type="submit" variant="primary me-2">
                    Submit
                  </BButton>
                  <BButton type="reset" variant="secondary m-l-5 ms-1">
                    Cancel
                  </BButton>
                </div>
              </div>
            </BForm>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>
    </div>
</template>