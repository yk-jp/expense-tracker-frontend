import { TransSRAction, transactionState } from "../Interface/Reducers";
import transactionFroFetch from '../Interface/Transaction'
import { ActionType } from "./ActionTypes";

const transactionStateReducer = (state: transactionState, action: TransSRAction): transactionState => {
	switch (action.type) {
		case ActionType.ADD_TRANSACTION_MONTH_FOR_INIT: {
			return {
				...state,
				monthlyForCalendar: {
					target: {year: parseInt(action.year, 10), month: parseInt(action.month, 10)},
					transactions: action.newTrans
				},
				monthlyForDetail: {
					target: {year: parseInt(action.year, 10), month: parseInt(action.month, 10)},
					transactions: action.newTrans
				}
			}
		}

		// TODO: need to develop for different month
		case ActionType.ADD_TRANSACTION_MONTH_FOR_CALENDAR: {
			const income: transactionFroFetch[] = []
			return {
				...state,
			}
		}
		case ActionType.ADD_TRANSACTION_MONTH_FOR_DETAIL: {
			const i = 0
			return {
				...state
			}
		}
		case ActionType.ADD_TRANSACTION_YEAR: {
			// TODO: develop transaction_yearly for status
			const i = 0
			return {
				...state
			}
		}
		default:
			return state
	}
}

export default transactionStateReducer