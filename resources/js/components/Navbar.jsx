import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const [isAuthed, setIsAuthed] = useState(false);

     useEffect(() => {
    setIsAuthed(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        await axios.post(
          "/api/logout",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (e) {
      // Si el token ya no es válido, igual limpiaremos cliente
      // console.warn(e);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("student");
      navigate("/"); // tu ruta de login de estudiante
    }
  };

  return (
    <nav className="navbar navbar-expand bg-light border-bottom">
      <div className="container">
        <NavLink className="navbar-brand" to="/students-home">
          Sistema Dual
        </NavLink>

        <div className="navbar-nav">
          <NavLink
            to="/inscripcion"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Inscripciones
          </NavLink>
        </div>

        {isAuthed && (
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
}