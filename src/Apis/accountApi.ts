/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import appApi from "./appApi";
import { Tokens } from "../Interface/Token";
import { LoginFailed, RegisterAccountFailed, GenerateTokenFailed, GenerateTokenSuccess } from "../Interface/ApiReturns";

const loginApi = async (email: string | null, password: string | null): Promise<Tokens | LoginFailed> => {
	try{
		const data = await appApi.post('/auth/token/', {
			email, password
		})
		localStorage.setItem('expense-tracker-tokens', JSON.stringify(data.data))
		const userToken: Tokens = JSON.parse(localStorage.getItem('expense-tracker-tokens') || "") as Tokens
		return userToken
	} catch (err) {
		const errRes = err as LoginFailed
		return errRes
	}
}

const signInApi = async (email: string | null, password: string | null): Promise<Tokens | RegisterAccountFailed> => {
	try {
		const data = await appApi.post('/auth/register/', {
			email, password
		})
		.then(async() => {
			const loginData: Tokens | LoginFailed = await loginApi(email, password)
			return loginData as Tokens
		})
		return data
	} catch (err) {
		const errRes = err as RegisterAccountFailed
		return errRes
	}
}

const generateNewToken = async (refreshToken: string): Promise<Tokens | GenerateTokenFailed> => {
	try {
		const data = await appApi.post('/auth/token/refresh/', {
			"refresh": refreshToken
		})
		const accessToken = data.data as GenerateTokenSuccess
		return {refresh: refreshToken, access: accessToken.access}
	} catch (err) {
		const errRes = err as GenerateTokenFailed
		return errRes
	}
}

export { loginApi, signInApi, generateNewToken }