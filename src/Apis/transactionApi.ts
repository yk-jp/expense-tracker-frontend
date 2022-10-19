/* eslint-disable dot-notation */
import appApi from "./appApi";
import {generateNewToken} from './accountApi'
import { Tokens } from "../Interface/Token";
import { AllTransactionsMonthSuccess} from '../Interface/ApiReturns'
import { TransactionForFetch } from '../Interface/Transaction'

const postTransaction = async(token: Tokens, event: string, amount: number, date: string, memo: string, category: number, categoryName: string): Promise<TransactionForFetch | Tokens> => {
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
			const newToken = res as Tokens
			return newToken
		}
		return {access: null, refresh: null}

	}
}

export const fetchTransaction = async (token: Tokens, year: string, month: string): Promise<AllTransactionsMonthSuccess | null> => {
	appApi.defaults.headers.common['Authorization'] = `Bearer ${token.access!}`

	try{
		const data = await appApi.post('/transaction/', {
			year, month
		})
		return data.data as AllTransactionsMonthSuccess
	
	} catch(err) {
		// TODO: token expire pattern
		console.log(err)
		return null
	}
}

export default postTransaction