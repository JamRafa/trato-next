import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    salvaPerfil: (state, { payload }) => state.push(payload),
  },
});

export const { salvaPerfil } = authUserSlice.actions;

export default authUserSlice.reducer;
