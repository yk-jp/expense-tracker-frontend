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
	token: tokens,
	newTrans: transactionForFetch[]
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
	monthly: transactionForFetch[],
	yearly: transactionStatsYear
}