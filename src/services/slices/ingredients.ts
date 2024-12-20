import { getIngredientsApi } from '../../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

interface IngredientsListState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null | undefined;
  constructorItems: {
    bun: TIngredient | undefined;
    ingredients: TIngredient[];
  };
}

const initialState: IngredientsListState = {
  ingredients: [],
  isLoading: false,
  error: null,
  constructorItems: {
    bun: undefined,
    ingredients: []
  }
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addConstructorIngredient: {
      reducer: (state, action: PayloadAction<TIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },
    reorderConstuctor: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;
      const ingredients = [...state.constructorItems.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.constructorItems.ingredients = ingredients;
    }
  },
  selectors: {
    selectIngredients: (state: IngredientsListState) => state.ingredients,
    selectIsLoading: (state: IngredientsListState) => state.isLoading,
    selectConstructorItems: (state: IngredientsListState) =>
      state.constructorItems
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { selectIngredients, selectIsLoading, selectConstructorItems } =
  ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
export const { addConstructorIngredient, removeIngredient, reorderConstuctor } =
  ingredientsSlice.actions;
