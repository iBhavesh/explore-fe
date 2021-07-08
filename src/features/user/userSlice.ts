import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  profile_picture: string | null;
};

type UserState = {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | any;
};

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (user_id: number) => {
    // try{
    const response = await axiosInstance.get(`/user/${user_id}`);
    return response.data;
    // }catch(e){
    //     return e.
    // }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        if (action.payload !== null) state.user = action.payload;
        else state.user = null;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error;
      });
  },
});

// export const {} = userSlice.actions;
export default userSlice.reducer;