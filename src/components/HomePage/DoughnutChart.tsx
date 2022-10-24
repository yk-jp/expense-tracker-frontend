/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Doughnut } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';

import {colorsPicker} from '../../Utilities/colorPallet'
import { DoughnutChartData } from '../../Interface/DoughnutChart'

Chart.register(...registerables);

const emptyDatasets: DoughnutChartData = {
	labels: ['N/A'],
	datasets: [{
		label: 'Monthly transaction rate',
		data: [100],
		backgroundColor: ['rgba(0,0,0,1)']
	}]
}

type Props = {
	data: {name: string, totalAmount: number}[],
	transType: string
}
const DoughnutChart = ({data, transType}: Props) => {

	const labels: string[] = []
	const amounts: number[] = []
	let total = 0

	data.forEach(cate => {
		labels.push(cate.name)
		amounts.push(cate.totalAmount)
		total += cate.totalAmount
	})
	// need seperete color between income and expense
	const backgroundColor: string[] = colorsPicker(amounts.length)

	const datasets = [{
		label: 'Monthly transaction rate',
		data: amounts,
		backgroundColor
	}]


	const chartInfo: DoughnutChartData = {labels, datasets}

	const options = {
		plugins: {
			legend: {
        labels: {
          padding: 10,
          font: {
            size: 14,
          },
        },
			}
		}
	}

	return (
		<div className="flex flex-col items-center px-6 ">
			<Doughnut
				data={data.length === 0 ? emptyDatasets : chartInfo}
				options={options}
				id='chart-key'
			/>
			<p className="text-center -mt-40 mb-28" >{`Total ${transType} is`}
				<br />
				<span className="font-bold">${total}</span>
			</p>
		</div>
	)
}

export default DoughnutChart