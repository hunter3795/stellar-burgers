import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { error } from 'console';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const checkUserAuth = createAsyncThunk('user/checkUserAuth', getUserApi);

export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'user/registerUser',
  async (dataUser) => {
    const data = await registerUserApi(dataUser);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'user/loginUser',
  async (dataUser) => {
    const data = await loginUserApi(dataUser);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const updateUser = createAsyncThunk<TUserResponse, TRegisterData>(
  'user/updateUser',
  async (dataUser) => {
    const data = await updateUserApi(dataUser);
    return data;
  }
);

interface IUserState {
  isAuthChecked: boolean;
  data: TUser | null;
  isLoading: boolean;
  error: string | null | undefined;
}

export const initialState: IUserState = {
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
    },
    logout: (state) => {
      state.data = null;
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
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;
      });
  }
});

export const { authCheck, logout } = userSlice.actions;
export const { getUser, getIsAuthChecked } = userSlice.selectors;
export default userSlice.reducer;

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
        dispatch(logout());
      })
      .catch((err) => {
        console.log('Ошибка выполнения выхода', err);
      });
  }
);
