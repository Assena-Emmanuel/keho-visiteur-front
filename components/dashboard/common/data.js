    // data/data.js
    
    export const pieChartData = {
        type: "pie",
        data: {
          labels: ["Visites rejetées", "Visites RDV", "Visites sans RDV"],
          datasets: [
            {
              data: [59.7, 35.3, 5],
              backgroundColor: [
                "rgb(233, 143, 123)",
                "rgb(59, 242, 203)",
                "rgb(227, 184, 83)",
              ],
              hoverOffset: 5,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "right",
            },
            // title: {
            //   display: true,
            //   text: "How does your work look like now?",
            // },
          },
        },
      };

      export  const barChartData = {
        type: "bar",
        data: {
          labels: ["Agence Marcory", "Agence Koumassi", "Agence Abobo", "Agence Yopougon", "Agence Adjamé"],
          datasets: [
            { 
              data: [12, 19, 3, 2, 3],
              backgroundColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(54, 162, 235, 1)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(54, 162, 235, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "none",
            },
            title: {
              display: false,
              text: "Number of animals in the zoo",
            },
          },
        },
      };

   // data/data.js

export const areaChartData = {
  type: "line", // Type de graphique
  data: {
      labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"],
      datasets: [
          {
              label: "Visites RDV",
              data: [10, 20, 15, 25, 30, 40],
              fill: true,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 3,
              tension: 0.2,
          },
          {
              label: "Visites sans RDV",
              data: [8, 12, 18, 22, 28, 30],
              fill: true,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 3,
              tension: 0.2,
          }
      ]
  },
  options: {
      responsive: true,
      plugins: {
          legend: {
              position: "top",
          },
          title: {
              display: false,
              text: "Visites au fil des mois",
          },
      },
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
};