import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  profile_picture: string | null;
  is_private_profile: boolean;
  gender: "Male" | "Female" | "Other";
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
    const response = await axiosInstance.get<User>(`/user/${user_id}`);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
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
