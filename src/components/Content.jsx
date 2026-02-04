import React from "react";
import AllUsers from "@/pages/AllUsers";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import AddUser from "@/pages/AddUser";
import Settings from "@/pages/Settings";
import { Routes, Route } from "react-router-dom";
import UserDetails from "@/pages/UserDetails";
import Error from "@/pages/Error";

function Content() {
  return (
    <>
      <div className=" bg-[#F9FAFB] m-2">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/allusers" element={<AllUsers />} />
          <Route path="/addusers" element={<AddUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/userdetails/:id" element={<UserDetails />} />
          <Route path="/edituser/:id" element={<AddUser />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </>
  );
}

export default Content;
