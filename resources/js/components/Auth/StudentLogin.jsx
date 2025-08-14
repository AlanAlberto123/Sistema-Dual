import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [noControl, setNoControl] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/login/student', {
        no_control: noControl,
        password,
      });

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('student', JSON.stringify(data.student));
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;

      // TODO: ajusta la ruta tras login de estudiante
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
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl mb-4 text-center">Ingreso Estudiantes</h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">No. de Control</label>
          <input
            type="number"
            value={noControl}
            onChange={(e) => setNoControl(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="button"
          onClick={() => navigate('/login-coordinador')}
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Coordinadores
        </button>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default StudentLogin;