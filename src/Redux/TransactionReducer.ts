import { TransSRAction, transactionState } from "../Interface/Reducers";
import { ActionType } from "./ActionTypes";

const transactionStateReducer = (state: transactionState, action: TransSRAction): transactionState => {
	switch (action.type) {
		case ActionType.ADD_TRANSACTION_MONTH: {
			// TODO: develop transaction_monthly for detail
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