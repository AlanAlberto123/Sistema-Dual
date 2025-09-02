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

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<StudentLogin />} />
          <Route path="/login-coordinador" element={<CoordinatorLogin />} />
          <Route element={<StudentLayout />}>
            <Route path="/students-home" element={<StudentsHome />} />
            <Route path="/inscripcion" element={<EnRoll />} />
          </Route>
          <Route path="/coordinator-home" element={<CoordinatorHome />} />
        </Routes>
      </Router>
    </React.StrictMode>,
  );
}