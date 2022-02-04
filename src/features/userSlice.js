import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

function createData(id, name, username, email, city) {
  return { id, name, username, email, city };
}

const initialState = {
  status: "idle",
  error: null,
  data: [
    createData(1, "Leanne Graham", "Bret", "Sincere@april.biz", "Gwenborough"),
    createData(2, "Ervin Howell", "Antonette", "Shanna@melissa.tv", "Wisokyburgh"),
  ],
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data");
  return response.data;
});

export const addUser = createAsyncThunk("users/addUser", async (user) => {
  const response = await axios.post("https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data", user);
  return response.data;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // addUser: (state, action) => {
    //   let id = 0;
    //   if (state.data.length) {
    //     id = state.data[state.data.length - 1].id;
    //   }
    //   state.data.push({ id: id + 1, ...action.payload });
    // },
    editUser: (state, action) => {
      const index = state.data.findIndex((user) => user.id == action.payload.id);
      if (index < 0) return;
      state.data[index] = action.payload;
    },
    deleteUser: (state, action) => {
      console.log(action);
      return state.data.filter((user) => user.id != action.payload.id);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("action in fulfilled", action);
        state.data = action.payload;
        console.log(state);
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
        console.log("action in add", action);
        let id = 0;
        if (state.data.length) {
          id = state.data[state.data.length - 1].id;
        }
        state.data.push({ id: id + 1, ...action.payload });
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { editUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUserById = (state, userId) => state.users.find((user) => user.id == userId);
