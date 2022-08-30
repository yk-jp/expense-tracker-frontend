import React, { createContext, useContext, useReducer} from "react";
import { displayState, DSRAction } from "../Interface/Reducers";


const AppContext = createContext({} as {
  displayStatus: displayState,
  dispatchDisplayStatus: React.Dispatch<DSRAction>
})

export default AppContext