import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer, {
  addConstructorIngredient,
  fetchIngredients,
  removeIngredient,
  reorderConstuctor
} from '../src/services/slices/ingredients';
import feedsReducer, { fetchFeeds } from '../src/services/slices/feeds';
import userReducer, {
  checkUserAuth,
  loginUser,
  registerUser,
  updateUser
} from '../src/services/slices/user';
import ordersReducer, {
  fetchGetOrders,
  getOrderByNumber,
  orderBurger
} from '../src/services/slices/orders';
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
    expect(initialState.feeds).toEqual(
      feedsReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
    expect(initialState.ingredients).toEqual(
      ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
    expect(initialState.orders).toEqual(
      ordersReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
    expect(initialState.user).toEqual(
      userReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
  });
});

describe('проверка slice конструктора ингредиентов', () => {
  const initialStateIngredietns = [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0945',
      name: 'Соус с шипами Антарианского плоскоходца',
      type: 'sauce',
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
    }
  ];
  test('обработка экшена добавления ингредиента', () => {
    const addedConstructorIngredientState = [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: expect.any(String)
      }
    ];
    const newState = ingredientsReducer(
      {
        ingredients: initialStateIngredietns,
        isLoading: false,
        error: null,
        constructorItems: {
          bun: undefined,
          ingredients: []
        }
      },
      addConstructorIngredient(initialStateIngredietns[0])
    );
    expect(newState.constructorItems.ingredients).toEqual(
      addedConstructorIngredientState
    );
  });
  test('обработка экшена удаления ингредиента', () => {
    const initialState = [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0945',
        name: 'Соус с шипами Антарианского плоскоходца',
        type: 'sauce',
        proteins: 101,
        fat: 99,
        carbohydrates: 100,
        calories: 100,
        price: 88,
        image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
      }
    ];
    const stateBeforeRemove = [
      {
        _id: '643d69a5c3f7b9001cfa0945',
        name: 'Соус с шипами Антарианского плоскоходца',
        type: 'sauce',
        proteins: 101,
        fat: 99,
        carbohydrates: 100,
        calories: 100,
        price: 88,
        image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
      }
    ];

    const newState = ingredientsReducer(
      {
        ingredients: initialStateIngredietns,
        isLoading: false,
        error: null,
        constructorItems: {
          bun: undefined,
          ingredients: initialState
        }
      },
      removeIngredient(0)
    );
    expect(newState.constructorItems.ingredients).toEqual(stateBeforeRemove);
  });
  test('обработка экшена изменения порядка изменения ингредиентов в начинке', () => {
    const initialStateConstructor = [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0
      }
    ];
    const sortedIngredients = [
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0
      }
    ];

    const newState = ingredientsReducer(
      {
        ingredients: initialStateIngredietns,
        isLoading: false,
        error: null,
        constructorItems: {
          bun: undefined,
          ingredients: initialStateConstructor
        }
      },
      reorderConstuctor({
        from: 1,
        to: 0
      })
    );
    expect(newState.constructorItems.ingredients).toEqual(sortedIngredients);
  });
});

describe('проверка редьюсеров слайса ingredients', () => {
  test('тест экшена Request', () => {
    const newState = ingredientsReducer(undefined, {
      type: fetchIngredients.pending.type
    });
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBe(null);
  });
  test('тест экшена Failed', () => {
    const testError = 'error fetchIngredients';
    const newState = ingredientsReducer(undefined, {
      type: fetchIngredients.rejected.type,
      error: { message: testError }
    });
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual(testError);
  });
  test('тест экшена Success', () => {
    const testIngredients = [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0945',
        name: 'Соус с шипами Антарианского плоскоходца',
        type: 'sauce',
        proteins: 101,
        fat: 99,
        carbohydrates: 100,
        calories: 100,
        price: 88,
        image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
      }
    ];
    const newState = ingredientsReducer(undefined, {
      type: fetchIngredients.fulfilled.type,
      payload: testIngredients
    });
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.ingredients).toEqual(testIngredients);
  });
});

describe('проверка редьюсеров слайса feeds', () => {
  test('проверка экшена Request', () => {
    const newState = feedsReducer(undefined, { type: fetchFeeds.pending.type });
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBe(null);
  });
  test('проверка экшена Failed', () => {
    const testError = 'error fetchFeeds';
    const newState = feedsReducer(undefined, {
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
    const newState = feedsReducer(undefined, {
      type: fetchFeeds.fulfilled.type,
      payload: testFeeds
    });
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.feedsData).toEqual(testFeeds);
  });
});

describe('проверка редьюсеров слайса orders', () => {
  describe('тест fetchGetOrders', () => {
    test('проверка экшена Request', () => {
      const newState = ordersReducer(undefined, {
        type: fetchGetOrders.pending.type
      });
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('проверка экшена Failed', () => {
      const testError = 'failed fetchGetOrders';
      const newState = ordersReducer(undefined, {
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
      const newState = ordersReducer(undefined, {
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
      const newState = ordersReducer(undefined, {
        type: orderBurger.pending.type
      });
      expect(newState.orderRequest).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('проверка экшена Failed', () => {
      const testError = 'failed orderBurger';
      const newState = ordersReducer(undefined, {
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
      const newState = ordersReducer(undefined, {
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
      const newState = ordersReducer(undefined, {
        type: getOrderByNumber.pending.type
      });
      expect(newState.orderRequest).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('проверка экшена Failed', () => {
      const testError = 'failed getOrderByNumber';
      const newState = ordersReducer(undefined, {
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

      const newState = ordersReducer(undefined, {
        type: getOrderByNumber.fulfilled.type,
        payload: testOrderInfoData
      });
      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.ordersInfoData).toEqual(testOrderInfoData.orders[0]);
    });
  });
});

describe('проверка слайса userSlice', () => {
  describe('тест санки checkUserAuth', () => {
    test('проверка экщена Request', () => {
      const newState = userReducer(undefined, {
        type: checkUserAuth.pending.type
      });
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('проверка экшена Failed', () => {
      const testError = 'failed checkUserAuth';
      const newState = userReducer(undefined, {
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
      const newState = userReducer(undefined, {
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
      const newState = userReducer(undefined, {
        type: registerUser.pending.type
      });
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('проверка экшена Failed', () => {
      const testError = 'failed registerUser';
      const newState = userReducer(undefined, {
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
      const newState = userReducer(undefined, {
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
      const newState = userReducer(undefined, {
        type: loginUser.pending.type
      });
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('проверка экшена Failed', () => {
      const testError = 'failed loginUser';
      const newState = userReducer(undefined, {
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
      const newState = userReducer(undefined, {
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
      const newState = userReducer(undefined, {
        type: updateUser.pending.type
      });
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('проверка экшена Failed', () => {
      const testError = 'failed updateUser';
      const newState = userReducer(undefined, {
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
      const newState = userReducer(undefined, {
        type: updateUser.fulfilled.type,
        payload: testUser
      });
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.data).toEqual(testUser.user);
    });
  });
});
