export default interface transaction{
	id: number,
	category: string,
	event: string,
	amount: string,
	memo: string,
	date: string,
}

export interface categorizedTransaction {
	name: string,
	totalAmount: number,
	transactions: transaction[]
}