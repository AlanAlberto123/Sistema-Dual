import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CoordinatorHome = () => {
  const [coordinator, setCoordinator] = useState(() => {
    const raw = localStorage.getItem('coordinator');
    return raw ? JSON.parse(raw) : null;
  });
  const [userEmail, setUserEmail] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u).email : '';
  });

  useEffect(() => {
    // Refresca desde el backend (por si los datos cambiaron)
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('/api/coordinator/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => {
      if (data?.coordinator) {
        setCoordinator(data.coordinator);
        localStorage.setItem('coordinator', JSON.stringify(data.coordinator));
      }
      if (data?.user?.email) {
        setUserEmail(data.user.email);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    })
    .catch(() => {/* silenciar o mostrar toast */});
  }, []);

  if (!coordinator) {
    return <div className="p-6">No se encontraron datos del coordinador.</div>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <h1 className="text-3xl">
        Bienvenido, {coordinator.Nombre || ''} {coordinator.Apellidos || ''}
      </h1>

      <div>
        <label className="block mb-1">Correo</label>
        <input
          type="text"
          readOnly
          value={userEmail || ''}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Teléfono</label>
        <input
          type="text"
          readOnly
          value={coordinator.Telefono || ''}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default CoordinatorHome;