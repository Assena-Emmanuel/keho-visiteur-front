<script>
export default {
  
  data() {
    return {
      title: "Mon Agenda",
      items: [
        {
          text: "Apps",
        },
        {
          text: "Calendar",
          active: true
        }
      ]
    };
  }
};
</script>

<template>
  <SiteHeader :title="title" />
  <PageHeader />
  <ParametresAction />
</template>