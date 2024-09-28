<script>
export default {
  props: {
    title: {
      type: String,
      default: "Dashboard"
    }
  }
};
</script>
<template>
  <Head>
    <Title> {{ title }} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard </Title>
  </Head>
</template>
