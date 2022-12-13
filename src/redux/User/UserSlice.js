import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    statusNetwork: null,
    language: null
  },
  reducers: {
    connection: (state, action) => {
      state.statusNetwork = action.payload;
    },
    languageUser: (state, action) => {
      state.language = action.payload
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateInfo: (state, action) => {
      state.user = {...state.user, ...action.payload };
    }
  },
});

export const { login, logout, updateInfo, connection, languageUser} = userSlice.actions;

// selectors
export const getUser = (state) => state.user.user
export const statusConnection = (state) => state.user.statusNetwork
export const languageActual = (state) => state.user.language
 

export default userSlice.reducer;