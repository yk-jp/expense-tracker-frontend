import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Calender from './components/Calender';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Calender />} />
    </Routes>
  </BrowserRouter>
);

export default App;
