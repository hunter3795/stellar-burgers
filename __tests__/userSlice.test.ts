import userReducer, {
  checkUserAuth,
  loginUser,
  registerUser,
  updateUser
} from '../src/services/slices/user';
import { describe, expect, test } from '@jest/globals';
import { TUser } from '../src/utils/types';

describe('проверка слайса userSlice', () => {
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
  describe('тест санки checkUserAuth', () => {
    test('проверка экщена Request', () => {
      const newState = userReducer(initialState, {
        type: checkUserAuth.pending.type
      });
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('проверка экшена Failed', () => {
      const testError = 'failed checkUserAuth';
      const newState = userReducer(initialState, {
        type: checkUserAuth.rejected.type,
        error: { message: testError }
      });
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toEqual(testError);
    });
    test('проверка экшена Success', () => {
      const testUser = {
        user: {
          email: 'vasya@yandex.ru',
          name: 'Vasiliy'
        }
      };
      const newState = userReducer(initialState, {
        type: checkUserAuth.fulfilled.type,
        payload: testUser
      });
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.data).toEqual(testUser.user);
    });
  });
  describe('тест санки registerUser', () => {
    test('проверка экщена Request', () => {
      const newState = userReducer(initialState, {
        type: registerUser.pending.type
      });
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('проверка экшена Failed', () => {
      const testError = 'failed registerUser';
      const newState = userReducer(initialState, {
        type: registerUser.rejected.type,
        error: { message: testError }
      });
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toEqual(testError);
    });
    test('проверка экшена Success', () => {
      const testUser = {
        user: {
          email: 'vasya@yandex.ru',
          name: 'Vasiliy'
        }
      };
      const newState = userReducer(initialState, {
        type: registerUser.fulfilled.type,
        payload: testUser
      });
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.data).toEqual(testUser.user);
    });
  });
  describe('тест санки loginUser', () => {
    test('проверка экщена Request', () => {
      const newState = userReducer(initialState, {
        type: loginUser.pending.type
      });
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('проверка экшена Failed', () => {
      const testError = 'failed loginUser';
      const newState = userReducer(initialState, {
        type: loginUser.rejected.type,
        error: { message: testError }
      });
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toEqual(testError);
    });
    test('проверка экшена Success', () => {
      const testUser = {
        user: {
          email: 'vasya@yandex.ru',
          name: 'Vasiliy'
        }
      };
      const newState = userReducer(initialState, {
        type: loginUser.fulfilled.type,
        payload: testUser
      });
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.data).toEqual(testUser.user);
    });
  });
  describe('тест санки updateUser', () => {
    test('проверка экщена Request', () => {
      const newState = userReducer(initialState, {
        type: updateUser.pending.type
      });
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('проверка экшена Failed', () => {
      const testError = 'failed updateUser';
      const newState = userReducer(initialState, {
        type: updateUser.rejected.type,
        error: { message: testError }
      });
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toEqual(testError);
    });
    test('проверка экшена Success', () => {
      const testUser = {
        user: {
          email: 'vasya@yandex.ru',
          name: 'Vasiliy'
        }
      };
      const newState = userReducer(initialState, {
        type: updateUser.fulfilled.type,
        payload: testUser
      });
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.data).toEqual(testUser.user);
    });
  });
});
