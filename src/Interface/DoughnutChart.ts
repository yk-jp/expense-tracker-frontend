export interface DoughnutChartDataSets{
	label: string,
	data: number[],
	backgroundColor: string[],
}

export interface DoughnutChartData {
	labels: string[],
	datasets: DoughnutChartDataSets[]
}