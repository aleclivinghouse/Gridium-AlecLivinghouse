import React from 'react';
import {
    Bar
} from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip
} from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip
)


const BarChart = ({labelsArr, valuesArr}) => {
    const data = {
        labels: labelsArr,
        datasets: [{
            labels: 'Sales of the Week',
            data: valuesArr,
            fill: true,
            backgroundColor: 'aqua',
            borderColor: 'black',
            pointBorderColor: 'aqua'
        }]
    }

    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 0,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                tooltip: {
                    backgroundColor: "black",
                    yAlign: 'bottom'
                }
            },
            title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart',
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            enabled: true,
            mode: 'index',
            position: 'nearest',
        }

    };
      
    return (
        <div>
            <Bar data={data} options={options} height="1000" width="800">
            </Bar>
        </div>
    );
}

export default BarChart;