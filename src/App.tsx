import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Calender from './components/Calender';
import Login from './components/Login';
import BarGraph from './components/BarGraph';
import LineGraph from './components/LineGraph';
import Resister from './components/Resister';
import MonthlyDetail from './components/MonthlyDetail';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MonthlyDetail />} />
      <Route path="/barGraph" element={<BarGraph />} />
      <Route path='/lineGraph' element={<LineGraph />} />
      <Route path="/calendar" element={<Calender />} />
      <Route path="/resister" element={<Resister />} />
      <Route path="/login" element={<Login />} />
      <Route path="/calendar" element={<Calender />} />
    </Routes>
  </BrowserRouter>
);

export default App;

