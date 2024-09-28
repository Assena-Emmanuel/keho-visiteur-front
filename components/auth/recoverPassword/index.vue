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
            <BForm>
              <div class="mb-3">
                <label for="useremail">Email</label>
                <input type="email" class="form-control" id="useremail" placeholder="Enter email" />
              </div>

              <div class="mt-3 text-end">
                <BButton variant="primary" class="w-sm waves-effect waves-light" type="submit">
                  Reset
                </BButton>
              </div>

              <div class="mt-4 text-center">
                <p class="mb-0">
                  Remember It ?

                  <nuxt-link to="/auth/login-1" class="fw-medium text-primary">Signin</nuxt-link>
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
