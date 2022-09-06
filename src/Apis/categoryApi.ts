/* eslint-disable @typescript-eslint/no-non-null-assertion */
import appApi from "./appApi";
import { generateNewToken } from "./accountApi";
import tokens from "../Interface/Token";
import { categoryFetchSuccess } from "../Interface/ApiReturns";

const fetchCategory = async (token: tokens) => {
	try{
		const dataIncome = await appApi.get('/category/Income', {
			headers: {"Authorization": `Bearer ${token.access!}`}
		})
		const categoryIncome = dataIncome.data as categoryFetchSuccess
		const dataExpense = await appApi.get('/category/Expense', {
			headers: {"Authorization": `Bearer ${token.access!}`}
		})
		const categoryExpense = dataExpense.data as categoryFetchSuccess
	} catch (err) {
		console.error(err)
	}

}

const createCategory = (token: tokens, name: string, type: string) => {
	const a = 0
}

export {fetchCategory, createCategory}