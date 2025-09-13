import Navbar from "../CoordinatorNavbar";
import Sidebar from "../CoordinatorSidebar";
import { Outlet } from "react-router-dom";

export default function CoordinatorLayout() {
  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <Outlet />
        </div>
      </div>
    </>
  );
}