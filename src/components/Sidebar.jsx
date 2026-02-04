import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React from "react";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";

function Sidebar({ closeSheet }) {
  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const isUsers = location.pathname === "/allusers";
  const isAddUsers = location.pathname === "/addusers";
  const isProfile = location.pathname === "/profile";
  const isSettings = location.pathname === "/settings";

  return (
    <>
      <aside className="flex flex-col gap-2 px-4 py-6  bg-white border-r border-gray-100">
        <Link
          to="/"
          onClick={closeSheet}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
            isDashboard
              ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
              : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
          }`}
        >
          <AssessmentIcon
            sx={{ fontSize: 20 }}
            className={isDashboard ? "text-white" : "group-hover:text-blue-600"}
          />
          <span className="font-bold text-sm tracking-wide">Dashboard</span>
        </Link>

        <Link
          to="/allusers"
          onClick={closeSheet}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
            isUsers
              ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
              : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
          }`}
        >
          <PeopleIcon
            sx={{ fontSize: 20 }}
            className={isUsers ? "text-white" : "group-hover:text-blue-600"}
          />
          <span className="font-bold text-sm tracking-wide">All Users</span>
        </Link>

        <Link
          to="/addusers"
          onClick={closeSheet}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
            isAddUsers
              ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
              : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
          }`}
        >
          <PersonAddIcon
            sx={{ fontSize: 20 }}
            className={isAddUsers ? "text-white" : "group-hover:text-blue-600"}
          />
          <span className="font-bold text-sm tracking-wide">Add User</span>
        </Link>

        <div className="my-4 border-t border-slate-50"></div>

        <Link
          to="/profile"
          onClick={closeSheet}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
            isProfile
              ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
              : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
          }`}
        >
          <AccountCircleIcon
            sx={{ fontSize: 20 }}
            className={isProfile ? "text-white" : "group-hover:text-blue-600"}
          />
          <span className="font-bold text-sm tracking-wide">Profile</span>
        </Link>

        <Link
          to="/settings"
          onClick={closeSheet}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
            isSettings
              ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
              : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
          }`}
        >
          <SettingsIcon
            sx={{ fontSize: 20 }}
            className={isSettings ? "text-white" : "group-hover:text-blue-600"}
          />
          <span className="font-bold text-sm tracking-wide">Settings</span>
        </Link>
      </aside>
    </>
  );
}

export default Sidebar;
