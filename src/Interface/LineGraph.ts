export interface lineGraphDatasets{
	label: string,
	data: number[],
	borderColor: string,
	backgroundColor: string
}

export interface lineGraph {
	labels: string[],
	datasets: lineGraphDatasets[]
}