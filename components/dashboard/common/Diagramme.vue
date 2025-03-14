<template>

  <BCard no-body >
    <BCardBody class="ticket">
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
  .ticket {
  background-image: linear-gradient(rgba(255, 254, 254, 0.95), rgba(255, 255, 255, 0.95)), url("/images/total-removebg.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  block-size: 100%;
  inline-size: 100%;
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
  