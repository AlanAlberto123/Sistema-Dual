import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const StudentLogin = () => {
  const [noControl, setNoControl] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login/student', {
        no_control: noControl,
        password,
      });

       const token = data.token ?? data.access_token; // soporta ambos
       if (token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        localStorage.removeItem('token');
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        localStorage.removeItem('user');
      }
      if (data.student) {
        localStorage.setItem('student', JSON.stringify(data.student));
      } else {
        localStorage.removeItem('student');
      }

      navigate('/students-home', { replace: true });
    } catch (err) {
      if (err.response?.data?.errors?.no_control) {
        setError(err.response.data.errors.no_control[0]);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Error de conexión');
      }
    }
  };

  return (
     <div className="login-container">
      <div className="simple-banner">
        <h1>Programa de Educación Dual</h1>
        <p>Acceso a plataforma — Estudiantes</p>
      </div>

      <div className="login-panel">
        <div className="tabs">
          <button type="button" className="tab active">Estudiantes</button>
          <button
            type="button"
            className="tab"
            onClick={() => navigate('/login-coordinador')}
          >
            Coordinadores
          </button>
        </div>

        {error && (
          <p style={{ color: '#d32f2f', marginTop: 12, marginBottom: 0 }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>No. de Control</label>
            {/* Usa type="text" para que aplique tu CSS (y no pierdas ceros a la izquierda). */}
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              value={noControl}
              onChange={(e) => setNoControl(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">Entrar</button>

          <button
            type="button"
            className="forgot-password"
            onClick={() => navigate('/recuperar')}
          >
            Olvidé mi contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;