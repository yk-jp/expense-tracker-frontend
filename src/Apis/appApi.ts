import axios from "axios";

export const createAxiosHeader = (accessToken: string): unknown=> {
	const config = {
		headers: {
			"Authorization": `Bearer${accessToken}`
		}
	}
	return config
}

export default axios.create({
	baseURL: "http://localhost:8000"
})