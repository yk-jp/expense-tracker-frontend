/* eslint-disable no-plusplus */
const COLORS = [
	'rgba(255, 99, 132, 1)',
	'rgba(54, 162, 235, 1)',
	'rgba(255, 206, 86, 1)',
	'rgba(75, 192, 192, 1)',
	'rgba(153, 102, 255, 1)',
	'rgba(255, 159, 64, 1)',
	'rgba(0, 204, 0, 1)',
	'rgba(255, 102, 255)',
]

export const colorsPicker = (resultArrayLength: number): string[] => {
	const  colors: string[] = []
	let idx = 0;
	for(let i = 0; i<resultArrayLength ; i++){
		colors.push(COLORS[idx])
		idx = idx === COLORS.length - 1 ? 0 : idx + 1
	}
	return colors
}

export const colorPicker = (i: number): string => (
	i < COLORS.length - 1 ? COLORS[i] : COLORS[i % COLORS.length]
)