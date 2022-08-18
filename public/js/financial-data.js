const fromDateInput = document.getElementById("fromDate");
const toDateInput = document.getElementById("toDate");

function drawData() {
  const apiUrl =
    "https://api.coindesk.com/v1/bpi/historical/close.json?start=2016-12-01&end=2017-02-05&currency=usd";

  axios
    .get(apiUrl)
    .then((response) => {
      // console.log("data", response.data);
      printChart(response.data);
    })
    .catch((err) => console.log(err));
}

drawData();

const submitBtn = document.getElementById("updateData");


function updateData() {
  console.log("running update dataaa");
  let currency = "usd";
  let fromDate = fromDateInput.value;
  let toDate = toDateInput.value;

  console.log(fromDateInput, toDateInput);
  console.log("Initial fromDate", fromDate, "Initial toDate", fromDate);

  const updateApiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`;

  console.log(updateApiUrl);

  axios
    .get(updateApiUrl)
    .then((response) => {
      // console.log("data", response.data);
      printChart(response.data);
    })
    .catch((err) => console.log(err));
}

updateData();

// call the function again with the function
//destroy

function printChart(dataToPrint) {
  //  console.log(dataToPrint);
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

// DOM

submitBtn.addEventListener("click", () => {
    console.log("running");
    updateData();
  });
  
  fromDateInput.addEventListener("change", (e) => {
    fromDate = fromDateInput.value;
    console.log("Updated fromDate", fromDate);
  });
  
  toDateInput.addEventListener("change", (e) => {
    toDate = toDateInput.value;
    console.log("Updated toDate", toDate);
  });
  
