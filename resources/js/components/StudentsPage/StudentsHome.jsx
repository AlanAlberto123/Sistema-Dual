import React from 'react';

const StudentsHome = () => {
    const student = JSON.parse(localStorage.getItem('student'));

    if (!student) {
    return <div className="p-6">No se encontraron datos del estudiante.</div>;
  }

  return (
     <div className="p-6 max-w-lg mx-auto space-y-4">
      <h1 className="text-3xl">Bienvenido, {student.Nombre} {student.Apellidos}</h1>
      <hr></hr>
      <div>
        <label className="block mb-1">No. de Control</label>
        <input
          type="text"
          readOnly
          value={student.No_control}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Carrera</label>
        <input
          type="text"
          readOnly
          value={student.carrera}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Estatus</label>
        <input
          type="text"
          readOnly
          value={student.estatus}
          className="w-full p-2 border rounded"
        />
        <hr></hr>
         <h1 className="text-3xl">Datos Adicionales</h1>
      </div>
      <div>
        <label className="block mb-1">Dirección</label>
        <input
          type="text"
          readOnly
          value={student.Direccion || ''}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Teléfono</label>
        <input
          type="text"
          readOnly
          value={student.Telefono || ''}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Correo Institucional</label>
        <input
          type="text"
          readOnly
          value={student.Correo_institucional || ''}
          className="w-full p-2 border rounded"
        />
        <hr></hr>
      </div>
      <div class="card">
        <div class="card-header">
          <h3> Inscripcion</h3>
        </div>
        <div class="card-body">
          <h3>Estatus</h3>
        </div>

      </div>
    </div>
  )
}

export default StudentsHome