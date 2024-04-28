import React from 'react';
import { Pie } from 'react-chartjs-2';
import chroma from 'chroma-js';

const PieChart = (props) => {
  const labels = props.labels;
  const dataPoints = props.data;

  const colorScale1 = chroma.scale(['#FF2347', '#879EEB', '#321D32']).mode('lch').colors(dataPoints.length);
  const colorScale2 = chroma.scale(['#FF5733', '#C70039', '#900C3F', '#581845']).mode('lch').colors(dataPoints.length);


  let finalColors = props.chartType == "option1" ? colorScale1 : colorScale2

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataPoints,
        backgroundColor: finalColors,
        borderColor: finalColors.map(color => chroma(color).darken().hex()),
        borderWidth: 1,
      },
    ],

  };

  const options1 = {
    maintainAspectRatio: true, plugins: {
      title: {
        display: true,
        text: 'Expenses by category',
        font: {
          size: 16,
        },
      },
    },
  };

  const options2 = {
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: props.chartType == "option1" ? 'Expenses by category' : "Budget by category",
        font: {
          size: 16,
        },
      },
    },
    cutout: '30%',
    type: 'doughnut',
  };

  return <Pie data={data} options={props.chartType == "option1" ? options1 : options2
  } />;
};

export default PieChart;
