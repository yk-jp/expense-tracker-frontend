/* eslint-disable default-param-last */
import { USRAction } from "../Interface/Reducers"
import { ActionType } from "./ActionTypes"

interface userState {
	loggedIn: boolean
}

export const initialState: userState = {
	loggedIn: false
}

const userStatusReducer = (state: userState = initialState, action: USRAction) => {
	switch(action.type){
		case ActionType.LOGIN_USER:
			return {
				loggedIn: true
			}
		default: 
			return state
	}
}

export default userStatusReducer

// const reducer = (state, action) => {
// 	switch (action.type) {
// 		case 'deposit':
// 			return state + action.payload
// 		case 'withdraw':
// 			return state + action.payload
// 		default:
// 			return state
// 	}
// }
