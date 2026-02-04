import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LogOut from "@/components/LogOut";
import { useSelector } from "react-redux";

function Settings() {
  const adminData = useSelector((state) => state.admin.adminData);
  return (
    <>
      <div className="p-4 sm:p-8 max-w-4xl mx-auto font-sans">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-800 tracking-tighter">
            App Settings
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Manage your workspace preferences and security.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100">
                <PersonIcon />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">
                  Account Session
                </h3>
                <p className="text-xs text-slate-400 font-medium tracking-tight">
                  Active login details
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                  Signed in as
                </span>
                <p className="text-sm font-bold text-slate-700 mt-2">
                  {adminData.email}
                </p>
              </div>
              <div className="flex-1 p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                  Current Session
                </span>
                <p className="text-sm font-bold text-slate-700 mt-2">
                  Today, 10:45 AM
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50/30 rounded-[2.5rem] p-6 sm:p-10 border border-red-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shrink-0">
                  <LogoutIcon sx={{ fontSize: 28 }} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-red-800">
                    End Session
                  </h3>
                  <p className="text-xs text-red-400 font-medium">
                    Safe logout from Nexus Admin
                  </p>
                </div>
              </div>

              <LogOut
                styles={
                  "px-10 h-14 rounded-2xl font-black text-[10px] uppercase tracking-[2px] bg-red-600 text-white shadow-xl shadow-red-200 hover:bg-red-700 transition-all active:scale-95 cursor-pointer"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
