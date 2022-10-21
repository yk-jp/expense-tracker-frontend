/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable dot-notation */
import appApi from "./appApi";
import { TransactionStatsYear, TransactionsStatsMonth } from '../Interface/Transaction'
import { StatusInMonthSuccess } from '../Interface/ApiReturns'
import { Tokens } from "../Interface/Token";

const definePeriods = (year: number, month: number): {year: string, month: string}[] => {
	const periods: {year: string, month: string}[] = []
	let yearNum = year - 1
	let monthNum = month + 1

	for(let i = 0; i < 12; i++) {
		if (monthNum === 12 ){
			monthNum = 1
			yearNum += 1
		} else {
			monthNum += 1
		}
		periods.push({year: yearNum.toString(), month: monthNum.toString()})
	}
	return periods
}

const fetchStatsMonth = async (token: string, year: string, month: string): Promise<TransactionsStatsMonth> => {
	appApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
	try{
		const data = await appApi.post('/stats/', {
			year, month
		})
		const res = data.data as StatusInMonthSuccess
		return res.result as TransactionsStatsMonth
	}catch{
		console.log("failed")
		return {Income: 0, Expense: 0, Balance: 0}
	}
}

// TODO: use promise all
const fetchStatsYear = async (token: Tokens, year: number, month: number): Promise<TransactionStatsYear> => {
	const TOKEN = token.access!
	const result: TransactionStatsYear = {Income: [], Expense: []}
	const periods = definePeriods(year, month)

	const res = await Promise.all(periods.map( async (period, idx) => {
		const response: TransactionsStatsMonth = await fetchStatsMonth(TOKEN, period.year, period.month)
		result.Income[idx] = response.Income
		result.Expense[idx] = response.Expense
	}))

	

	return res && result
}


export default fetchStatsYear