import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
// import 'chartjs-adapter-dayjs'; 


const LineChart = (props) => {

    const labels = [];
    let month = dayjs(props.month).startOf("month");

    for (let i = 1; i <= month.daysInMonth(); i++) {
        labels.push(month.date(i).format("Do MMM"));
    }

    const data = {
        labels: labels,
        datasets: [{
            label: "Expense by per day",
            data: props.data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };
    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount (in USD)'
                },
            }
        }
    };

    return <Line data={data} options={options} />;
};

export default LineChart;
