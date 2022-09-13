/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
import { getShortMonthNameForYear } from "../Utilities/date"; 
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
	const recentMonth = new Date().getMonth()

	const labels = getShortMonthNameForYear(recentMonth)
	const graphData: lineGraph = {
		labels,
		datasets: sampleDatasets
	}

	const options = {
		plugins: {
			legend: {
				position:"bottom" as const,
				labels: {
					boxHeight: 16,
					font: {
						size: 16
					}
				}
			}
		}
	}

	return (
		<section className="w-168">
			<h3 className="text-center mt-3 text-lg">[ Income / Expense Changes in Recent 1 Year ]</h3>
			<Line
				height={300}
				width={680}
				data={graphData}
				options={options}
				id='chart-key'
			/>
		</section>
	)
}

export default LineGraph