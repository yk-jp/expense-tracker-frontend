import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './sass/App.scss';

import LandingPage from './components/LandingPage/LandingPage';


function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
