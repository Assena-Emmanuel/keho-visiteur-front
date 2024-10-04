<template>
    <BRow>
      <BCol cols="12">
        <div class="text-center">
          <h2 class="mt-0">
            <i class="mdi mdi-check-all"></i>
          </h2>
          <h3 class="mt-0">Thank you !</h3>
  
          <p class="w-75 mb-2 mx-auto">
            Quisque nec turpis at urna dictum luctus. Suspendisse convallis
            dignissim eros at volutpat. In egestas mattis dui. Aliquam mattis
            dictum aliquet.
          </p>
  
          <div class="mb-3 d-flex justify-content-center">
            <div class="form-check">
              <input id="customCheck1" type="checkbox" class="form-check-input" />
              <label class="form-check-label" for="customCheck1">I agree with the Terms and Conditions</label>
            </div>
          </div>
        </div>
      </BCol>
    </BRow>
    <div class="d-flex justify-content-end justify-content-md-between">
      <BButton variant="primary" @click="$emit('onBack')">
        <span class="px-md-5">Back</span>
      </BButton>
      <BButton variant="primary" class="ms-2">
        <span class="px-md-5">Finish</span>
      </BButton>
    </div>
  </template>
  