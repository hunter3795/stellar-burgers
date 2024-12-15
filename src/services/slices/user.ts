import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { error } from 'console';
import { setCookie } from '../../utils/cookie';

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async () => await getUserApi()
);

const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'user/registerUser',
  async (dataUser) => {
    const data = await registerUserApi(dataUser);
    setCookie('accessToken', data.accessToken);
    setCookie('refreshToken', data.refreshToken);
    return data;
  }
);

const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'user/loginUser',
  async (dataUser) => {
    const data = await loginUserApi(dataUser);
    setCookie('accessToken', data.accessToken);
    setCookie('refreshToken', data.refreshToken);
    return data;
  }
);

interface IUserState {
  isAuthChecked: boolean;
  data: TUser | null;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: IUserState = {
  isAuthChecked: false,
  data: null,
  isLoading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    getUser: (state) => state.data,
    getIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;
      });
  }
});

export const userAction = userSlice.actions;
export const userSelectors = userSlice.selectors;
export default userSlice.reducer;
