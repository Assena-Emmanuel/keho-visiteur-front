<template>
  <BCard no-body >
    <BCardBody class="ticket">
      <div class="d-flex">
        <canvas id="bar-chart" style="max-height: 200px;"></canvas>
      </div>
      <div class="text-center titreDiagramme">DIAGRAMME DES VISITES</div>
    </BCardBody>
  </BCard>
</template>

<style>
.titreDiagramme{
    font-size: 15px;
    text-decoration: underline;
    color: #2065FA;
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
import { Chart, registerables } from 'chart.js';
import { barChartData } from "./data";

export default {
  name: "BarChart",
  data() {
    return {
      barChartData
    };
  },
  mounted() {
    this.$nextTick(() => {
      const ctx = document.getElementById("bar-chart");
      if (ctx) {
        Chart.register(...registerables);
        new Chart(ctx, this.barChartData);
      } else {
        console.error("Canvas element not found.");
      }
    });
  },
};
</script>
