import React from "react";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { clearAdminData } from "@/features/adminSlice";
import LogoutIcon from "@mui/icons-material/Logout";

function LogOut({ styles }) {
  const dispatch = useDispatch();

  function handleLogout() {
    signOut(auth);
    dispatch(clearAdminData());
  }
  return (
    <>
      <button onClick={handleLogout} className={styles}>
        <span className="hidden sm:block">Logout</span>
        <span className="sm:hidden">
          <LogoutIcon
            sx={{
              fontSize: { xs: 20 },
            }}
          />
        </span>
      </button>
    </>
  );
}

export default LogOut;
