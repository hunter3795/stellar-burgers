import feedsReducer, { fetchFeeds } from '../src/services/slices/feeds';
import { describe, expect, test } from '@jest/globals';
import { TOrdersData } from '../src/utils/types';

describe('проверка редьюсеров слайса feeds', () => {
  interface IFeedsState {
    feedsData: TOrdersData;
    isLoading: boolean;
    error: string | null | undefined;
  }
  const initialState: IFeedsState = {
    feedsData: {
      orders: [],
      total: 0,
      totalToday: 0
    },
    isLoading: false,
    error: null
  };
  test('проверка экшена Request', () => {
    const newState = feedsReducer(initialState, {
      type: fetchFeeds.pending.type
    });
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBe(null);
  });
  test('проверка экшена Failed', () => {
    const testError = 'error fetchFeeds';
    const newState = feedsReducer(initialState, {
      type: fetchFeeds.rejected.type,
      error: { message: testError }
    });
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual(testError);
  });
  test('проверка экшена Success', () => {
    const testFeeds = [
      {
        _id: '67856076133acd001be4a143',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный био-марсианский бургер',
        createdAt: '2025-01-13T18:50:30.008Z',
        updatedAt: '2025-01-13T18:50:30.907Z',
        number: 65405
      },
      {
        _id: '67855bba133acd001be4a13a',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa0949',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa0949',
          '643d69a5c3f7b9001cfa0949',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa0949',
          '643d69a5c3f7b9001cfa0949'
        ],
        status: 'done',
        name: 'Краторный экзо-плантаго астероидный бургер',
        createdAt: '2025-01-13T18:30:18.032Z',
        updatedAt: '2025-01-13T18:30:19.088Z',
        number: 65404
      },
      {
        _id: '678553f3133acd001be4a12a',
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2025-01-13T17:57:07.712Z',
        updatedAt: '2025-01-13T17:57:08.707Z',
        number: 65403
      }
    ];
    const newState = feedsReducer(initialState, {
      type: fetchFeeds.fulfilled.type,
      payload: testFeeds
    });
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.feedsData).toEqual(testFeeds);
  });
});
