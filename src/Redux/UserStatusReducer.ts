/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { USRAction, USCategoryAction, userState } from "../Interface/Reducers"
import { ActionType } from "./ActionTypes"


const userStatusReducer = (state: userState, action: USRAction | USCategoryAction): userState => {
	switch(action.type){
		case ActionType.LOGIN_USER:{
			const currentAction = action as USRAction
			return {
				...state,
				loggedIn: true,
				tokens: {refresh: currentAction.token!.refresh, access: currentAction.token!.access},
				email: currentAction.email
			}
		}

		case ActionType.LOGOUT_USER: 
			return {
				...state,
				loggedIn: false,
				tokens: null,
				email: null
			}
		case ActionType.ADD_INCOME_CATEGORY: {
			const currentAction = action as USCategoryAction
			return {
				...state,
				category: {
					...state.category,
					income: [...state.category.income, ...currentAction.newCategory]
				}
			}
		}
		case ActionType.ADD_EXPENSE_CATEGORY: {
			const currentAction = action as USCategoryAction
			return {
				...state,
				category: {
					...state.category,
					expense: [...state.category.expense, ...currentAction.newCategory]
				}
			}
		}

		default: 
			return state
	}
}

export default userStatusReducer
