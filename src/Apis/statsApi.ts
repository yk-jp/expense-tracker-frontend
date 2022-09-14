/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable dot-notation */
import appApi from "./appApi";
import { transactionStatsYear, transactionsStatsMonth } from '../Interface/Transaction'
import { statusInMonthSuccess } from '../Interface/ApiReturns'
import tokens from "../Interface/Token";

const nextYear = (year: number, month: number): number =>{
	if (month === 12) {
		return year + 1
	}
	return year
}

const nextMonth = (month: number): number => {
	if (month === 12) {
		return 1
	}
	return month + 1
}

const fetchStatsMonth = async (token: string, year: string, month: string): Promise<transactionsStatsMonth> => {
	appApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
	try{
		const data = await appApi.post('/stats/', {
			year, month
		})
		const res = data.data as statusInMonthSuccess
		return res.result as transactionsStatsMonth
	}catch{
		console.log("failed")
		return {Income: 0, Expense: 0, Balance: 0}
	}
}

const fetchStatsYear = async (token: tokens, year: number, month: number): Promise<transactionStatsYear> => {
	const TOKEN = token.access!
	const result: transactionStatsYear = {Income: [], Expense: []}
	let yearNumber = year - 1
	let monthNumber = month + 1

	for(let i = 0; i < 12; i++){
		yearNumber = nextYear(yearNumber, monthNumber)
		monthNumber = nextMonth(monthNumber)
		const res: transactionsStatsMonth = await fetchStatsMonth(TOKEN, yearNumber.toString(), monthNumber.toString())
		result.Income.push(res.Income)
		result.Expense.push(res.Expense)
	}
	
	return result
}


export default fetchStatsYear