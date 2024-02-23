import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants/constants";

interface userDataType {
  info: object;
  users: object[];
}

const initialState: userDataType = {
  info: {},
  users: [{ name: {}, email: {} }],
};

export const usersDataFetchApi = createAsyncThunk(
  "UsersData/fetch",
  async () => {
    try {
      console.log("hello from thunk ");
      const usersData = await axios.get(`${BASE_URL}`);
      console.log("Response From Users data Thunk", usersData);
      return usersData.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(usersDataFetchApi.fulfilled, (state, action) => {
      state.users = action.payload.results ? action.payload.results : [];
      state.info = action.payload.info;
    });
  },
});

export const userReducer = userSlice.reducer;
