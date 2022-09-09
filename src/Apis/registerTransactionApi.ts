/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import tokens from "../Interface/Token";
import { transactionForPost } from "../Interface/Transaction";
import appApi from "./appApi";

const postTransaction = async(token: tokens, content: transactionForPost) => {
	console.log(token.access)

	// TODO: it's alway fail because of token error
	try{
		const data = await appApi.post('/transaction/save', {
			headers: {"Authorization": `Bearer ${token.access!}`},
			content
		}
		)
		console.log(data.data)
	} catch(err) {
		console.log(err)
	}
}

export default postTransaction