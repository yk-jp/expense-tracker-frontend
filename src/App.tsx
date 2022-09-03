/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Login from './components/Login';
import SignIn from './components/SignIn';
import { displayState, DSRAction } from './Interface/Reducers';
import displayStatusReducer from './Redux/DisplayStatusReducer';
import AppContext from './Context/useContext';

const displayInitialState: displayState = {
  isRegisterShown: false,
  isMiniCalendarShown: false
}

const App = () => {
  const [displayStatus, dispatchDisplayStatus] = useReducer(displayStatusReducer, displayInitialState)

  return (
  <BrowserRouter>
    <AppContext.Provider value={{displayStatus, dispatchDisplayStatus }} >
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

