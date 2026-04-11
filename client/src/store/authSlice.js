import { createSlice } from "@reduxjs/toolkit";

const storedAuth = JSON.parse(localStorage.getItem("auth") || "{}");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: storedAuth.token || null,
    fullname: storedAuth.fullname || null,
    email: storedAuth.email || null,
    id: storedAuth.id || null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.id = action.payload.id;

      localStorage.setItem("auth", JSON.stringify({
        token: state.token,
        fullname: state.fullname,
        email: state.email,
        id: state.id
      }));
    },
    clearToken: (state) => {
      state.token = null;
      state.fullname = null;
      state.id = null;
      localStorage.removeItem("auth");
      console.log(state.token);
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
