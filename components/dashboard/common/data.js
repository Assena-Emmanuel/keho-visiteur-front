    // data/data.js
    
    export const pieChartData = {
        type: "pie",
        data: {
          labels: ["Visites rejetées", "Visites RDV", "Visites en cours"],
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

      // export  const barChartData = {
      //   type: "bar",
      //   data: {
      //     labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
      //     datasets: [
      //       { 
      //         data: [12, 19, 3, 2, 3],
      //         backgroundColor: [
      //           "rgba(54, 162, 235, 1)",
      //           "rgba(54, 162, 235, 1)",
      //           "rgba(54, 162, 235, 1)",
      //           "rgba(54, 162, 235, 1)",
      //           "rgba(54, 162, 235, 1)",
      //           "rgba(54, 162, 235, 1)",
      //         ],
      //         borderColor: [
      //           "rgba(54, 162, 235, 1)",
      //           "rgba(54, 162, 235, 1)",
      //           "rgba(54, 162, 235, 1)",
      //           "rgba(54, 162, 235, 1)",
      //           "rgba(54, 162, 235, 1)",
      //           "rgba(54, 162, 235, 1)",
      //         ],
      //         borderWidth: 1,
      //       },
      //     ],
      //   },
      //   options: {
      //     responsive: true,
      //     plugins: {
      //       legend: {
      //         position: "none",
      //       },
      //       title: {
      //         display: false,
      //         text: "Number of animals in the zoo",
      //       },
      //     },
      //   },
      // };

      export const barChartData = {
        type: "bar",
        data: {
          labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
          datasets: [
            { 
              label: 'Visites acceptées',  // Label pour Dataset 1
              data: [12, 19, 3, 2, 3, 5, 10, 7, 8, 6, 9, 11],  // Données pour Dataset 1
              backgroundColor: "rgba(76, 175, 80, 0.5)",  // Couleur de fond pour Dataset 1
              borderColor: "rgb(76, 175, 80)",  // Couleur de bordure pour Dataset 1
              borderWidth: 1,
            },
            {
              label: 'Visites rejetées',  // Label pour Dataset 2
              data: [7, 11, 5, 8, 6, 2, 3, 4, 5, 7, 9, 4],  // Données pour Dataset 2
              backgroundColor: "rgba(204, 0, 0, 0.5)",  // Couleur de fond pour Dataset 2
              borderColor: "rgb(204, 0, 0)",  // Couleur de bordure pour Dataset 2
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",  // Position de la légende
            },
            title: {
              display: false,
              text: "Diagramme des Visites",
            },
          },
          scales: {
            x: {
              stacked: true,  // Permet la superposition des barres sur l'axe X
            },
            y: {
              stacked: true,  // Permet la superposition des barres sur l'axe Y
              beginAtZero: true,  // Pour que l'axe Y commence à zéro
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
              label: "Visites",
              data: [10, 20, 15, 25, 30, 40],
              fill: true,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 3,
              tension: 0.2,
          },
          {
              label: "Visites rejétées",
              data: [8, 12, 18, 22, 28, 30],
              fill: true,
              backgroundColor: "rgba(255, 0, 0, 0.2)",  
              borderColor: "rgba(255, 0, 0, 1)",
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
