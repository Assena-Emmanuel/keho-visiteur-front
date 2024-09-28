<template>
  <BDropdown variant="white" class="d-inline-block d-lg-none ms-2" toggle-class="header-item noti-icon" right menu-class="dropdown-menu-lg p-0">
    <template #button-content>
      <i class="uil-search"></i>
    </template>
    <BForm class="p-3">
      <div class="form-group m-0">
        <div class="input-group">
          <input type="text" class="form-control" :placeholder="$t('navbar.search.text')" aria-label="Recipient's username" />
          <div class="input-group-append">
            <BButton variant="primary" type="submit">
              <i class="mdi mdi-magnify"></i>
            </BButton>
          </div>
        </div>
      </div>
    </BForm>
  </BDropdown>
</template>
