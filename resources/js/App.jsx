import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentLogin from './components/Auth/StudentLogin';
import CoordinatorLogin from './components/Auth/CoordinatorLogin';
import StudentsHome from './components/StudentsPage/StudentsHome';
import EnRoll from './components/StudentsPage/enRoll';
import StudentLayout from './components/Layout/StudentLayout';
import CoordinatorHome from './components/CoordinatorPage/CoordinatorHome';
import CoordinatorLayout from './components/Layout/CoordinatorLayout';
import AdminLogin from './components/Auth/AdminLogin';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<StudentLogin />} />
          <Route path="/login-coordinador" element={<CoordinatorLogin />} />
          <Route path="/login-admin" element={<AdminLogin/>} />
          <Route element={<StudentLayout />}>
            <Route path="/students-home" element={<StudentsHome />} />
            <Route path="/inscripcion" element={<EnRoll />} />
          </Route>
          <Route element={<CoordinatorLayout/>}>
            <Route path="/coordinator-home" element={<CoordinatorHome />} />
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>,
  );
}