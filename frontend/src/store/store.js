import { configureStore } from '@reduxjs/toolkit';

// Simple auth slice for MVP
const authSlice = {
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  }
};

export const store = configureStore({
  reducer: {
    auth: (state = authSlice.initialState, action) => {
      switch (action.type) {
        case 'auth/loginSuccess':
          return authSlice.reducers.loginSuccess(state, action);
        case 'auth/logout':
          return authSlice.reducers.logout(state);
        default:
          return state;
      }
    }
  }
});