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
    <Title>Visiteur | {{ title }}</Title>
  </Head>
</template>
