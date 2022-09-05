/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Login from './components/Login';
import SignIn from './components/SignIn';
import { displayState, userState } from './Interface/Reducers';
import displayStatusReducer from './Redux/DisplayStatusReducer';
import AppContext from './Context/useContext';
import userStatusReducer from './Redux/UserStatusReducer';

const displayInitialState: displayState = {
  isRegisterShown: false,
  isMiniCalendarShown: false
}

const userInitialState: userState = {
  loggedIn: false,
  email: null,
  tokens: null,
  category: []
}

const App = () => {
  const [displayStatus, dispatchDisplayStatus] = useReducer(displayStatusReducer, displayInitialState)
  const [userStatus, dispatchUserState] = useReducer(userStatusReducer, userInitialState)

  return (
  <BrowserRouter>
    <AppContext.Provider value={{displayStatus, dispatchDisplayStatus, userStatus, dispatchUserState }} >
    <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </AppContext.Provider>
    {displayStatus.isRegisterShown && 
      <div className='fixed top-0 right-0 w-screen h-screen bg-black opacity-50 z-30'/>
    }
  </BrowserRouter>
)};

export default App;

