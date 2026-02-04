import React, { useState } from "react";
import { auth, db } from "../firebase"; // Tera firebase setup
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setAdminData } from "../features/adminSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      const docRef = doc(db, "admins", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        dispatch(setAdminData(docSnap.data()));

        navigate("/");
      } else {
        alert("Admin profile not found in Firestore!");
      }
    } catch (error) {
      alert("Invalid Email or Password!");
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 font-sans">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full mx-1.5 max-w-md border border-slate-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            NEXUS
          </h1>
          <p className="text-slate-400 mt-2">Admin Control Panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="admin@nexus.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-900/20 cursor-pointer"
          >
            Sign In to Dashboard
          </button>
        </form>

        <p className="text-center text-slate-500 text-xs mt-8">
          &copy; 2026 Nexus Systems. Authorized Access Only.
        </p>
      </div>
    </div>
  );
};

export default Login;
