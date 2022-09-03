export interface doughnutChartDataSets{
	label: string,
	data: number[],
	backgroundColor: string[],
}

export interface doughnutChart {
	labels: string[],
	datasets: doughnutChartDataSets[]
}