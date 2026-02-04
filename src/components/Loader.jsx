import React from "react";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-linear-to-br from-blue-50 to-white">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
          <span className="text-white text-3xl font-black">N</span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">
            NEXUS
          </h1>
          <p className="text-[10px] font-bold text-blue-600 tracking-[2px] uppercase">
            Admin Panel
          </p>
        </div>
      </div>

      <div className="relative flex space-x-2 justify-center items-center">
        <span className="sr-only">Loading...</span>
        <div className="h-4 w-4 bg-blue-600 rounded-full animate-bounce-custom delay-0"></div>
        <div className="h-4 w-4 bg-blue-600 rounded-full animate-bounce-custom delay-150"></div>
        <div className="h-4 w-4 bg-blue-600 rounded-full animate-bounce-custom delay-300"></div>
      </div>

      <p className="text-sm text-slate-500 mt-4 font-medium">
        Loading your admin panel...
      </p>
    </div>
  );
}

export default Loader;
