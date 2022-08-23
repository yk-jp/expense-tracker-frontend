import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Calender from './components/Calender';
import Login from './components/Login';
import BarGraph from './components/BarGraph';
import LineGraph from './components/LineGraph';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LineGraph />} />
      <Route path="/calendar" element={<Calender />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;

