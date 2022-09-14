/* eslint-disable dot-notation */
import tokens from "../Interface/Token";
import {allTransactionsMonthSuccess} from '../Interface/ApiReturns'
import appApi from "./appApi";

const postTransaction = async(token: tokens, event: string, amount: number, date: string, memo: string, category: number) => {
	appApi.defaults.headers.common['Authorization'] = `Bearer ${token.access!}`

	try{
		await appApi.post('/transaction/save', {
			event, amount, date, memo, category
		}
		)
	} catch(err) {
		console.log(err)
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