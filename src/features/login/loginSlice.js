import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      return action.payload;
    },
  },
});

export const selectLoginData = (state) => state.login;
export const selectLoginName = (state) =>
  state.login ? state.login.given_name : null;
export const selectLoginPicture = (state) =>
  state.login ? state.login.picture : null;
export const isLoggedIn = (state) => (state.login ? true : false);
export const selectUserId = (state) => state.login?.user_id?.$oid;

export const { setLoginData } = loginSlice.actions;
export default loginSlice.reducer;
