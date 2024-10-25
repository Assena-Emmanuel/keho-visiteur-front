<template>
    <BCard no-body >
      <BCardBody>
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
    color: #EEC747;
  }
</style>
<script>
import { Chart, registerables } from 'chart.js';
import {barChartData} from "./data";

export default {
    name: "BarChart",
    data() {
        return {
            barChartData
        }
    },
    mounted() {
        const ctx = document.getElementById("bar-chart");
        Chart.register(...registerables);
        new Chart(ctx, this.barChartData);
    }
};
</script>