import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Calender from './components/Calender';
import Login from './components/Login';
import Resister from './components/Resister';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Resister />} />
      <Route path="/login" element={<Login />} />
      <Route path="/calendar" element={<Calender />} />
    </Routes>
  </BrowserRouter>
);

export default App;
