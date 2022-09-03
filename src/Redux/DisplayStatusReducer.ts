/* eslint-disable default-param-last */
import { DSRAction, } from "../Interface/Reducers"
import { ActionType } from "./ActionTypes"



interface displayState{
	isRegisterShown: boolean,
	isMiniCalendarShown: boolean
}
export const initialState: displayState = {
	isRegisterShown: false,
	isMiniCalendarShown: false
}


const displayStatusReducer = (state: displayState, action: DSRAction) => {
	switch(action.type){
		case ActionType.OPEN_REGISTER:
			return {
				...state,
				isRegisterShown: true
			}
		case ActionType.HIDE_REGISTER:
			return {
				...state,
				isRegisterShown: false
			}
		default:
			return state
	}
}

export default displayStatusReducer