/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable dot-notation */
import appApi from "./appApi";
import { TransactionStatsYear,TransactionStatsYearResponse, TransactionsStatsMonth } from '../Interface/Transaction'
import { StatusInMonthSuccess, StatusInYearSuccess } from '../Interface/ApiReturns'
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
		return {Income: 0, Expense: 0, Balance: 0}
	}
}

const fetchStatsYear = async (token: Tokens, year: number, month: number): Promise<TransactionStatsYear> => {
	const TOKEN = token.access as string
	appApi.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`

	const result: TransactionStatsYear = {Income: [], Expense: []}

	const periods = definePeriods(year, month)
	
	const data = await appApi.get('/stats/year/')
	const res: StatusInYearSuccess = data.data as StatusInYearSuccess
	const resResult = res.result as TransactionStatsYearResponse

	for(let idx = 0; idx < periods.length; idx++) {
		const period = periods[idx]
		const keyDate = `${period.year}-${period.month}`
		result.Income[idx] = resResult[keyDate] ? resResult[keyDate].Income : 0 
		result.Expense[idx] = resResult[keyDate] ? resResult[keyDate].Expense : 0 
	}

		return result
}

export default fetchStatsYear