<template>
  <BRow class="justify-content-center">
    <BCol md="8" lg="6" cols="xl-5">
      <div>
        <BCard no-body>
          <BCardBody class="p-4">
            <div class="text-center mt-2">
              <h5 class="text-primary">Lock screen</h5>
              <p class="text-muted">
                Enter your password to unlock the screen!
              </p>
            </div>
            <div class="p-2 mt-4">
              <div class="user-thumb text-center mb-4">
                <img src="/images/users/avatar-4.jpg" class="rounded-circle img-thumbnail avatar-lg" alt="thumbnail" />
                <h5 class="font-size-15 mt-3">Marcus</h5>
              </div>
              <BForm>
                <div class="form-group">
                  <label for="userpassword">Password</label>
                  <input type="password" class="form-control" id="userpassword" placeholder="Enter password" />
                </div>

                <div class="mt-3 text-end">
                  <BButton variant="primary" class="w-sm waves-effect waves-light" type="submit">
                    Unlock
                  </BButton>
                </div>

                <div class="mt-4 text-center">
                  <p class="mb-0">
                    Not you ? return
                    <nuxt-link to="/auth/login-1" class="fw-medium text-primary">Sign In</nuxt-link>
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
      </div>
    </BCol>
  </BRow>
</template>
