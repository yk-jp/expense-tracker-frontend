export interface LineGraphDatasets{
	label: string,
	data: number[],
	borderColor: string,
	backgroundColor: string
}

export interface LineGraphData {
	labels: string[],
	datasets: LineGraphDatasets[]
}