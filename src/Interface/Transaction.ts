export default interface transactionForFetch{
	id: number,
	category: string,
	event: string,
	amount: string,
	memo: string,
	date: string,
}

export interface transactionForPost{
	category: number,
	event: string,
	amount: number,
	memo: string,
	date: string,
}

export interface categorizedTransaction {
	name: string,
	totalAmount: number,
	transactions: transactionForFetch[]
}