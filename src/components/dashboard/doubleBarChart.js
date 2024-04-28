import React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const DoubleBarChart = (props) => {
  const chartData = {
    labels: props.labels,
    datasets: [
      {
        label: 'Budget',
        backgroundColor: 'rgba(46, 204, 113, 0.2)',
        borderColor: 'rgba(46, 204, 113, 1)',
        borderWidth: 1,
        data: props.data1,
      },
      {
        label: 'Spend',
        backgroundColor: 'rgba(231, 76, 60, 0.2)',
        borderColor: 'rgba(231, 76, 60, 1)',
        borderWidth: 1,
        data: props.data2,
      },

    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Expense vs Budget",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Category',
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (USD)',
          font: {
            size: 14,
          },
        },
      },
    },
    barThickness: 30,
  };



  return <Bar data={chartData} options={chartOptions} />;
};

export default DoubleBarChart;
