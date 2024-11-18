<template>
    <DashboardCommonStat />
    <BRow>
        <BCol lg="6">
            <DashboardCommonDiagramme />
        </BCol>
        <BCol lg="6">
            <DashboardCommonHistogramme />
        </BCol>
    </BRow>
    <DashboardCommonTendanceVisite />
</template>
<script setup>
import apiClient from '../api/intercepteur';

apiClient.get('/action')
  .then(response => console.log(`------------- ${response.data}`))
  .catch(error => console.error(error));

</script>