import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  setSelectedUser,
  toggleStatus,
} from "@/features/userSlice";
import toast from "react-hot-toast";
import NoDataFound from "@/components/NoDataFound";
import ContentLoader from "@/components/ContentLoader";
import config from "@/utils/constants";

function AllUsers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users);
  const isLoading = useSelector((state) => state.user.isLoading);

  function handleDelete(id) {
    axios
      .delete(`${config.url}/users/${id}.json`)
      .then(() => {
        toast.success("User Deleted");
        dispatch(deleteUser(id));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Deleting User");
      });
  }

  function handleEdit(user) {
    dispatch(setSelectedUser(user));
    navigate(`/edituser/${user.id}`);
  }

  function handleStatus(user) {
    const userStatus = user.status === "Active" ? "Inactive" : "Active";
    axios
      .patch(`${config.url}/users/${user.id}.json`, { status: userStatus })
      .then(() => {
        dispatch(toggleStatus(user.id));
        toast.success(`User is now ${userStatus}`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Update fail ho gaya");
      });
  }

  const [searchVal, setSearchVal] = useState("");
  const [deptVal, setDeptVal] = useState("");
  const [experienceVal, setExperienceVal] = useState("");
  const [statusVal, setStatusVal] = useState("");

  function handleChange(e) {
    setSearchVal(e.target.value);
  }

  function handleDeptChange(e) {
    setDeptVal(e.target.value);
  }

  function handleExpChange(e) {
    setExperienceVal(e.target.value);
  }
  function handleStatusChange(e) {
    setStatusVal(e.target.value);
  }

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.fullName.toLowerCase().includes(searchVal.toLowerCase()) ||
      user.email.toLowerCase().includes(searchVal.toLowerCase());

    const matchDepartment = deptVal === "" || user.department === deptVal;

    const matchExperience =
      experienceVal === "" || user.experience === experienceVal;

    const matchStatus = statusVal === "" || user.status === statusVal;

    return matchSearch && matchDepartment && matchExperience && matchStatus;
  });

  return (
    <>
      {isLoading ? (
        <ContentLoader />
      ) : users.length > 0 ? (
        <div className="space-y-6 p-4 sm:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
              User Directory
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Manage, filter and view all registered employee profiles.
            </p>
          </div>

          <div className="flex flex-col xl:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm mx-2 sm:mx-0">
            <div className="relative w-full xl:w-96">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <SearchIcon sx={{ fontSize: 20 }} />
              </div>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Search name or email..."
                className="block w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl text-sm font-bold text-slate-700 outline-none transition-all"
              />
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full xl:w-auto">
              <select
                value={deptVal}
                onChange={handleDeptChange}
                className="flex-1 bg-slate-50 border-2 border-transparent text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-3 outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="">Department</option>
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

              <select
                value={experienceVal}
                onChange={handleExpChange}
                className="flex-1 bg-slate-50 border-2 border-transparent text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-3 outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="">Experience</option>
                <option value="Intern/Trainee">Intern/Trainee</option>
                <option value="Junior Level">Junior Level</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior Level">Senior Level</option>
              </select>

              <select
                value={statusVal}
                onChange={handleStatusChange}
                className="flex-1 bg-slate-50 border-2 border-transparent text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-3 outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm mx-2 sm:mx-0">
            <div className="sm:hidden space-y-4">
              {filteredUsers.map((user) => (
                <Card
                  key={user.id}
                  className="border border-slate-100 shadow-none rounded-2xl overflow-hidden mx-1" // Chota margin yahan diya hai
                >
                  <CardHeader className="flex flex-row items-center gap-3 bg-slate-50/50 p-3 border-b border-slate-100">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.fullName}`}
                      alt=""
                      className="w-10 h-10 rounded-xl object-cover border border-white shadow-sm shrink-0" // shrink-0 lagaya taaki image pichke na
                    />
                    <div className="min-w-0 flex-1">
                      {" "}
                      {/* min-w-0 zaroori hai truncate ke liye */}
                      <CardTitle className="text-sm font-bold text-slate-800 leading-tight truncate">
                        {user.fullName}
                      </CardTitle>
                      <CardDescription className="text-[11px] font-medium text-slate-500 truncate">
                        {user.email}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="p-3 grid grid-cols-2 gap-x-2 gap-y-3">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                        Role & Exp
                      </span>
                      <div className="flex flex-col mt-1">
                        <span className="text-xs font-bold text-slate-700 truncate">
                          {user.designation}
                        </span>
                        <span className="w-fit text-[8px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded font-black uppercase mt-0.5">
                          {user.experience || "Mid"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col text-right">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                        Status
                      </span>
                      <div className="mt-1">
                        <span
                          onClick={() => handleStatus(user)}
                          className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-bold uppercase cursor-pointer ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {user.status}
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className=" px-2 bg-slate-50/50 flex gap-2 justify-center border-t border-slate-100">
                    <Link to={`/userdetails/${user.id}`} className="flex-1">
                      <button
                        variant="secondary"
                        className="w-full h-8 text-[9px] font-black uppercase tracking-tighter rounded-lg bg-slate-200/50 text-slate-700 border border-slate-200"
                      >
                        View
                      </button>
                    </Link>

                    <button
                      onClick={() => handleEdit(user)}
                      className="flex-1 h-8 text-[9px] font-black uppercase tracking-tighter rounded-lg bg-blue-50 text-blue-600 border border-blue-100"
                    >
                      Edit
                    </button>

                    <button
                      variant="destructive"
                      onClick={() => handleDelete(user.id)}
                      className="flex-1 h-8 text-[9px] font-black uppercase tracking-tighter rounded-lg bg-red-50 text-red-600 border border-red-100"
                    >
                      Delete
                    </button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="hidden sm:block overflow-x-auto custom-scrollbar">
              <Table className="min-w-225">
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-slate-100">
                    <TableHead className="py-5 text-[13px] font-bold text-slate-500 uppercase tracking-wide">
                      Employee
                    </TableHead>
                    <TableHead className="text-[13px] font-bold text-slate-500 uppercase tracking-wide">
                      Role & Experience
                    </TableHead>
                    <TableHead className="text-[13px] font-bold text-slate-500 uppercase tracking-wide text-center">
                      Status
                    </TableHead>
                    <TableHead className="text-right text-[13px] font-bold text-slate-500 uppercase tracking-wide pr-8">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className="group hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://ui-avatars.com/api/?name=${user.fullName}`}
                            className="w-11 h-11 rounded-xl border border-slate-100 shadow-sm"
                            alt=""
                          />
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800 text-[15px]">
                              {user.fullName}
                            </span>
                            <span className="text-[12px] text-slate-400 font-medium">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="text-[14px] font-bold text-slate-700 leading-none">
                            {user.designation}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-tight">
                              {user.department}
                            </span>
                            <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded font-black uppercase tracking-tighter">
                              {user.experience}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          onClick={() => handleStatus(user)}
                          className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase cursor-pointer tracking-wider ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}
                        >
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-9 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                            >
                              <MoreHorizIcon sx={{ fontSize: 24 }} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-48 p-2 rounded-2xl shadow-2xl border-slate-100"
                          >
                            <Link to={`/userdetails/${user.id}`}>
                              <DropdownMenuItem className="font-bold text-xs p-3 cursor-pointer rounded-xl">
                                View Details
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                              className="font-bold text-xs p-3 cursor-pointer rounded-xl"
                              onClick={() => handleEdit(user)}
                            >
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1 bg-slate-50" />
                            <DropdownMenuItem
                              className="font-bold text-xs p-3 cursor-pointer rounded-xl text-red-600 focus:bg-red-50"
                              onClick={() => handleDelete(user.id)}
                            >
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
}

export default AllUsers;
