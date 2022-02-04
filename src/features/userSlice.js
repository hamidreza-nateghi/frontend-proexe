import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

function normalizeUser(user) {
  const {
    id,
    name,
    email,
    username,
    address: { city },
  } = user;

  return { id, name, email, username, city };
}

const initialState = {
  status: "idle",
  error: null,
  data: [],
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("/");
  const data = response.data.map((user) => normalizeUser(user));
  return data;
});

export const addUser = createAsyncThunk("users/addUser", async (user) => {
  const response = await axios.post("/", user);
  return response.data;
});

export const editUser = createAsyncThunk("users/editUser", async (user) => {
  const { id: userId, ...body } = user;
  if (userId > 10) return user;
  const response = await axios.patch(`/${userId}`, body);
  return normalizeUser(response.data);
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  if (id > 10) return id;
  await axios.delete(`/${id}`);
  return id;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        let id = 0;
        if (state.data.length) {
          id = state.data[state.data.length - 1].id;
        }
        state.data.push({ id: id + 1, ...action.payload });
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.data.findIndex((user) => user.id == action.payload.id);
        state.data[index] = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter((user) => user.id != action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;

export const selectUserById = (state, userId) => state.users.data.find((user) => user.id == userId);
