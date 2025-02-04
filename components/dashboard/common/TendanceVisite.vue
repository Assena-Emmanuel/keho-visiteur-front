<template>
  <BCard no-body>
      <BCardBody>
          <div class="d-flex">
              <canvas id="area-chart" style="max-height: 200px;"></canvas>
          </div>
          <div class="text-center titreDiagramme">DIAGRAMME DES VISITES</div>
      </BCardBody>
  </BCard>
</template>
<style>
.titreDiagramme {
    font-size: 15px;
    text-decoration: underline;
    color: #EEC747;
}
</style>
<script>
import { Chart, registerables } from 'chart.js';
import { areaChartData } from "./data";

export default {
    name: "AreaChart",
    data() {
        return {
            areaChartData
        }
    },
    mounted() {
        const ctx = document.getElementById("area-chart");
        Chart.register(...registerables);
        new Chart(ctx, this.areaChartData);
    }
};
</script>
