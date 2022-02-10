import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

export const initialState = {
  loading: false,
  hasErrors: false,
  isSuccess: false,
  userData: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,

  reducers: {
    login: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      console.log("doslo u loginSuccess");
      state.userData = payload;
      state.loading = false;
      state.hasErrors = false;
      state.isSuccess = true;

      localStorage.setItem("user", JSON.stringify(state.userData));
    },
    loginFailure: (state, { payload }) => {
      console.log("doslo u failure");
      state.userData = payload;
      state.loading = false;
      state.hasErrors = true;
      state.isSuccess = false;
      localStorage.removeItem("user");
      localStorage.setItem("mess", JSON.stringify(state.userData));
    },

    logOut: (state) => {
      const token = state.userData.token;

      state.isSuccess = false;
      state.userData = {};
      localStorage.clear("user");
      fetch("https://black-pearl-2751-backend.zendev.se/api/logout", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        header: {
          Authorization: { Authorization: "Bearer " + token },
          //JSON.stringify(state.userData.token)
        },
      })
        .then((response) => {
          console.log("response lopgout", response);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
});

export const { login, loginSuccess, loginFailure, logOut } = loginSlice.actions;

export const loginSelector = (state) => state.userData;

export default loginSlice.reducer;

export const FetchLogin = (email, password) => {
  return async (dispatch) => {
    dispatch(login());

    try {
      const response = await fetch(
        "https://black-pearl-2751-backend.zendev.se/api/login",
        {
          method: "POST",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      let data = await response.json();

      if (data.token) {
        dispatch(loginSuccess(data));
      } else {
        dispatch(loginFailure(data));
      }
    } catch (error) {
      console.log(error);
      dispatch(loginFailure());
    }
  };
};
