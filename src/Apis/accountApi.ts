import appApi from "./appApi";
import tokens from "../Interface/Token";
import { loginFailed, registerAccountFailed, generateTokenFailed, generateTokenSuccess } from "../Interface/ApiReturns";

const loginApi = async (email: string | null, password: string | null): Promise<tokens | loginFailed> => {
	try{
		const data = await appApi.post('/auth/token/', {
			email, password
		})
		localStorage.setItem('expense-tracker-tokens', JSON.stringify(data.data))
		const userToken: tokens = JSON.parse(localStorage.getItem('expense-tracker-tokens') || "") as tokens
		return userToken
	} catch (err) {
		const errRes = err as loginFailed
		return errRes
	}
}

const signInApi = async (email: string | null, password: string | null): Promise<tokens | registerAccountFailed> => {
	try {
		const data = await appApi.post('/auth/register/', {
			email, password
		})
		.then(async() => {
			const loginData: tokens | loginFailed = await loginApi(email, password)
			return loginData as tokens
		})
		return data
	} catch (err) {
		const errRes = err as registerAccountFailed
		return errRes
	}
}

const generateNewToken = async (refreshToken: string): Promise<tokens | generateTokenFailed> => {
	try {
		const data = await appApi.post('/auth/token/refresh/', {
			"refresh": refreshToken
		})
		const accessToken = data.data as generateTokenSuccess
		return {refresh: refreshToken, access: accessToken.access}
	} catch (err) {
		const errRes = err as generateTokenFailed
		return errRes
	}
}

export { loginApi, signInApi, generateNewToken }