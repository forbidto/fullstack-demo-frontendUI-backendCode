import { createSlice } from "@reduxjs/toolkit";


const userAuthState = {
  userName: "Test",
  userId: "",
  isAuthenticated: false,
  exp: "",
  role: "",
  isLoading: false,
  error: ""
}


export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: userAuthState,
  reducers: {
    loginRegisterSuccess: (state, action) => {
      state.userName = action.payload.userName;
      state.userId = action.payload.id;
      state.isAuthenticated = true;
      state.exp=action.payload.exp;
      state.role=action.payload.role;
      state.isLoading=false;
    },
    loginRegisterFail: (state, action) => {
      state.userName = "";
      state.userId = "";
      state.exp = "";
      state.iat = "";
      state.role = "";
      state.error = "error";
      state.isAuthenticated=false;
      state.isLoading=false;
    },
    logout: (state, action) => {
      state.userName = "";
      state.userId = "";
      state.exp = "";
      state.iat = "";
      state.role = "";
      state.isAuthenticated = false;
      state.isLoading=false;
    },
    verifySuccess: (state, action) => {
      state.isAuthenticated = true;
    },
    verifySuccessWithUpdatedToken: (state, action) => {
      state.userName = action.userName;
      state.userId = action.id;
      state.exp = action.exp;
      state.iat = action.iat;
      state.role = action.role;
      state.isAuthenticated = true;
    },
    verifyAuthFail: (state, action) => {
      state.userName = "";
      state.userId = "";
      state.exp = "";
      state.iat = "";
      state.role = "";
      state.isAuthenticated = false;
      state.isLoading = false
    },
    authLoading: (state, action) => {
      state.isLoading = true;
    },
    authComplete: (state, action) => {
      state.isLoading = false;
    }
  }
});

export const { loginRegisterSuccess, loginRegisterFail, logout, verifySuccess, verifySuccessWithUpdatedToken, verifyAuthFail, authLoading, authComplete } = userAuthSlice.actions;
export default userAuthSlice.reducer;




