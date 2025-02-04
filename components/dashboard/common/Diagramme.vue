<template>

  <BCard no-body >
    <BCardBody>
      <div class="d-flex">
        <canvas id="pieChart" class="pie-chart" style="max-height: 200px;"></canvas>
      </div>
      <div class="text-center"><span class="titre">DIAGRAMME DES VISITES</span></div>
    </BCardBody>
  </BCard>

  </template>
  
  <style scoped>
  .legend-color {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 3px;
    margin-right: 5px;
  }
  .titre{
    text-decoration: underline;
    color: #EEC747
  }
  </style>
  
<script>
import { Chart, registerables } from "chart.js";
import {pieChartData} from "./data"; // Assurez-vous que vos données sont au bon format

export default {
  data() {
    return {
      pieChartData,
    };
  },
  mounted() {
    const ctx = document.getElementById("pieChart");
    Chart.register(...registerables);
    new Chart(ctx, this.pieChartData);
  },
};
</script>
  