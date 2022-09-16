import React, { createContext } from "react";
import { displayState, DSRAction, userState, USRAction, transactionState, TransSRAction, USCategoryAction } from "../Interface/Reducers";


const AppContext = createContext({} as {
  displayStatus: displayState,
  dispatchDisplayStatus: React.Dispatch<DSRAction >,
	userStatus: userState,
	dispatchUserState: React.Dispatch<USRAction | USCategoryAction>,
	transactionStatus: transactionState,
	dispatchTransactionStatus: React.Dispatch<TransSRAction>
})

export default AppContext