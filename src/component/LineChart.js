import { Line } from "react-chartjs-2";
import React, { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";

export function LineChart({ chartData }) {
  if (!chartData || !chartData.labels || !chartData.datasets) {
    return null;
  }
  const options = {
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
