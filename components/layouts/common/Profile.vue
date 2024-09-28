<script>
export default {};
</script>

<template>
  <BDropdown class="d-inline-block" toggle-class="header-item" right variant="white" menu-class="dropdown-menu-end">
    <template #button-content>
      <img class="rounded-circle header-profile-user" src="/images/users/avatar-4.jpg" alt="Header Avatar" />
      <span class="d-none d-xl-inline-block ms-1 fw-medium font-size-15">{{
        $t("navbar.dropdown.marcus.text")
      }}</span>
      <i class="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
    </template>

    <a class="dropdown-item" href="#">
      <i class="uil uil-user-circle font-size-18 align-middle text-muted me-1"></i>
      <span class="align-middle">{{
        $t("navbar.dropdown.marcus.list.profile")
      }}</span>
    </a>
    <a class="dropdown-item" href="#">
      <i class="uil uil-wallet font-size-18 align-middle me-1 text-muted"></i>
      <span class="align-middle">{{
        $t("navbar.dropdown.marcus.list.mywallet")
      }}</span>
    </a>
    <a class="dropdown-item d-block" href="#">
      <i class="uil uil-cog font-size-18 align-middle me-1 text-muted"></i>
      <span class="align-middle">{{
        $t("navbar.dropdown.marcus.list.settings")
      }}</span>
      <span class="badge bg-soft-success rounded-pill mt-1 ms-2">03</span>
    </a>
    <a class="dropdown-item" href="#">
      <i class="uil uil-lock-alt font-size-18 align-middle me-1 text-muted"></i>
      <span class="align-middle">{{
        $t("navbar.dropdown.marcus.list.lockscreen")
      }}</span>
    </a>
    <a class="dropdown-item" @click="$emit('logoutUser')" href="javascript: void(0);">
      <i class="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"></i>
      <span class="align-middle">{{
        $t("navbar.dropdown.marcus.list.logout")
      }}</span>
    </a>
  </BDropdown>
</template>
