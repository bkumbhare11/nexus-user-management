import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";

function Profile() {
  const adminData = useSelector((state) => state.admin.adminData);
  console.log(adminData);
  return (
    <>
      <div className="p-4 sm:p-8 max-w-5xl mx-auto">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 mb-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>

          <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
            <div className="relative group">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2.5rem] border-4 border-white/10 overflow-hidden shadow-2xl">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg hover:scale-110 transition-transform">
                <EditIcon sx={{ fontSize: 20 }} />
              </button>
            </div>

            <div className="text-center sm:text-left">
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase tracking-[3px] px-3 py-1 rounded-full border border-blue-500/30">
                Super Admin
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tighter">
                {adminData.fullName}
              </h1>
              <p className="text-slate-400 font-medium mt-2">
                Managing Nexus Operations since Jan 2024
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-2 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col">
            <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
              Personal Information
            </h3>

            <div className="flex flex-wrap gap-y-10 gap-x-4">
              <div className="flex flex-col min-w-50 flex-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Full Name
                </span>
                <span className="text-slate-700 font-bold mt-1">
                  {adminData.fullName}
                </span>
              </div>
              <div className="flex flex-col min-w-50 flex-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Email
                </span>
                <span className="text-slate-700 font-bold mt-1">
                  {adminData.email}
                </span>
              </div>
              <div className="flex flex-col min-w-50 flex-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Phone
                </span>
                <span className="text-slate-700 font-bold mt-1">
                  {adminData.phone}
                </span>
              </div>
              <div className="flex flex-col min-w-50 flex-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Location
                </span>
                <span className="text-slate-700 font-bold mt-1">
                  {adminData.location}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[320px] bg-blue-600 rounded-[2rem] p-8 text-white shadow-lg shadow-blue-200 shrink-0">
            <h3 className="text-lg font-black mb-6">System Access</h3>
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-blue-200 text-[10px] font-black uppercase tracking-widest">
                  Role
                </span>
                <p className="font-bold text-xl mt-1 tracking-tight">
                  Nexus Root Admin
                </p>
              </div>
              <div className="pt-6 border-t border-white/10 flex flex-col gap-2">
                <span className="text-blue-200 text-[10px] font-black uppercase tracking-widest">
                  Permissions
                </span>
                <p className="text-sm font-medium leading-relaxed opacity-90">
                  Full access to user management, system logs, and security
                  configurations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
