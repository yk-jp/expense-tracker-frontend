import transaction from "./Transaction"

export default interface categorizedTransaction {
	name: string,
	totalAmount: number,
	transactions: transaction[]
}