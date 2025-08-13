import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentLogin from './components/Auth/StudentLogin';
import CoordinatorLogin from './components/Auth/CoordinatorLogin';
import StudentsHome from './components/StudentsPage/StudentsHome';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<StudentLogin />} />
          <Route path="/login-coordinador" element={<CoordinatorLogin />} />
          <Route path="/students-home" element={<StudentsHome />} />
        </Routes>
      </Router>
    </React.StrictMode>,
  );
}