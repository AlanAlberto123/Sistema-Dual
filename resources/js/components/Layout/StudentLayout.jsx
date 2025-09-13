import Navbar from "../StudentsNavbar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <div className="container py-3">
        <Outlet />
      </div>
    </>
  );
}