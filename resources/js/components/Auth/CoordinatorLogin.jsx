import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CoordinatorLogin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/login/coordinator', {
        name,
        password,
      });

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('role', data.rol || 'coordinator');

      // TODO: ajusta a la ruta real del panel del coordinador
      navigate('/');
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
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl mb-4 text-center">Ingreso Coordinadores</h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Usuario</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 py-2 border rounded hover:bg-gray-50"
          >
            Atrás
          </button>
          <button
            type="submit"
            className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CoordinatorLogin;