import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("fetchUsers", async (api) => {
  const response = await api.get("users/all-users");

  return response.data.users;
});
export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ api, formData }) => {
    const response = await api.post(`users/update-user`, formData);

    return response.data.user;
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async ({ api, userId }, { rejectWithValue }) => {
    try {
      const response = await api.post(`users/delete-user`, {
        userId,
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const UserSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    users: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUsers = state.users.map((user) => {
          return user._id === action.payload._id ? action.payload : user;
        });
        state.users = updatedUsers;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default UserSlice.reducer;
