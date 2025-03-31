import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import RegisterPage from './pages/RegisterPage';
import PersonnelDashboard from './pages/PersonnelDashboard';
import Navbar from './components/navbar'; // 🆕 Navbar importu

function App() {
  return (
    <Router>
      <Navbar /> {/* 🆕 Navbar buraya yerleştirildi */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/employee" element={<PersonnelDashboard />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
