import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NoDataFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 mt-10">
      <div className="bg-white p-4 rounded-full shadow-sm mb-4">
        <PlusCircle className="w-10 h-10 text-slate-300" />
      </div>
      <h3 className="text-xl font-bold text-slate-800">No Users Found</h3>
      <p className="text-slate-500 text-sm mt-1 text-center max-w-62.5">
        It looks like your user list is currently empty. Start by adding a new
        user to manage your team
      </p>

      <Link to="/addusers" className="mt-6">
        <button className="bg-blue-600 cursor-pointer text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
          Add First User
        </button>
      </Link>
    </div>
  );
};

export default NoDataFound;
