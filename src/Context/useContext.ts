import React, { createContext } from "react";
import { displayState, DSRAction, userState, USRAction } from "../Interface/Reducers";


const AppContext = createContext({} as {
  displayStatus: displayState,
  dispatchDisplayStatus: React.Dispatch<DSRAction>,
	userStatus: userState,
	dispatchUserState: React.Dispatch<USRAction>
})

export default AppContext