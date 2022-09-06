import tokens from "./Token"


export interface registerAccountFailed {
	response: {
		data: {
			message: string,
			is_success: boolean
		}
	}
}

export interface loginFailed {
	response: {
		data: {
			detail: string
		}
	}
}

export interface generateTokenFailed {
	response: {
		data: {
			detail: string,
			code: string
		}
	}
}

export interface generateTokenSuccess {
	access: string
}
