import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import AppRoutes from './routes/routes';

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
