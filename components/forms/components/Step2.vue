<template>
  <BRow>
    <BCol cols="12">
      <BRow class="form-group mb-3">
        <label class="col-md-3 col-form-label" for="name">First name</label>
        <BCol md="9">
          <input type="text" name="name" class="form-control" value="Francis" />
        </BCol>
      </BRow>
      <BRow class="form-group mb-3">
        <label class="col-md-3 col-form-label" for="surname">Last name</label>
        <BCol md="9">
          <input type="text" name="surname" class="form-control" value="Brinkman" />
        </BCol>
      </BRow>

      <BRow class="form-group mb-3">
        <label class="col-md-3 col-form-label" for="email">Email</label>
        <BCol md="9">
          <input type="email" name="email" class="form-control" value="cory1979@hotmail.com" />
        </BCol>
      </BRow>
    </BCol>
  </BRow>
  <div class="d-flex justify-content-end justify-content-md-between">
    <BButton variant="primary" class="d-flex" @click="$emit('onBack')">
      <span class="px-md-5">Back</span>
    </BButton>
    <BButton variant="primary" class="ms-2" @click="$emit('onNext')">
      <span class="px-md-5">Next</span>
    </BButton>
  </div>
</template>
