/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Doughnut } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
import PropTypes from 'prop-types'
import {colorsPicker} from '../Utilities/colorPallet'
import { doughnutChartDataSets, doughnutChart } from '../Interface/DoughnutChart'

Chart.register(...registerables);

type Props = {
	data: {name: string, totalAmount: number}[]
}
const DoughnutChart = ({data}: Props) => {

	const labels: string[] = []
	const amounts: number[] = []

	data.forEach(cate => {
		labels.push(cate.name)
		amounts.push(cate.totalAmount)
	})
	const backgroundColor: string[] = colorsPicker(amounts.length)

	const datasets = [{
		label: 'Monthly transaction rate',
		data: amounts,
		backgroundColor
	}]


	const chartInfo: doughnutChart = {labels, datasets}

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
				data={chartInfo}
				options={options}
				id='chart-key'
			/>
			<p className="text-center -mt-40 mb-36" >total Income is <br /><span className="font-bold">$400</span></p>

		</div>
	)
}

DoughnutChart.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		totalAmount: PropTypes.number
	})).isRequired
}

export default DoughnutChart