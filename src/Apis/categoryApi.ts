/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import appApi from "./appApi";
import { generateNewToken } from "./accountApi";
import { Tokens } from "../Interface/Token";
import { CategoryFetchSuccess, CategoryDeleteSuccess } from "../Interface/ApiReturns";
import { Category, CategoryAll} from '../Interface/Category'

const fetchCategory = async (token: Tokens): Promise<CategoryAll | Tokens> => {
	appApi.defaults.headers.common['Authorization'] = `Bearer ${token.access!}`
	try{
		const dataIncome = await appApi.get('/category/Income')
		const categoryIncome = dataIncome.data as CategoryFetchSuccess
		const dataExpense = await appApi.get('/category/Expense')
		const categoryExpense = dataExpense.data as CategoryFetchSuccess
		return {income: categoryIncome.result.category_all, expense: categoryExpense.result.category_all}

	} catch (err) {
		const res = await generateNewToken(token.refresh!)
		const newToken = res as Tokens
		return newToken
	}

}

const createCategory = async (token: Tokens, name: string, type: string): Promise<Category | undefined> => {
	appApi.defaults.headers.common['Authorization'] = `Bearer ${token.access!}`
	try{
		const data = await appApi.post('/category/save', {
			name, category_type: type
		}).then(async (res) => {
			if (res.status === 200) {
				const r = await appApi.get(`/category/${type}`)
				const newGroup = r.data as CategoryFetchSuccess
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

const deleteCategory = async (token: Tokens, id: number, name: string, type: string) => {
	appApi.defaults.headers.common['Authorization'] = `Bearer ${token.access!}`
	try{
		const data = await appApi.delete(`/category/delete/${type}/${id}/`, {
			data: { name }
		})
		return data.data as CategoryDeleteSuccess
	} catch (err) {
		return false
	}
}

export {fetchCategory, createCategory, deleteCategory}