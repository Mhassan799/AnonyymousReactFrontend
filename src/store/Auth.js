import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: localStorage.getItem("isAuth") === "true",
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  otp: {
    phone: "",
    hash: "",
  },
  token: "",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, actions) => {
      const user = actions.payload;
      state.user = user.user;
      state.token= user.token;
      state.isAuth = true;
      localStorage.setItem("isAuth", state.isAuth.toString());
    },
    setOtp: (state, actions) => {
      const { phone, hash } = actions.payload;
      state.otp.phone = phone;
      state.otp.hash = hash;
    },
    setToken: (state, actions) => {
      const { token } = actions.payload;
      state.token = token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setOtp, setToken } = AuthSlice.actions;

export default AuthSlice.reducer;
