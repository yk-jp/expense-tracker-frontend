/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Category } from "../Interface/Category"
import { USRAction, USCategoryAction, UserState, USCategoryDeleteAction } from "../Interface/Reducers"
import { UserInfo } from "../Interface/UserInfo"
import { ActionType } from "./ActionTypes"


const userStatusReducer = (state: UserState, action: USRAction | USCategoryAction | USCategoryDeleteAction): UserState => {
	switch(action.type){
		case ActionType.LOGIN_USER:{
			const currentAction = action as USRAction
			const userInfo: UserInfo = {email: currentAction.email!, tokens: currentAction.token!}
			localStorage.setItem('userInfo', JSON.stringify(userInfo))
			return {
				...state,
				loggedIn: true,
				tokens: {refresh: currentAction.token!.refresh, access: currentAction.token!.access},
				email: currentAction.email
			}
		}

		case ActionType.LOGOUT_USER: 
			localStorage.removeItem('userInfo')
			return {
				...state,
				loggedIn: false,
				tokens: null,
				email: null
			}

		case ActionType.ADD_INCOME_CATEGORY: {
			const currentAction = action as USCategoryAction
			if (currentAction.newCategory.length > 1){
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

		// FIXME: adjust set state
		case ActionType.DELETE_CATEGORY: {
			const currentAction = action as USCategoryDeleteAction
			let categories: Category[]
			if (currentAction.categoryType === 'Income') {
				categories = [...state.category.income]
				categories = categories.filter(cate => cate.id !== currentAction.categoryId)
				return {
					...state,
					category: {
						income: categories,
						expense: [...state.category.expense]
					}
				}
			}
			categories = [...state.category.expense]
			categories = categories.filter(cate => cate.id !== currentAction.categoryId)
			return {
				...state,
				category: {
					expense: categories,
					income: [...state.category.income]
				}
			}
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
