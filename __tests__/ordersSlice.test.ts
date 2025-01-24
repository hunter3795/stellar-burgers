import ordersReducer, {
  fetchGetOrders,
  getOrderByNumber,
  initialState,
  orderBurger
} from '../src/services/slices/orders';
import { describe, expect, test } from '@jest/globals';

describe('проверка редьюсеров слайса orders', () => {
  describe('тест fetchGetOrders', () => {
    test('проверка экшена Request', () => {
      const newState = ordersReducer(initialState, {
        type: fetchGetOrders.pending.type
      });
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('проверка экшена Failed', () => {
      const testError = 'failed fetchGetOrders';
      const newState = ordersReducer(initialState, {
        type: fetchGetOrders.rejected.type,
        error: { message: testError }
      });
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toEqual(testError);
    });
    test('проверка экшена Success', () => {
      const testGetOrders = [
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
      const newState = ordersReducer(initialState, {
        type: fetchGetOrders.fulfilled.type,
        payload: testGetOrders
      });
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.orders).toEqual(testGetOrders);
    });
  });
  describe('тест санки orderBurger', () => {
    test('проверка экшена Request', () => {
      const newState = ordersReducer(initialState, {
        type: orderBurger.pending.type
      });
      expect(newState.orderRequest).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('проверка экшена Failed', () => {
      const testError = 'failed orderBurger';
      const newState = ordersReducer(initialState, {
        type: orderBurger.rejected.type,
        error: { message: testError }
      });
      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toEqual(testError);
    });
    test('проверка экшена Success', () => {
      const testOrderData = {
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
      };
      const newState = ordersReducer(initialState, {
        type: orderBurger.fulfilled.type,
        payload: { order: testOrderData }
      });
      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.orderNumberModalData).toEqual(testOrderData);
    });
  });
  describe('тест санки getOrderByNumber', () => {
    test('проверка экшена Request', () => {
      const newState = ordersReducer(initialState, {
        type: getOrderByNumber.pending.type
      });
      expect(newState.orderRequest).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('проверка экшена Failed', () => {
      const testError = 'failed getOrderByNumber';
      const newState = ordersReducer(initialState, {
        type: getOrderByNumber.rejected.type,
        error: { message: testError }
      });
      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toEqual(testError);
    });
    test('проверка экшена Success', () => {
      const testOrderInfoData = {
        orders: [
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
          }
        ]
      };

      const newState = ordersReducer(initialState, {
        type: getOrderByNumber.fulfilled.type,
        payload: testOrderInfoData
      });
      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.ordersInfoData).toEqual(testOrderInfoData.orders[0]);
    });
  });
});
