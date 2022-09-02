/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { USRAction, userState } from "../Interface/Reducers"
import { ActionType } from "./ActionTypes"


const userStatusReducer = (state: userState, action: USRAction) => {
	switch(action.type){
		case ActionType.LOGIN_USER:
			return {
				...state,
				loggedIn: true,
				tokens: {refresh: action.token!.refresh, access: action.token!.access},
				email: action.email
			}
		case ActionType.LOGOUT_USER:
			return {
				...state,
				loggedIn: false,
				tokens: null,
				email: null
			}
		default: 
			return state
	}
}

export default userStatusReducer