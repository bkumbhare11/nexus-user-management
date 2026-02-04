import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    selectedUser: null,
    isLoading: true,
  },
  reducers: {
    // Add Logic
    addUser: (state, action) => {
      state.users.push(action.payload);
    },

    // Get Logic
    getUser: (state, action) => {
      state.users = action.payload;
    },

    // Edit Logic
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },

    updateUser: (state, action) => {
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user,
      );
    },

    // Delete logic
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },

    // Toggle Status
    toggleStatus: (state, action) => {
      const user = state.users.find((u) => u.id === action.payload);
      if (user) {
        user.status = user.status === "Active" ? "Inactive" : "Active";
      }
    },

    setUserLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  addUser,
  getUser,
  deleteUser,
  updateUser,
  setSelectedUser,
  clearSelectedUser,
  toggleStatus,
  setUserLoading,
} = userSlice.actions;
export default userSlice.reducer;
