import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, LOADING_STATES } from "../constants/constants";
import { toast } from "sonner";

//User Data Type
interface userDataType {
  info: object;
  users: object[];
  isLoading: string;
}

//Initial State of the userData
const initialState: userDataType = {
  info: {},
  users: [
    {
      name: {},
      email: "",
      picture: "",
    },
  ],
  isLoading: LOADING_STATES.PENDING,
};

//Async Data Fetching using Thunk
export const usersDataFetchApi = createAsyncThunk(
  "UsersData/fetch",
  async () => {
    try {
      const usersData = await axios.get(`${BASE_URL}`);
      return usersData.data;
    } catch (error) {
      console.log(error);
      toast.error("Error Fetching data");
      throw error;
    }
  }
);

//user data Slice
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

//Reducer
export const userReducer = userSlice.reducer;
