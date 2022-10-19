export interface TransactionForFetch{
	id: number,
	category: string,
	event: string,
	amount: string,
	memo: string,
	date: string,
}

export interface TransactionForPost{
	category: number,
	event: string,
	amount: number,
	memo: string,
	date: string,
}

export interface TransactionsStatsMonth {
	Income: number,
	Expense: number,
	Balance: number
}

export interface TransactionStatsYear {
	Income: number[],
	Expense: number[]
}

export interface CategorizedTransactions {
	name: string,
	totalAmount: number,
	transactions: TransactionForFetch[]
}