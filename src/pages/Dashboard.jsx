import React from "react";
import { useSelector } from "react-redux";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { useNavigate } from "react-router-dom";
import NoDataFound from "@/components/NoDataFound";
import ContentLoader from "@/components/ContentLoader";
import config from "@/utils/constants";

function Dashboard() {
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users);
  const isLoading = useSelector((state) => state.user.isLoading);
  const adminData = useSelector((state) => state.admin.adminData);
  let active = users.filter((user) => user.status === "Active");
  let InActive = users.filter((user) => user.status !== "Active");

  const departmentsList = [
    { name: "Frontend Development", color: "bg-blue-600" },
    { name: "Backend Development", color: "bg-indigo-500" },
    { name: "Full Stack Development", color: "bg-purple-600" },
    { name: "UI/UX", color: "bg-rose-500" },
    { name: "Quality Assurance (QA)", color: "bg-amber-500" },
    { name: "Human Resources (HR)", color: "bg-emerald-500" },
  ];

  const distributionData = departmentsList.map((dept) => {
    const memberCount = users.filter((u) => u.department === dept.name).length;
    const progressWidth = (memberCount / config.capacity) * 100;

    return {
      ...dept,
      count: memberCount,
      width: progressWidth,
    };
  });

  let storageUsed = Math.round((users.length / config.capacity) * 100);

  return (
    <>
      {isLoading ? (
        <ContentLoader />
      ) : users.length > 0 ? (
        <div className="p-4 sm:p-10 bg-[#f8fafc] min-h-screen text-slate-900 font-sans">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black tracking-tighter text-slate-900">
                Dashboard Overview
              </h1>
              <p className="text-slate-500 font-medium mt-1">
                Welcome back,{" "}
                <span className="text-blue-600 font-bold">
                  {adminData.fullName}
                </span>
                ! Here's what's happening today.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-row gap-6 mb-10">
            <div className="flex-1 min-w-70 bg-white border border-slate-100 rounded-[2rem] p-7 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
              <div>
                <p className="text-[10px]  font-black text-slate-400 uppercase tracking-[2px]">
                  Total Users
                </p>
                <h3 className="text-4xl font-black mt-2 text-slate-800">
                  {users.length}
                </h3>
              </div>
              <div className="p-4 bg-blue-50 text-blue-600 rounded-[1.5rem] group-hover:bg-blue-600 group-hover:text-white transition-all">
                <PeopleAltIcon sx={{ fontSize: 32 }} />
              </div>
            </div>

            <div className="flex-1 min-w-70 bg-white border border-slate-100 rounded-[2rem] p-7 shadow-sm flex items-center justify-between group hover:border-green-200 transition-all">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                  Active Now
                </p>
                <h3 className="text-4xl font-black mt-2 text-green-600">
                  {active.length}
                </h3>
              </div>
              <div className="p-4 bg-green-50 text-green-600 rounded-[1.5rem] group-hover:bg-green-600 group-hover:text-white transition-all">
                <HowToRegIcon sx={{ fontSize: 32 }} />
              </div>
            </div>

            <div className="flex-1 min-w-70 bg-white border border-slate-100 rounded-[2rem] p-7 shadow-sm flex items-center justify-between group hover:border-red-200 transition-all">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                  Inactive
                </p>
                <h3 className="text-4xl font-black mt-2 text-red-500">
                  {InActive.length}
                </h3>
              </div>
              <div className="p-4 bg-red-50 text-red-500 rounded-[1.5rem] group-hover:bg-red-500 group-hover:text-white transition-all">
                <PersonOffIcon sx={{ fontSize: 32 }} />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
                <h3 className="font-black text-xl text-slate-800 tracking-tight">
                  Recent Onboarding
                </h3>
                <button
                  className="text-blue-600 text-[10px] font-black uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                  onClick={() => navigate("/allusers")}
                >
                  View All Directory
                </button>
              </div>

              <div className="p-4 flex flex-col gap-2">
                {[...users]
                  .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
                  .slice(0, 10)
                  .map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 hover:bg-slate-50/80 rounded-3xl transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center font-bold text-slate-400">
                          <img
                            src={`https://ui-avatars.com/api/?name=${user.fullName}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-black text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                            {user.fullName}
                          </p>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">
                            {user.designation}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}
                        >
                          {user.status}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-6 lg:max-w-100">
              <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white border border-slate-800 shadow-xl relative overflow-hidden flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-black text-2xl tracking-tight">
                    System Health
                  </h4>
                  <p className="text-[10px] font-black bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full uppercase tracking-widest border border-blue-500/20">
                    {users.length} / {config.capacity} Users
                  </p>
                </div>

                <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed">
                  Database is performing at optimal capacity.
                </p>

                <div className="space-y-3 mb-10">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-blue-400">
                    <span>Storage Used</span>
                    <span>{storageUsed}%</span>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
                    <div
                      className="bg-blue-500 h-full rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-1000"
                      style={{ width: `${storageUsed}%` }}
                    ></div>
                  </div>
                </div>

                <button className="w-full bg-white text-slate-900 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[2px] hover:bg-blue-500 hover:text-white transition-all shadow-lg cursor-pointer">
                  Upgrade Server
                </button>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex-1">
                <h4 className="font-black text-xl text-slate-800 mb-8 tracking-tight">
                  Staff Distribution
                </h4>
                <div className="flex flex-col gap-8">
                  {distributionData.map((dept) => (
                    <div key={dept.name} className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-black text-slate-700 ">
                          {dept.name}
                        </span>

                        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                          {dept.count}
                        </span>
                      </div>
                      <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                        <div
                          className={`${dept.color} h-full rounded-full transition-all duration-700 ease-out`}
                          style={{ width: `${dept.width}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
}

export default Dashboard;
