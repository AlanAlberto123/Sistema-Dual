import React from 'react';
import { useNavigate } from 'react-router-dom';

const safeJSON = (str, fallback = null) => {
  try { return str ? JSON.parse(str) : fallback; } catch { return fallback; }
};

const StudentsHome = () => {
  const navigate = useNavigate();

  // Lee del storage en cada render
  const token   = localStorage.getItem('token');
  const user    = safeJSON(localStorage.getItem('user'));
  const student = safeJSON(localStorage.getItem('student'));

  // Guards: cortan el render si falta info básica
  if (!token) {
    return (
      <div className="p-6">
        No has iniciado sesión.
        <div className="mt-3">
          <button className="px-3 py-2 border rounded" onClick={() => navigate('/login-student')}>
            Ir al login
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div className="p-6">Cargando usuario…</div>;
  }

  // Si StudentsHome requiere forzosamente info de estudiante:
  if (!student) {
    return <div className="p-6">No se encontró información de estudiante.</div>;
  }

  // Render normal
  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <h1 className="text-3xl">
        Bienvenido, {(student?.Nombre ?? '')} {(student?.Apellidos ?? '')}
      </h1>
      <hr />

      <div>
        <label className="block mb-1">No. de Control</label>
        <input
          type="text"
          readOnly
          value={student?.No_control ?? ''}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Carrera</label>
        <input
          type="text"
          readOnly
          value={student?.carrera ?? ''}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Estatus</label>
        <input
          type="text"
          readOnly
          value={student?.estatus ?? ''}
          className="w-full p-2 border rounded"
        />
      </div>

      <hr />
      <h1 className="text-3xl">Datos Adicionales</h1>

      <div>
        <label className="block mb-1">Dirección</label>
        <input
          type="text"
          readOnly
          value={student?.Direccion ?? ''}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Teléfono</label>
        <input
          type="text"
          readOnly
          value={student?.Telefono ?? ''}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Correo Institucional</label>
        <input
          type="text"
          readOnly
          value={student?.Correo_institucional ?? ''}
          className="w-full p-2 border rounded"
        />
      </div>

      <hr />

      <div className="border rounded shadow-sm">
        <div className="p-3 border-b">
          <h3 className="text-xl">Inscripción</h3>
        </div>
        <div className="p-3">
          <h3 className="text-lg">Estatus</h3>
          <p className="text-sm text-gray-600">
            {student?.estatus ?? '—'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentsHome