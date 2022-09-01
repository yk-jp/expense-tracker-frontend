import tokens from "./Token"


export interface registerAccountResult {
	response: {
		data: {
			message: string,
			is_success: boolean
		}
	}
}

export interface generateTokenFailed {
	response: {
		data: {
			detail: string
		}
	}
}
