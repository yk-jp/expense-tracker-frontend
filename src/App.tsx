/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Main from './components/HomePage';
import Login from './components/LoginPage';
import SignIn from './components/SignPage';
import { DisplayState, UserState, TransactionState } from './Interface/Reducers';
import AppContext from './Context/useContext';
import userStatusReducer from './Redux/UserStatusReducer';
import displayStatusReducer from './Redux/DisplayStatusReducer';
import transactionStateReducer from './Redux/TransactionReducer';
import EditTransaction from './components/EditPage';

const displayInitialState: DisplayState = {
  isRegisterShown: false,
  isMiniCalendarShown: false
}

const userInitialState: UserState = {
  loggedIn: false,
  email: null,
  tokens: null,
  category: {expense: [], income: []}
}

const transactionInitialState: TransactionState = {
  monthlyForCalendar: {target: {year: new Date().getFullYear(), month: new Date().getMonth() + 1}, transactions: []}, 
  monthlyForDetail: {target: {year: new Date().getFullYear(), month: new Date().getMonth() + 1}, transactions: []},
  yearly: {Income: [], Expense: []},
  fetchSuccess: false
}



const App = () => {
  const [displayStatus, dispatchDisplayStatus] = useReducer(displayStatusReducer, displayInitialState)
  const [userStatus, dispatchUserState] = useReducer(userStatusReducer, userInitialState)
  const [transactionStatus, dispatchTransactionStatus] = useReducer(transactionStateReducer, transactionInitialState)


  return (
  <BrowserRouter>
    <AppContext.Provider value={{displayStatus, dispatchDisplayStatus, userStatus, dispatchUserState, transactionStatus, dispatchTransactionStatus }} >
    <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/edit" element={<EditTransaction />} />
      </Routes>
    </AppContext.Provider>
    {displayStatus.isRegisterShown && 
      <div className='fixed top-0 right-0 w-screen h-screen bg-black opacity-50 z-30'/>
    }
  </BrowserRouter>
)};

export default App;

