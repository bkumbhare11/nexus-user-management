import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f8fafc] text-center">
      <div className="w-24 h-24 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-red-100">
        <ErrorOutlineIcon sx={{ fontSize: 48 }} />
      </div>

      <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-4">
        404
      </h1>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        Oops! Page not found
      </h2>
      <p className="text-slate-500 max-w-sm mb-10 font-medium">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 px-8 py-4 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}

export default Error;
