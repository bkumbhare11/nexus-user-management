import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedUser, deleteUser } from "@/features/userSlice";
import axios from "axios";
import toast from "react-hot-toast";

function UserDetails() {
  let URL = "https://nexus-d0428-default-rtdb.firebaseio.com";
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.users);
  let userDetails = user.find((user) => user.id === id);

  function handleEdit(userDetails) {
    dispatch(setSelectedUser(userDetails));
    navigate(`/edituser/${userDetails.id}`);
  }

  function handleDelete(id) {
    axios
      .delete(`${URL}/users/${id}.json`)
      .then(() => {
        toast.success("User Deleted");
        dispatch(deleteUser(id));
        navigate("/allusers");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Deleting User");
      });
  }

  return (
    <>
      <div className="p-4  max-w-7xl mx-auto font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <button
            className="flex items-center gap-3 text-slate-500 hover:text-blue-600 font-bold transition-all group cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <div className="p-2.5 bg-white rounded-2xl shadow-sm group-hover:bg-blue-50 border border-slate-100">
              <ArrowBackIcon sx={{ fontSize: 18 }} />
            </div>
            <span className="text-[11px] uppercase tracking-[2px]">
              Back to Directory
            </span>
          </button>

          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              System Verified
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col gap-6 w-full lg:w-100 shrink-0">
            <div className="bg-slate-900 rounded-[3rem] p-10 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="flex justify-center">
                  <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl bg-slate-800">
                    <img
                      src={`https://ui-avatars.com/api/?name=${userDetails.fullName}`}
                      className="w-full h-full object-cover"
                      alt="User"
                    />
                  </div>
                </div>

                <h2 className="text-3xl font-black text-white mt-8 tracking-tighter">
                  {userDetails.fullName}
                </h2>
                <div className="mt-2 inline-block px-4 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 font-bold text-[10px] uppercase tracking-widest">
                  {userDetails.designation}
                </div>

                <div className="flex flex-col w-full gap-4 mt-10">
                  <button
                    onClick={() =>
                      (window.location.href = `mailto:${userDetails.email}`)
                    }
                    className="w-full bg-white text-slate-900 rounded-2xl h-14 font-black text-[11px] uppercase tracking-[2px] shadow-sm hover:bg-blue-600 hover:text-white active:scale-[0.98] transition-all duration-300"
                  >
                    Send Message
                  </button>

                  <div className="flex gap-3">
                    <button
                      className="flex-1 cursor-pointer px-2 bg-slate-800 text-slate-300 rounded-2xl h-14 font-black text-[10px] uppercase tracking-[1.5px] border border-white/5 hover:bg-slate-700 active:scale-[0.96] transition-all"
                      onClick={() => handleEdit(userDetails)}
                    >
                      Edit Profile
                    </button>

                    <button
                      onClick={() => handleDelete(userDetails.id)}
                      className="flex-1 cursor-pointer bg-red-500/10 text-red-400 px-2 rounded-2xl h-14 font-black text-[10px] uppercase tracking-[1.5px] border border-red-500/20 hover:bg-red-600 hover:text-white active:scale-[0.96] transition-all"
                    >
                      Delete User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white rounded-[3rem] p-8 sm:p-12 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-slate-800 mb-10 flex items-center gap-3">
                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                Employee Information
              </h3>

              <div className="flex flex-wrap gap-y-12 gap-x-8">
                <div className="flex flex-col min-w-50 flex-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">
                    User ID
                  </span>
                  <span className="text-slate-700 font-bold text-[15px]">
                    {userDetails.id}
                  </span>
                </div>

                <div className="flex flex-col min-w-50 flex-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">
                    Email Address
                  </span>
                  <span className="text-slate-700 font-bold text-[15px]">
                    {userDetails.email}
                  </span>
                </div>

                <div className="flex flex-col min-w-50 flex-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">
                    Phone
                  </span>
                  <span className="text-slate-700 font-bold text-[15px]">
                    {userDetails.phone}
                  </span>
                </div>

                <div className="flex flex-col min-w-50 flex-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">
                    Department
                  </span>
                  <span className="text-slate-700 font-bold text-[15px]">
                    {userDetails.department}
                  </span>
                </div>

                <div className="flex flex-col min-w-50 flex-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">
                    Designation
                  </span>
                  <span className="text-slate-700 font-bold text-[15px]">
                    {userDetails.designation}
                  </span>
                </div>

                <div className="flex flex-col min-w-50 flex-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">
                    Experience
                  </span>
                  <span className="text-slate-700 font-bold text-[15px]">
                    {userDetails.experience}
                  </span>
                </div>

                <div className="flex flex-col min-w-50 flex-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">
                    Gender
                  </span>
                  <span className="text-slate-700 font-bold text-[15px]">
                    {userDetails.gender}
                  </span>
                </div>

                <div className="flex flex-col min-w-50 flex-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">
                    Date Of Birth
                  </span>
                  <span className="text-slate-700 font-bold text-[15px]">
                    {userDetails.dob}
                  </span>
                </div>

                <div className="flex flex-col min-w-50 flex-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">
                    Registeration Date
                  </span>
                  <span className="text-slate-700 font-bold text-[15px]">
                    {new Date(userDetails.createdAt).toLocaleDateString(
                      "en-GB",
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div
                className={`flex-1 rounded-[2.5rem] p-8 border flex items-center gap-6 ${
                  userDetails.status === "Active"
                    ? "bg-green-50/50 border-green-100"
                    : "bg-slate-50 border-slate-100"
                }`}
              >
                <div
                  className={`w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center ${
                    userDetails.status === "Active"
                      ? "text-green-600"
                      : "text-slate-400"
                  }`}
                >
                  <VerifiedUserIcon />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Account Status
                  </p>
                  <p
                    className={`text-sm font-bold mt-1 ${
                      userDetails.status === "Active"
                        ? "text-green-700"
                        : "text-slate-500"
                    }`}
                  >
                    {userDetails.status === "Active"
                      ? "Fully Active & Verified"
                      : "Account Inactive"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
