import tokens from "./Token"
import transactionForFetch, { transactionStatsYear } from './Transaction'
import category, {categoryAll} from "./Category"

export interface DSRAction {
	type: string,
}

export interface USRAction {
	type: string,
	token?: tokens | null,
	email: string | null,
}

// TODO: adjust property
export interface TransSRAction {
	type: string,
	newTrans: transactionForFetch[],
	month: string,
	year: string
}
// TODO: adjust property
export interface USCategoryAction {
	type: string,
	newCategory: category[]
}

export interface displayState{
	isRegisterShown: boolean,
	isMiniCalendarShown: boolean
}

export interface userState {
	loggedIn: boolean,
	tokens: tokens | null,
	email: string | null,
	category: categoryAll
}

// TODO: adjust interface for transaction
export interface transactionState {
	monthlyForCalendar: {
		target: {
			year: number,
			month: number
		},
		transactions: transactionForFetch[]
	},
	monthlyForDetail: {
		target: {
			year: number,
			month: number
		},
		transactions: transactionForFetch[]
	},
	yearly: transactionStatsYear
}