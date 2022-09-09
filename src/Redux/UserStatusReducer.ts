/* eslint-disable consistent-return */
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
			if (state.category.income.length === 0){
				return {
					...state,
					category: {
						expense: state.category.expense,
						income: currentAction.newCategory
					}
				}
			} if (currentAction.newCategory.length === 1) {
				const cate = currentAction.newCategory[0]
				state.category.income.forEach(old => {
					if (old.name === cate.name) {
						return {...state}
					}
				})
				return {
					...state,
					category: {
						expense: state.category.expense,
						income: [...state.category.income, cate]
					}
				}
			}
			return {...state}
		}
		
		case ActionType.ADD_EXPENSE_CATEGORY: {
			const currentAction = action as USCategoryAction
			if (state.category.expense.length === 0){
				return {
					...state,
					category: {
						expense: currentAction.newCategory,
						income: state.category.income
					}
				}
			} if (currentAction.newCategory.length === 1) {
				const cate = currentAction.newCategory[0]
				state.category.expense.forEach(old => {
					if (old.name === cate.name) {
						return {...state}
					}
				})
				return {
					...state,
					category: {
						expense: [...state.category.expense, cate],
						income: state.category.income
					}
				}
			}
			return {...state}
		}

		default: 
			return state
	}
}

export default userStatusReducer
