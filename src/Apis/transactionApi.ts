/* eslint-disable dot-notation */
import appApi from "./appApi";
import {generateNewToken} from './accountApi'
import tokens from "../Interface/Token";
import {allTransactionsMonthSuccess} from '../Interface/ApiReturns'
import transactionForFetch from '../Interface/Transaction'

const postTransaction = async(token: tokens, event: string, amount: number, date: string, memo: string, category: number, categoryName: string): Promise<transactionForFetch | tokens> => {
	appApi.defaults.headers.common['Authorization'] = `Bearer ${token.access!}`

	try{
		await appApi.post('/transaction/save', {
			event, amount, date, memo, category
		})
		const stringAmount = amount.toString()
		return {
			id: 0,
			category: categoryName,
			event,
			amount: stringAmount,
			memo,
			date
		}
	} catch(err) {
		if (token.refresh !== null){
			const res = await generateNewToken(token.refresh)
			const newToken = res as tokens
			return newToken
		}
		return {access: null, refresh: null}

	}
}

export const fetchTransaction = async (token: tokens, year: string, month: string): Promise<allTransactionsMonthSuccess | null> => {
	appApi.defaults.headers.common['Authorization'] = `Bearer ${token.access!}`

	try{
		const data = await appApi.post('/transaction/', {
			year, month
		})
		return data.data as allTransactionsMonthSuccess
	
	} catch(err) {
		// TODO: token expire pattern
		console.log(err)
		return null
	}
}

export default postTransaction