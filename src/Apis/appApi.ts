import axios, { AxiosRequestConfig } from "axios";

export default axios.create({
	baseURL: "http://localhost:8000"
})