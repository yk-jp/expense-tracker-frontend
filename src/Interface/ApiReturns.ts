import { TransactionForFetch, TransactionsStatsMonth} from "./Transaction"
import { Category } from "./Category"

export interface RegisterAccountFailed {
	response: {
		data: {
			message: string,
			is_success: boolean
		}
	}
}

export interface LoginFailed {
	response: {
		data: {
			detail: string
		}
	}
}

export interface GenerateTokenFailed {
	response: {
		data: {
			detail: string,
			code: string
		}
	}
}

export interface GenerateTokenSuccess {
	access: string
}

export interface CategoryFetchSuccess {
	is_success: boolean,
	result: {
		category_all: Category[]
	}
}

export interface DeleteSuccess {
	message: string,
	is_success: boolean
}

export interface StatusInMonthSuccess {
	is_success: boolean,
	result: {
		Income: number,
		Expense: number
	}
}

export interface AllTransactionsMonthSuccess {
	result: {
		all_transactions: TransactionForFetch[],
		stats: TransactionsStatsMonth
	}
}