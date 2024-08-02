import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import HomePage from './HomePage';
import OrderPage from './OrderPage';
import ThanksPage from './ThanksPage';

import logo from './logo.png';

function App() {
  return (
      <Router>
        <div>
            <nav className="nav-bar">
                <ul>
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/order">ORDER</Link></li>
                </ul>
                <img src={logo} alt="Logo" className="nav-image"/>
            </nav>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/order" element={<OrderPage />} />
                <Route path="/order/thanks" element={<ThanksPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
