import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AccidentDetection from './components/AccidentDetection';
import BloodDonation from './components/BloodDonation';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/landingpage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/homepage' element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blood-donation" element={<BloodDonation />} />
            <Route path="/accident-detection" element={<AccidentDetection />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
