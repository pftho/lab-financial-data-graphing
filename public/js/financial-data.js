const apiUrl =
  "https://api.coindesk.com/v1/bpi/historical/close.json?start=2016-12-01&end=2017-02-05&currency=usd";

const currency = axios
  .get(apiUrl)
  .then((response) => {
    console.log("data", response.data);
    printChart(response.data);
  })
  .catch((err) => console.log(err));

function printChart(dataToPrint) {
  console.log(dataToPrint);
  const dates = Object.keys(dataToPrint.bpi);
  const bpi = dates.map((date) => dataToPrint.bpi[date]);

  const ctx = document.getElementById("chart-canvas").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Bitcoin Price Index",
          backgroundColor: "rgba(192, 192, 192, 0.6)",
          borderColor: "rgb(192, 192, 192)",
          data: bpi,
        },
      ],
    },
  });
}
