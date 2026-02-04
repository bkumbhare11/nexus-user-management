import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, clearSelectedUser, addUser } from "@/features/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import config from "@/utils/constants";

function AddUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const users = useSelector((state) => state.user.users);
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(false);

  const { register, reset, handleSubmit } = useForm();

  function OnSubmit(data) {
    if (!selectedUser && users.length >= config.capacity) {
      toast.error(`Limit Reached!! Max ${config.capacity} users allowed`);
      return;
    }

    setLoading(true);

    if (selectedUser) {
      axios
        .patch(`${config.url}/users/${selectedUser.id}.json`, data)
        .then(() => {
          dispatch(updateUser({ id: selectedUser.id, ...data }));
          console.log("User Updated & Saved");
          setLoading(false);
          navigate("/allusers");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error Updatind");
        });
    } else {
      axios
        .post(`${config.url}/users.json`, {
          ...data,
          createdAt: Date.now(),
          status: "Active",
        })
        .then((res) => {
          dispatch(
            addUser({
              ...data,
              id: res.data.name,
              createdAt: Date.now(),
              status: "Active",
            }),
          );
          toast.success("Data Saved");
          reset();
          navigate("/allusers");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error Saving Data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    if (isEditMode && selectedUser) {
      console.log("Form populate ho raha hai...", selectedUser);
      reset(selectedUser);
    }
  }, [selectedUser, reset, isEditMode]);

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="bg-slate-900 p-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {selectedUser ? "Update Profile" : "Create New User"}
          </h1>
          <p className="text-slate-400 text-sm font-medium mt-1">
            Management Portal • User Onboarding
          </p>
        </div>

        <form onSubmit={handleSubmit(OnSubmit)} className="p-6 sm:p-10">
          <div className="flex flex-wrap gap-6">
            <div className="grow w-full md:min-w-[40%] flex flex-col gap-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest ml-1 text-slate-400">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                {...register("fullName", { required: true })}
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-3 px-4 outline-none transition-all font-bold text-slate-700 focus:bg-white focus:border-blue-500 shadow-sm"
              />
            </div>

            <div className="grow w-full md:min-w-[40%] flex flex-col gap-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest ml-1 text-slate-400">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                {...register("email", { required: true })}
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-3 px-4 outline-none transition-all font-bold text-slate-700 focus:bg-white focus:border-blue-500 shadow-sm"
              />
            </div>

            <div className="grow w-full md:min-w-[40%] flex flex-col gap-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest ml-1 text-slate-400">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="10-digit mobile"
                {...register("phone", {
                  required: true,
                  maxLength: 10,
                  minLength: 10,
                })}
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-3 px-4 outline-none transition-all font-bold text-slate-700 focus:bg-white focus:border-blue-500 shadow-sm"
              />
            </div>

            <div className="grow w-full md:min-w-[40%] flex flex-col gap-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Gender
              </label>
              <div className="flex gap-3 h-full items-center">
                <label className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all font-bold text-slate-600">
                  <input
                    type="radio"
                    value="Male"
                    {...register("gender", { required: true })}
                    className="accent-blue-600 w-4 h-4"
                  />
                  <span className="text-sm">Male</span>
                </label>
                <label className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all font-bold text-slate-600">
                  <input
                    type="radio"
                    value="Female"
                    {...register("gender", { required: true })}
                    className="accent-blue-600 w-4 h-4"
                  />
                  <span className="text-sm">Female</span>
                </label>
              </div>
            </div>

            <div className="grow w-full md:min-w-[40%] flex flex-col gap-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest ml-1 text-slate-400">
                Date of Birth
              </label>
              <input
                type="date"
                {...register("dob", { required: true })}
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-3 px-4 outline-none transition-all font-bold text-slate-700 focus:bg-white focus:border-blue-500 shadow-sm"
              />
            </div>

            <div className="grow w-full md:min-w-[40%] flex flex-col gap-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Department
              </label>
              <select
                {...register("department", { required: true })}
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-3 px-4 outline-none transition-all font-bold text-slate-700 focus:bg-white focus:border-blue-500 shadow-sm"
              >
                <option value="">Select Department</option>
                <option value="Frontend Development">
                  Frontend Development
                </option>
                <option value="Backend Development">Backend Development</option>
                <option value="Full Stack Development">
                  Full Stack Development
                </option>
                <option value="UI/UX">UI/UX</option>
                <option value="Quality Assurance (QA)">
                  Quality Assurance (QA)
                </option>
                <option value="Human Resources (HR)">
                  Human Resources (HR)
                </option>
              </select>
            </div>

            <div className="grow w-full md:min-w-[40%] flex flex-col gap-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Designation
              </label>
              <select
                {...register("designation", { required: true })}
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-3 px-4 outline-none transition-all font-bold text-slate-700 focus:bg-white focus:border-blue-500 shadow-sm"
              >
                <option value="">Select Designation</option>
                <option value="Junior Software Engineer">
                  Junior Software Engineer
                </option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Senior Software Engineer">
                  Senior Software Engineer
                </option>
                <option value="Product Designer">Product Designer</option>
                <option value="Technical Lead">Technical Lead</option>
                <option value="QA Engineer">QA Engineer</option>
                <option value="HR Executive">HR Executive</option>
              </select>
            </div>

            <div className="grow w-full md:min-w-[40%] flex flex-col gap-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Experience Level
              </label>
              <select
                {...register("experience", { required: true })}
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-3 px-4 outline-none transition-all font-bold text-slate-700 focus:bg-white focus:border-blue-500 shadow-sm"
              >
                <option value="">Select Experience</option>
                <option value="Intern / Trainee">Intern / Trainee</option>
                <option value="Junior Level">Junior Level</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior Level">Senior Level</option>
              </select>
            </div>
          </div>

          <div className="mt-12">
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[3px] shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
            >
              {isEditMode ? "Save Changes" : "Register User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
