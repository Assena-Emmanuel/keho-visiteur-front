<template>
  <BRow class="align-items-center justify-content-center">
    <BCol md="8" lg="6" cols="xl-5">
      <BCard no-body>
        <BCardBody class="p-4">
          <div class="text-center mt-2">
            <h5 class="text-primary">VISIYEUR !</h5>
            <p class="text-muted">Sign in to continue to Minible.</p>
          </div>
          <div class="p-2 mt-4">
            <BForm>
              <div class="mb-3">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" placeholder="Enter username" />
              </div>

              <div class="mb-3">
                <div class="float-end">
                  <nuxt-link to="/auth/recoverpwd" class="text-muted">
                    Forgot password?</nuxt-link>
                </div>
                <label for="userpassword">Password</label>
                <input type="password" class="form-control" id="userpassword" placeholder="Enter password" />
              </div>

              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="auth-remember-check" />
                <label class="form-check-label" for="auth-remember-check">Se souvenir</label>
              </div>

              <div class="mt-3 text-end">
                <BButton variant="primary" class="w-sm waves-effect waves-light" type="submit">
                  Log In
                </BButton>
              </div>


              <div class="mt-4 text-center">
                <p class="mb-0">
                  Don't have an account ?
                  <nuxt-link to="/auth/register-1" class="fw-medium text-primary">
                    Signup now</nuxt-link>
                </p>
              </div>
            </BForm>
          </div>
        </BCardBody>
      </BCard>

    </BCol>
  </BRow>
</template>
