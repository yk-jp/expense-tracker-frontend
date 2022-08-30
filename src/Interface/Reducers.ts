
export interface DSRAction {
	type: string,
}

export interface USRAction {
	type: string,
	payload: number
}

export interface displayState{
	isRegisterShown: boolean,
	isMiniCalendarShown: boolean
}

export interface userState {
	loggedIn: boolean
}
