/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import React, {useContext, useEffect, useState} from "react";
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';

import AppContext from "../Context/useContext";
import fetchStatsYear from "../Apis/statsApi";
import { getShortMonthNameForYear } from "../Utilities/date"; 
import { lineGraph } from '../Interface/LineGraph'

Chart.register(...registerables);

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

const LineGraph = () => {
	const recentMonth = new Date()

	const {transactionStatus, dispatchDisplayStatus, userStatus} = useContext(AppContext)
	const [dataSets, setDataSets] = useState<lineGraph>({
		labels: getShortMonthNameForYear(recentMonth.getMonth()),
		datasets: [
		{
			label: "Income",
			data:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			borderColor: "rgb(8 145 178)",
			backgroundColor: "rgb(8 145 178)"
		},
		{
			label: "Expense",
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			borderColor: 'rgb(220 38 38)',
			backgroundColor: 'rgb(220 38 38)'
		}
	]})

// TODO: with display dispatch, before get every data, need to display loading mark
	useEffect(() => {
		const res = async() => {
			const response = await fetchStatsYear(userStatus.tokens!, recentMonth.getFullYear(), recentMonth.getMonth())
			setDataSets(prev => ({
				labels: prev.labels,
				datasets: [
					{...prev.datasets[0],
						data: response.Income
					},
					{...prev.datasets[1],
						data: response.Expense
					}
				]
			}))
		}
		res().catch(() => console.log("error"))
	}, [transactionStatus.yearly])

	return (
		<section className="w-168">
			<h3 className="text-center mt-3 text-lg">[ Income / Expense Changes in Recent 1 Year ]</h3>
			<Line
				height={300}
				width={680}
				data={dataSets}
				options={options}
				id='chart-key'
			/>
		</section>
	)
}

export default LineGraph