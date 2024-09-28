<script>
export default {};
</script>

<template>
  <BDropdown variant="white" class="d-none d-lg-inline-block ms-1" toggle-class="header-item noti-icon" right menu-class="dropdown-menu-lg dropdown-menu-end">
    <template #button-content>
      <i class="uil-apps"></i>
    </template>
    <div class="px-lg-2">
      <BRow>
        <BCol class="col">
          <a class="dropdown-icon-item" href="#">
            <img src="/images/brands/github.png" alt="Github" />
            <span>{{ $t("navbar.dropdown.site.list.github") }}</span>
          </a>
        </BCol>
        <BCol>
          <a class="dropdown-icon-item" href="#">
            <img src="/images/brands/bitbucket.png" alt="bitbucket" />
            <span>{{ $t("navbar.dropdown.site.list.bitbucket") }}</span>
          </a> 
        </BCol>
        <BCol>
          <a class="dropdown-icon-item" href="#">
            <img src="/images/brands/dribbble.png" alt="dribbble" />
            <span>{{ $t("navbar.dropdown.site.list.dribbble") }}</span>
          </a>
        </BCol>
      </BRow>

      <BRow>
        <BCol>
          <a class="dropdown-icon-item" href="#">
            <img src="/images/brands/dropbox.png" alt="dropbox" />
            <span>{{ $t("navbar.dropdown.site.list.dropbox") }}</span>
          </a>
        </BCol>
        <BCol>
          <a class="dropdown-icon-item" href="#">
            <img src="/images/brands/mail_chimp.png" alt="mail_chimp" />
            <span>{{ $t("navbar.dropdown.site.list.mailchimp") }}</span>
          </a>
        </BCol>
        <BCol>
          <a class="dropdown-icon-item" href="#">
            <img src="/images/brands/slack.png" alt="slack" />
            <span>{{ $t("navbar.dropdown.site.list.slack") }}</span>
          </a>
        </BCol>
      </BRow>
    </div>
  </BDropdown>
</template>
