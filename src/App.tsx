import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Calender from './components/Calender';
import Login from './components/Login';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Calender />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
