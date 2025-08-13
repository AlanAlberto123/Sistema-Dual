import React from 'react'

const StudentsHome = () => {

    const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="p-6">
      <h1 className="text-3xl">Bienvenido, {user?.name || 'Estudiante'}</h1>
      <p className="mt-4">Este es el panel principal de estudiantes.</p>
    </div>
  )
}

export default StudentsHome