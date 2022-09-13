/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import appApi from "./appApi";
import { generateNewToken } from "./accountApi";
import tokens from "../Interface/Token";
import { categoryFetchSuccess } from "../Interface/ApiReturns";
import category, { categoryAll} from '../Interface/Category'

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

const createCategory = async (token: tokens, name: string, type: string): Promise<category | undefined> => {
	appApi.defaults.headers.common['Authorization'] = `Bearer ${token.access!}`
	try{
		const data = await appApi.post('/category/save', {
			name, category_type: type
		}).then(async (res) => {
			if (res.status === 200) {
				const r = await appApi.get(`/category/${type}`)
				const newGroup = r.data as categoryFetchSuccess
				const createdCate = newGroup.result.category_all.filter(cate => cate.name === name)
				return createdCate
			}
			return undefined
		})
		if (data === undefined) {return undefined}
		return data[0]

	} catch (err) {
		return undefined
	}
}

export {fetchCategory, createCategory}