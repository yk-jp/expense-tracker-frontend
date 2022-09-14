import tokens from "./Token"
import transactionForFetch, {transactionsStatsMonth} from "./Transaction"
import category from "./Category"

export interface registerAccountFailed {
	response: {
		data: {
			message: string,
			is_success: boolean
		}
	}
}

export interface loginFailed {
	response: {
		data: {
			detail: string
		}
	}
}

export interface generateTokenFailed {
	response: {
		data: {
			detail: string,
			code: string
		}
	}
}

export interface generateTokenSuccess {
	access: string
}

export interface categoryFetchSuccess {
	is_success: boolean,
	result: {
		category_all: category[]
	}
}

export interface statusInMonthSuccess {
	is_success: boolean,
	result: {
		Income: number,
		Expense: number
	}
}

export interface allTransactionsMonthSuccess {
	result: {
		all_transactions: transactionForFetch[],
		stats: transactionsStatsMonth
	}
}