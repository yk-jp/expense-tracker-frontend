import { Tokens } from "./Token"
import { TransactionForFetch, TransactionStatsYear } from './Transaction'
import {Category, CategoryAll } from "./Category"

export interface DSRAction {
	type: string,
}

export interface USRAction {
	type: string,
	token?: Tokens | null,
	email: string | null,
}

export interface TransSRAction {
	type: string,
	newTrans: TransactionForFetch[],
	month: string,
	year: string,
	fetchSuccess: boolean
}

export interface TransSRActionUpdate {
	type: string
}

export interface USCategoryAction {
	type: string,
	newCategory: Category[]
}

export interface USCategoryDeleteAction {
	type: string,
	categoryId: number,
	categoryType: string
}

export interface DisplayState{
	isRegisterShown: boolean,
	isMiniCalendarShown: boolean
}

export interface UserState {
	loggedIn: boolean,
	tokens: Tokens | null,
	email: string | null,
	category: CategoryAll
}

// TODO: adjust interface for transaction
export interface TransactionState {
	monthlyForCalendar: {
		target: {
			year: number,
			month: number
		},
		transactions: TransactionForFetch[]
	},
	monthlyForDetail: {
		target: {
			year: number,
			month: number
		},
		transactions: TransactionForFetch[]
	},
	yearly: TransactionStatsYear,
	fetchSuccess: boolean
}