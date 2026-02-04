import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { setAdminData } from "./features/adminSlice";
import { clearAdminData } from "./features/adminSlice";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { getUser, setUserLoading } from "./features/userSlice";
import config from "./utils/constants";

function App() {
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.admin.adminData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const docRef = doc(db, "admins", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            dispatch(setAdminData(docSnap.data()));
          }
        } else {
          dispatch(clearAdminData());
        }
      } catch (error) {
        console.error("Auth Error:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (adminData) {
      axios
        .get(`${config.url}/users.json`)
        .then((res) => {
          if (res.data) {
            let usersArray = [];
            for (let key in res.data) {
              usersArray.push({
                id: key,
                ...res.data[key],
              });
            }

            dispatch(getUser(usersArray));
          }
        })
        .catch((err) => console.log("Fetch error:", err))
        .finally(() => {
          dispatch(setUserLoading(false));
        });
    }
  }, [adminData, dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "10px",
          },
        }}
      />

      {adminData ? (
        <div className="flex h-screen overflow-hidden">
          <div className="w-64 hidden sm:flex flex-col bg-white border-r border-slate-100 shrink-0 shadow-sm">
            <div className="h-20 border-b border-slate-50 px-6 flex items-center gap-3 shrink-0">
              <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl font-black">N</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-black text-slate-900 tracking-tighter leading-none">
                  NEXUS
                </h1>
                <p className="text-[10px] font-bold text-blue-600 tracking-[2px] uppercase">
                  Admin
                </p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto mt-4 custom-scrollbar">
              <Sidebar />
            </div>
          </div>

          <div className="flex-1 flex flex-col min-w-0">
            <div className="shrink-0">
              <Navbar />
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-auto bg-gray-50">
              <div className="w-full">
                <Content />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
}

export default App;
