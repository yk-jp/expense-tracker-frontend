/* eslint-disable default-param-last */
import { DSRAction, DisplayState } from "../Interface/Reducers"
import { ActionType } from "./ActionTypes"

export const initialState: DisplayState = {
	isRegisterShown: false,
	isMiniCalendarShown: false
}


const displayStatusReducer = (state: DisplayState, action: DSRAction) => {
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