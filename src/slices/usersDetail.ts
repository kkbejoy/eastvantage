import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, LOADING_STATES } from "../constants/constants";

interface userDataType {
  info: object;
  users: object[];
  isLoading: string;
}

const initialState: userDataType = {
  info: {},
  users: [
    {
      name: {},
      email: "",
      picture:
        "https://res.cloudinary.com/dlcsyyk7z/image/upload/v1698830239/mentors/mentor/images_2_d4e6fp_siwirt_a7fcrt.jpg",
    },
  ],
  isLoading: LOADING_STATES.PENDING,
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
      state.isLoading = LOADING_STATES.SUCCESS;
    }),
      builder.addCase(usersDataFetchApi.pending, (state) => {
        state.users = state.users ? state.users : [];
        state.info = state.info ? state.info : {};
        state.isLoading = LOADING_STATES.PENDING;
      });
    builder.addCase(usersDataFetchApi.rejected, (state) => {
      state.users = [];
      state.info = {};
      state.isLoading = LOADING_STATES.FAILED;
    });
  },
});

export const userReducer = userSlice.reducer;
