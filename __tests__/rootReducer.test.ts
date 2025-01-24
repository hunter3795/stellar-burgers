import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../src/services/slices/ingredients';
import feedsReducer from '../src/services/slices/feeds';
import userReducer from '../src/services/slices/user';
import ordersReducer from '../src/services/slices/orders';
import { describe, expect, test } from '@jest/globals';
import store from '../src/services/store';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  user: userReducer,
  orders: ordersReducer
});

describe('тест rootReducer', () => {
  test('правильная инициализация rootReducer', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(initialState);
  });
});
