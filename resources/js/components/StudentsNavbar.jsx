import { Link, NavLink } from "react-router-dom";

const linkBase =
  "px-3 py-1 rounded-md hover:bg-gray-100 transition";
const active =
  "font-medium ring-1 ring-gray-300 bg-gray-100";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold">
          Sistema Dual
        </Link>

        <div className="flex gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to="/inscripciones"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            Inscripciones
          </NavLink>
        </div>
      </nav>
    </header>
  );
}