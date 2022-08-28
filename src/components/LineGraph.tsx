/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
import { getShortMonthName } from "../Utilities/date"; 
import { lineGraph, lineGraphDatasets } from '../Interface/LineGraph'

Chart.register(...registerables);

const sampleDatasets: lineGraphDatasets[] = [
	{
		label: "Expense",
		data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 300, 100, 120],
		borderColor: 'rgb(220 38 38)',
		backgroundColor: 'rgb(220 38 38)'
	},
	{
		label: "Income",
		data: [600, 500, 300, 600, 1000, 300, 50, 0, 600, 800, 220, 110],
		borderColor: "rgb(8 145 178)",
		backgroundColor: "rgb(8 145 178)"
	}
]

const LineGraph = () => {
	const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	const graphData: lineGraph = {
		labels,
		datasets: sampleDatasets
	}

	const options = {
		maintainAspectRatio: false,
		plugins: {
			legend: {
				labels: {
					boxHeight: 20,
					font: {
						size: 20
					}
				}
			}
		}
	}

	return (
		<div className="w-168 mx-auto">
			<Line
				height={300}
				width={680}
				data={graphData}
				options={options}
				id='chart-key'
			/>
		</div>
	)
}

export default LineGraph