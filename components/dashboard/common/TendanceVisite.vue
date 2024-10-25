/* App.vue */
<script>
  
  export default {
    data() {
      return {
        options: {
          animationEnabled: true,
          theme: "light2",
          title:{
            text: "Website Audience Demographics"
          },
          axisY: {
            title: "Session Count"
          },
          axisX: {
            valueFormatString: "MMM",
            interval: 1,
            intervalType: "month"
          },
          toolTip: {
            shared: true
          },
          legend: {
            cursor: "pointer",
            verticalAlign: "top",
            itemclick: function(e) {
              if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              }
              else {
                e.dataSeries.visible = true;
              }
              e.chart.render();
            }
          },
          data: [{
            type: "area",
            name: "Male",
            showInLegend: true,
            color: "#2196F3",
            legendMarkerType: "circle",
            yValueFormatString: "#,##0 Sessions",
            xValueFormatString: "MMM YYYY",
            dataPoints: [
              { x: new Date(2021, 0,  1), y: 140460 },
              { x: new Date(2021, 1, 1), y: 155790 },
              { x: new Date(2021, 2, 1), y: 168800 },
              { x: new Date(2021, 3, 1), y: 154790 },
              { x: new Date(2021, 4, 1), y: 146820 },
              { x: new Date(2021, 5, 1), y: 158090 },
              { x: new Date(2021, 6, 1), y: 156060 },
              { x: new Date(2021, 7, 1), y: 165480 },
              { x: new Date(2021, 8, 1), y: 171480 },
              { x: new Date(2021, 9, 1), y: 172480 },
              { x: new Date(2021, 10, 1), y: 179804 },
              { x: new Date(2021, 11, 1), y: 158300 }
            ]
          },{
            type: "area",
            name: "Female",
            showInLegend: true,
            color: "#E91E63",
            legendMarkerType: "circle",
            yValueFormatString: "#,##0 Sessions",
            xValueFormatString: "MMM YYYY",
            dataPoints: [
              { x: new Date(2021, 0,  1), y: 70230 },
              { x: new Date(2021, 1, 1), y: 79452 },
              { x: new Date(2021, 2, 1), y: 87776 },
              { x: new Date(2021, 3, 1), y: 77395 },
              { x: new Date(2021, 4, 1), y: 74878 },
              { x: new Date(2021, 5, 1), y: 83787 },
              { x: new Date(2021, 6, 1), y: 84272 },
              { x: new Date(2021, 7, 1), y: 89359 },
              { x: new Date(2021, 8, 1), y: 89169 },
              { x: new Date(2021, 9, 1), y: 93139 },
              { x: new Date(2021, 10, 1), y: 89902 },
              { x: new Date(2021, 11, 1), y: 83899 }
            ]
          }]
        },
        styleOptions: {
          width: "100%",
          height: "360px"
        }
      }
    }
  }
</script>
  
<template>
    <canvas :options="options" :style="styleOptions"></canvas>
</template>                              