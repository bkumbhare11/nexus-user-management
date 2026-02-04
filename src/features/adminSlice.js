import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminData: null,
  },
  reducers: {
    setAdminData: (state, action) => {
      state.adminData = action.payload;
    },
    clearAdminData: (state) => {
      state.adminData = null;
    },
  },
});

export const { setAdminData, clearAdminData } = adminSlice.actions;
export default adminSlice.reducer;
