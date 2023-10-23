import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories, getOneByUserId, registerAuth, updateUserrAsync } from "../../service";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    //registerInfo
    userRegisterInfo: null,
    userRegisterInfoStatus: "idle",
    userRegisterInfoError: null,


    //getUserLogin
    userLogin:null,
    userLoginStatus:"idle",
    userLoginError:null,


  },
  reducers: {},
  extraReducers: {
    //register
    [registerAuth.pending]: (state, action) => {
      state.userRegisterInfoStatus = "loading";
    },
    [registerAuth.fulfilled]: (state, action) => {
      state.userRegisterInfo = action.payload;
      state.userRegisterInfoStatus = "succes";
    },
    [registerAuth.rejected]: (state, action) => {
      state.userRegisterInfoStatus = "failed";
      state.userRegisterInfoError = action.error.message;
    },




    //get Login user

    [getOneByUserId.pending]: (state, action) => {
      state.userLoginStatus = "loading";
    },
    [getOneByUserId.fulfilled]: (state, action) => {
      state.userLogin = action.payload;
      state.userLoginStatus = "succes";
    },
    [getOneByUserId.rejected]: (state, action) => {
      state.userLoginStatus = "failed";
      state.userLoginError = action.error.message;
    },

    //
    [updateUserrAsync.pending]: (state, action) => {
      state.userLoginStatus = "loading";
    },
    [updateUserrAsync.fulfilled]: (state, action) => {
      const{userName,email}=action.payload;
      state.userLogin.userName = userName;
      state.userLogin.email = email;

      state.userLoginStatus = "succes";
    },
    [updateUserrAsync.rejected]: (state, action) => {
      state.userLoginStatus = "failed";
      state.userLoginError = action.error.message;
    },


  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
