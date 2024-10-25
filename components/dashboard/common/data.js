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
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        // options: {
        //   responsive: true,
        //   plugins: {
        //     legend: {
        //       position: "top",
        //     },
        //     title: {
        //       display: true,
        //       text: "Number of animals in the zoo",
        //     },
        //   },
        // },
      };
      
  