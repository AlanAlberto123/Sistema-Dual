import { useState } from "react";

export default function enRoll() {
    const student = JSON.parse(localStorage.getItem('student'));

    return (
        <div className="p-6 max-w-lg mx-auto space-y-4">
            <h1>Inscripcion</h1>
            <hr></hr>
            <div className="d-flex justify-content-center my-5">
                <div className="card shadow w-50">
                    <div className="card-header text-center">
                        <h2 className="h5 mb-0">Vigencia de seguro facultativo</h2>
                </div>

                <div className="card-body text-center">
                    <p className="mb-3">
                        El documento se obtendrá de manera externa y, una vez conseguido, 
                        se subirá al sistema.  
                        <br />
                        Eso servirá para comprobar si aún sigue vigente.
                    </p>

                    {/* Campo archivo */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <input type="text" className="form-control w-75" readOnly placeholder="Selecciona un archivo..." />
                        <label className="btn btn-secondary ms-2">
                            Examinar
                            <input type="file" hidden />
                        </label>
                    </div>

                    {/* Botón subir */}
                    <button className="btn btn-primary w-100">Subir</button>
                </div>

                <div className="card-footer text-center">
                    <small>Aceptado: En espera</small>
                </div>
            </div>
        </div>
            
        </div>
    );
}