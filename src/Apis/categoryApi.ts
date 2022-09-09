/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import appApi from "./appApi";
import { generateNewToken } from "./accountApi";
import tokens from "../Interface/Token";
import { categoryFetchSuccess } from "../Interface/ApiReturns";
import { categoryAll} from '../Interface/Category'

const fetchCategory = async (token: tokens): Promise<categoryAll | tokens> => {
	appApi.defaults.headers.common['Authorization'] = `Bearer ${token.access!}`
	try{
		const dataIncome = await appApi.get('/category/Income')
		const categoryIncome = dataIncome.data as categoryFetchSuccess
		const dataExpense = await appApi.get('/category/Expense')
		const categoryExpense = dataExpense.data as categoryFetchSuccess
		return {income: categoryIncome.result.category_all, expense: categoryExpense.result.category_all}

	} catch (err) {
		const res = await generateNewToken(token.refresh!)
		const newToken = res as tokens
		return newToken
	}

}

const createCategory = (token: tokens, name: string, type: string) => {
	const a = 0
}

export {fetchCategory, createCategory}