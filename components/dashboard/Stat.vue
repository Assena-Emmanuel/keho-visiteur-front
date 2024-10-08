<script>

export default {
  components: {
  },
  data() {
    return {
      series: [
        {
          data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54]
        }
      ],
      chartOptions: {
        fill: {
          colors: ["#5b73e8"]
        },
        chart: {
          type: "bar",
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            columnWidth: "50%"
          }
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        xaxis: {
          crosshairs: {
            width: 1
          }
        },
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return "";
              }
            }
          },
          marker: {
            show: false
          }
        }
      },
      growthChartOptions: {
        fill: {
          colors: ["#f1b44c"]
        },
        chart: {
          type: "bar",
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            columnWidth: "50%"
          }
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        xaxis: {
          crosshairs: {
            width: 1
          }
        },
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return "";
              }
            }
          },
          marker: {
            show: false
          }
        }
      },
      orderseries: [70],
      orderRadial: {
        fill: {
          colors: ["#34c38f"]
        },
        chart: {
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: "60%"
            },
            track: {
              margin: 0
            },
            dataLabels: {
              show: false
            }
          }
        }
      },
      customerseries: [55],
      customerRadial: {
        fill: {
          colors: ["#5b73e8"]
        },
        chart: {
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: "60%"
            },
            track: {
              margin: 0
            },
            dataLabels: {
              show: false
            }
          }
        }
      }
    };
  }
};
</script>

<template>
  <BRow>
    <BCol md="6" cols="xl-3">
      <BCard no-body>
        <BCardBody> 
          <div class="float-end mt-2">
            Icone
          </div>
          <div>
            <p class="text-muted mb-0">Visiteurs</p>
            <h4 class="mb-1 mt-1">20</h4>
          </div>
          
        </BCardBody>
      </BCard>
    </BCol>
    <BCol md="6" cols="xl-3">
      <BCard no-body>
        <BCardBody>
          <div class="float-end mt-2">
            Sur RDV
          </div>
          <div>
            <p class="text-muted mb-0">Inopinées</p>
            <h4 class="mb-1 mt-1">19</h4>
          </div>
          
        </BCardBody>
      </BCard>
    </BCol>

    <BCol md="6" cols="xl-3">
      <BCard no-body>
        <BCardBody>
          <div class="float-end mt-2">
            Icone
          </div>
          <div>
            <p class="text-muted mb-0">Inopinées</p>
            <h4 class="mb-1 mt-1">10</h4>
          </div>
        </BCardBody>
      </BCard>
    </BCol>
    <BCol md="6" cols="xl-3">
      <BCard no-body>
        <BCardBody>
          <div>
            <div class="float-end mt-2">
            Icon
            </div>
            <div>
              <p class="text-muted mb-0">Rejetées</p>
              <h4 class="mb-1 mt-1"> 39 </h4>
            </div>
          </div> 
          
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>
