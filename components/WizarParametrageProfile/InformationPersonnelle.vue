<template>
    <BRow>
      <BCol cols="12">
        <BRow class="form-group mb-3">
          <label class="col-md-3 col-form-label" for="userName">User name</label>
          <BCol md="9">
            <input id="userName" type="text" class="form-control" name="userName" value="Themesbrand" />
          </BCol>
        </BRow>
        <BRow class="form-group mb-3">
          <label class="col-md-3 col-form-label" for="password">Password</label>
          <BCol md="9">
            <input id="password" type="password" name="password" class="form-control" value="123456789" />
          </BCol>
        </BRow>
  
        <BRow class="form-group mb-3">
          <label class="col-md-3 col-form-label" for="confirmpass">Re Password</label>
          <BCol md="9">
            <input id="confirmpass" type="password" name="confirmpass" class="form-control" value="123456789" />
          </BCol>
        </BRow>
      </BCol>
    </BRow>
    <div class="d-flex justify-content-end">
      <BButton variant="primary" class="px-5" @click="$emit('onNext')">
        Next
      </BButton>
    </div>
  </template>
  