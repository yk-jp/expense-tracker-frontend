import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import ApiConnectionTest from './components/apitTest/ApiConnection';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/apiTest' element={<ApiConnectionTest />} />
    </Routes>
  </BrowserRouter>
);

export default App;
