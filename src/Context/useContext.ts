import React, { createContext } from "react";
import { DisplayState, DSRAction, UserState, USRAction, TransactionState, TransSRAction, USCategoryAction, USCategoryDeleteAction } from "../Interface/Reducers";


const AppContext = createContext({} as {
  displayStatus: DisplayState,
  dispatchDisplayStatus: React.Dispatch<DSRAction >,
	userStatus: UserState,
	dispatchUserState: React.Dispatch<USRAction | USCategoryAction | USCategoryDeleteAction>,
	transactionStatus: TransactionState ,
	dispatchTransactionStatus: React.Dispatch<TransSRAction>
})

export default AppContext