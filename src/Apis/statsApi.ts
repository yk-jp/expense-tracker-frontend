/* eslint-disable dot-notation */
import tokens from "../Interface/Token";
import appApi from "./appApi";

const fetchStatsInMonth = async (token: tokens, year: string, month: string) => {
	appApi.defaults.headers.common['Authorization'] = `Bearer ${token.access!}`

	try{
		const data = await appApi.post('/stats/', {
			year, month
		})

		console.log(data.data)
	} catch(err) {
		console.log(err)
	}
}

export default fetchStatsInMonth