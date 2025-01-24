import ingredientsReducer, {
  addConstructorIngredient,
  fetchIngredients,
  removeIngredient,
  reorderConstuctor
} from '../src/services/slices/ingredients';
import { describe, expect, test } from '@jest/globals';

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
