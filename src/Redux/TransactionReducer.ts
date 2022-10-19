import { TransSRAction, TransactionState } from "../Interface/Reducers";
import { TransactionForFetch } from '../Interface/Transaction'
import { ActionType } from "./ActionTypes";

const transactionStateReducer = (state: TransactionState, action: TransSRAction): TransactionState => {
	switch (action.type) {
		case ActionType.ADD_TRANSACTION_MONTH_FOR_CALENDAR: {
			return {
				...state,
				monthlyForCalendar: {
					target: {year: parseInt(action.year, 10), month: parseInt(action.month, 10)},
					transactions: action.newTrans
				}
			}
		}

		case ActionType.ADD_TRANSACTION_MONTH_FOR_DETAIL: {
			return {
				...state,
				monthlyForDetail: {
					target: {year: parseInt(action.year, 10), month: parseInt(action.month, 10)},
					transactions: action.newTrans
				}
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