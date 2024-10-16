<script>

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    items: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>

<template>
  <ClientOnly>
    <BRow>
      <BCol cols="xl-12">

      </BCol>
    </BRow>
  </ClientOnly>
</template>
