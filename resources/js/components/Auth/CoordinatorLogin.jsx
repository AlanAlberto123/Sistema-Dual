import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const CoordinatorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/login/coordinator', { email, password });
      
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('role', data.role || 'coordinator');   // era data.rol
      localStorage.setItem('coordinator', JSON.stringify(
        data.coordinator ?? data.user?.coordinator ?? null
      )); 

      // TODO: ajusta a la ruta real del panel del coordinador
      navigate('/coordinator-home', {replace:true});
    } catch (err) {
      // API puede devolver distintos formatos; cubrimos mensaje general y errores de campos
      if (err.response?.data?.errors?.name) {
        setError(err.response.data.errors.name[0]);
      } else if (err.response?.data?.errors?.password) {
        setError(err.response.data.errors.password[0]);
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
        <p>Acceso a plataforma — Coordinadores</p>
      </div>

      <div className="login-panel">
        <div className="tabs">
          <button
            type="button"
            className="tab"
            onClick={() => navigate('/')} // ajusta si tu ruta es distinta
          >
            Estudiantes
          </button>
        </div>

        {error && (
          <p style={{ color: '#d32f2f', marginTop: 12, marginBottom: 0 }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Usuario (correo)</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

export default CoordinatorLogin;