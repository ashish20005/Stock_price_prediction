const actualLabels = [
  "Feb 03",
  "Feb 07",
  "Feb 11",
  "Feb 15",
  "Feb 19",
  "Feb 23",
  "Feb 27",
  "Mar 02",
  "Mar 06",
  "Mar 10",
  "Mar 14",
  "Mar 18",
  "Mar 22",
  "Mar 26",
  "Mar 30"
];

const actualPrices = [2710, 2734, 2726, 2755, 2781, 2804, 2816, 2839, 2857, 2868, 2884, 2899, 2918, 2922, 2927];
const forecastLabels = [...actualLabels, "Apr 03", "Apr 07", "Apr 11", "Apr 15", "Apr 19", "Apr 23"];
const predictedPrices = [2706, 2728, 2732, 2749, 2770, 2794, 2810, 2831, 2850, 2862, 2879, 2893, 2910, 2918, 2931];
const comparisonLabels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
const comparisonActual = [2876, 2888, 2892, 2906, 2913, 2919, 2927];
const comparisonArima = [2870, 2880, 2890, 2898, 2907, 2915, 2921];
const comparisonSarima = [2873, 2885, 2893, 2900, 2910, 2918, 2925];
const comparisonLstm = [2878, 2887, 2894, 2908, 2912, 2920, 2928];
const predictionInput = document.getElementById("predictionDays");
const predictButton = document.getElementById("predictButton");
const predictionResults = document.getElementById("predictionResults");

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#edf4ff",
        font: {
          family: "Space Grotesk"
        }
      }
    },
    tooltip: {
      backgroundColor: "rgba(7, 17, 31, 0.92)",
      borderColor: "rgba(255,255,255,0.12)",
      borderWidth: 1,
      titleColor: "#edf4ff",
      bodyColor: "#cfe0ff",
      padding: 12
    }
  },
  scales: {
    x: {
      ticks: {
        color: "#9ab1d1",
        font: {
          family: "Space Grotesk"
        }
      },
      grid: {
        color: "rgba(255,255,255,0.06)"
      }
    },
    y: {
      ticks: {
        color: "#9ab1d1",
        callback: value => `Rs. ${value}`
      },
      grid: {
        color: "rgba(255,255,255,0.06)"
      }
    }
  }
};

new Chart(document.getElementById("actualPredictedChart"), {
  type: "line",
  data: {
    labels: actualLabels,
    datasets: [
      {
        label: "Actual Stock Prices",
        data: actualPrices,
        borderColor: "#65d1ff",
        backgroundColor: "rgba(101, 209, 255, 0.14)",
        tension: 0.34,
        borderWidth: 3,
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: false
      },
      {
        label: "Predicted Stock Prices",
        data: predictedPrices,
        borderColor: "#ffb84d",
        backgroundColor: "rgba(255, 184, 77, 0.14)",
        tension: 0.34,
        borderWidth: 3,
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: false
      }
    ]
  },
  options: chartDefaults
});

new Chart(document.getElementById("priceChart"), {
  type: "line",
  data: {
    labels: forecastLabels,
    datasets: [
      {
        label: "Actual Close",
        data: [...actualPrices, null, null, null, null, null, null],
        borderColor: "#65d1ff",
        backgroundColor: "rgba(101, 209, 255, 0.14)",
        tension: 0.35,
        borderWidth: 3,
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: false
      },
      {
        label: "Forecast",
        data: [...new Array(actualPrices.length - 1).fill(null), actualPrices[actualPrices.length - 1], 2950, 2974, 2991, 3016, 3032, 3048],
        borderColor: "#ffb84d",
        backgroundColor: "rgba(255, 184, 77, 0.18)",
        borderDash: [8, 6],
        tension: 0.32,
        borderWidth: 3,
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: false
      }
    ]
  },
  options: chartDefaults
});

new Chart(document.getElementById("comparisonChart"), {
  type: "line",
  data: {
    labels: comparisonLabels,
    datasets: [
      {
        label: "Actual",
        data: comparisonActual,
        borderColor: "#65d1ff",
        tension: 0.28,
        borderWidth: 3,
        pointRadius: 3
      },
      {
        label: "ARIMA",
        data: comparisonArima,
        borderColor: "#f76e6e",
        tension: 0.28,
        borderWidth: 2,
        pointRadius: 2
      },
      {
        label: "SARIMA",
        data: comparisonSarima,
        borderColor: "#c791ff",
        tension: 0.28,
        borderWidth: 2,
        pointRadius: 2
      },
      {
        label: "LSTM",
        data: comparisonLstm,
        borderColor: "#ffb84d",
        tension: 0.28,
        borderWidth: 2,
        pointRadius: 2
      }
    ]
  },
  options: chartDefaults
});

function renderPredictionResults(days) {
  const latestPrice = actualPrices[actualPrices.length - 1];
  const items = [];

  for (let index = 1; index <= days; index += 1) {
    const nextPrice = latestPrice + index * 11 + (index % 2 === 0 ? 4 : -3);
    items.push(`<li>Day ${index}: Rs. ${nextPrice}</li>`);
  }

  predictionResults.innerHTML = `<ol class="prediction-list">${items.join("")}</ol>`;
  predictionResults.classList.add("has-results");
}

predictButton.addEventListener("click", () => {
  const days = Number(predictionInput.value);

  if (!Number.isInteger(days) || days < 1 || days > 30) {
    predictionResults.textContent = "Enter a valid number of days between 1 and 30.";
    predictionResults.classList.remove("has-results");
    return;
  }

  renderPredictionResults(days);
});
