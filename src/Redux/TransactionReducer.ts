import { TransSRAction, TransactionState, TransSRActionUpdate } from "../Interface/Reducers";
import { ActionType } from "./ActionTypes";

const transactionStateReducer = (state: TransactionState, action: TransSRAction | TransSRActionUpdate ): TransactionState => {
	switch (action.type) {
		case ActionType.ADD_TRANSACTION_MONTH_FOR_CALENDAR: {
			const currentAction = action as TransSRAction
			return {
				...state,
				monthlyForCalendar: {
					target: {year: parseInt(currentAction.year, 10), month: parseInt(currentAction.month, 10)},
					transactions: currentAction.newTrans
				}
			}
		}

		case ActionType.ADD_TRANSACTION_MONTH_FOR_DETAIL: {
			const currentAction = action as TransSRAction
			return {
				...state,
				monthlyForDetail: {
					target: {year: parseInt(currentAction.year, 10), month: parseInt(currentAction.month, 10)},
					transactions: currentAction.newTrans,
				},
				fetchSuccess: currentAction.fetchSuccess
			}
		}

		case ActionType.UPDATE_TRANSACTION_MONTH : {
			return {
				...state,
				fetchSuccess: false
			}
		}

		default:
			return state
	}
}

export default transactionStateReducer