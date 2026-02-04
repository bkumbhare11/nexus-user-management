import React from "react";
import Hamburger from "./Hamburger";
import { useLocation } from "react-router-dom";
import LogOut from "./LogOut";

function Navbar() {
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname === "/") return "Overview";
    if (location.pathname === "/allusers") return "User Management";
    if (location.pathname === "/addusers") return "Registration";
    if (location.pathname === "/profile") return "My Profile";
    if (location.pathname === "/settings") return "Settings";
    if (location.pathname.includes("/edituser")) return "Edit User Profile";
    if (location.pathname.includes("userdetails")) return "User Information";
  };

  const getSubTitle = () => {
    if (location.pathname === "/") return "Dashboard";
    if (location.pathname === "/allusers") return "All Registered Users";
    if (location.pathname === "/addusers") return "Add New User";
    if (location.pathname === "/profile") return "Admin Profile";
    if (location.pathname === "/settings") return "Preferences";
    if (location.pathname.includes("/edituser"))
      return "Update User Information";
    if (location.pathname.includes("userdetails"))
      return "Full Profile Overview";
  };

  return (
    <>
      <header className="h-20 flex items-center justify-between px-6 bg-white border-b border-slate-100 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="sm:hidden p-2  hover:bg-slate-50 rounded-lg transition-colors">
            <Hamburger />
          </div>

          <div className="hidden sm:flex flex-col">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest leading-none">
              {getPageTitle()}
            </h2>
            <p className="text-lg font-bold text-slate-900">{getSubTitle()}</p>
          </div>
        </div>

        <div className="sm:hidden flex flex-col items-center">
          <h1 className="font-black text-xl tracking-tighter text-slate-900 leading-none">
            NEXUS
          </h1>
          <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest mt-1">
            Admin
          </p>
        </div>

        <div>
          <LogOut styles="cursor-pointer flex items-center justify-center gap-2 p-2 sm:px-5 sm:py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-red-600 hover:shadow-lg hover:shadow-red-100 transition-all duration-300" />
        </div>
      </header>
    </>
  );
}

export default Navbar;
