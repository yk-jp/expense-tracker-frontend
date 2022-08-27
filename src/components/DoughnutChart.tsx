/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Doughnut } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface doughnutChartDateasets{
	label: string,
	data: number[],
	backgroundColor: string[],
}

interface doughnutChart{
	labels: string[],
	datasets: doughnutChartDateasets[]
}
const sampleDatasets = [
	{
		label: '# of Votes',
		data: [12, 19, 3, 5, 2, 3],
		backgroundColor: [
			'rgba(255, 99, 132, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(255, 206, 86, 0.2)',
			'rgba(75, 192, 192, 0.2)',
			'rgba(153, 102, 255, 0.2)',
			'rgba(255, 159, 64, 0.2)',
		]
	},
]
const sampleData: doughnutChart = {
	labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
	datasets: sampleDatasets
}

const DoughnutChart = () => {
	const data: doughnutChart = sampleData

	const options = {
		plugins: {
			legend: {
			},
		}
	}

	return (
		<div className="flex flex-col items-center px-10 ">
			<Doughnut
				width={500}
				height={500}
				data={data}
				options={options}
				id='chart-key'
			/>
			<p className="text-center -mt-44 mb-44" >total income is $400</p>

		</div>
	)
}

export default DoughnutChart