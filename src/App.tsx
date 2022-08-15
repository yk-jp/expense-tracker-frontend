import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import ApiConnectionTest from './components/apitTest/ApiConnection';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/apiTest' element={<ApiConnectionTest />} />
    </Routes>
  </BrowserRouter>
);

export default App;
