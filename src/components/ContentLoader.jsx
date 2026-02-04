import React from "react";

const ContentLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-50 py-10 bg-white rounded-3xl border border-slate-100 shadow-sm">
      <div
        className="w-12 h-12 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>{" "}
      </div>

      <p className="mt-5 text-lg font-semibold text-slate-600">
        Fetching data...
      </p>
      <p className="mt-1 text-sm text-slate-400">Please wait a moment.</p>
    </div>
  );
};

export default ContentLoader;
