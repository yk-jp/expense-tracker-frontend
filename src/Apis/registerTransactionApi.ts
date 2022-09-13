/* eslint-disable dot-notation */
import tokens from "../Interface/Token";
import appApi from "./appApi";

const postTransaction = async(token: tokens, event: string, amount: number, date: string, memo: string, category: number) => {
	appApi.defaults.headers.common['Authorization'] = `Bearer ${token.access!}`

	try{
		const data = await appApi.post('/transaction/save', {
			event, amount, date, memo, category
		}
		)
		// TODO: handle token expire pattern 
		console.log(data.data)
	} catch(err) {
		console.log(err)
	}
}

export default postTransaction