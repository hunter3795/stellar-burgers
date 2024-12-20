import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TNewOrderResponse
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

export const fetchGetOrders = createAsyncThunk(
  'orders/getAll',
  async () => await getOrdersApi()
);

export const orderBurger = createAsyncThunk<TNewOrderResponse, string[]>(
  'order/orderBurger',
  async (dataOrder) => await orderBurgerApi(dataOrder)
);

export const getOrderByNumber = createAsyncThunk(
  'order/orderBurgerByNumber',
  async (dataORderNumber: number) => await getOrderByNumberApi(dataORderNumber)
);

interface OrderListState {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null | undefined;
  orderNumberModalData: TOrder | null;
  OrderRequest: boolean;
  ordersInfoData: TOrder | null;
}

const initialState: OrderListState = {
  orders: [],
  isLoading: false,
  error: null,
  orderNumberModalData: null,
  OrderRequest: false,
  ordersInfoData: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderNumberModalData: (state) => {
      state.orderNumberModalData = null;
    }
  },
  selectors: {
    selectOrders: (state: OrderListState) => state.orders,
    selectIsLoading: (state: OrderListState) => state.isLoading,
    selectOrderModalData: (state: OrderListState) => state.orderNumberModalData,
    selectIsLoadingOrderRequst: (state: OrderListState) => state.OrderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGetOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGetOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(orderBurger.pending, (state) => {
        state.OrderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.OrderRequest = false;
        state.error = action.error.message;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.OrderRequest = false;
        state.orderNumberModalData = action.payload.order;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.OrderRequest = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.OrderRequest = false;
        state.error = action.error.message;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.ordersInfoData = action.payload.orders[0];
      });
  }
});

export default ordersSlice.reducer;
export const {
  selectIsLoading,
  selectOrders,
  selectOrderModalData,
  selectIsLoadingOrderRequst
} = ordersSlice.selectors;

export const { clearOrderNumberModalData } = ordersSlice.actions;

export const ordersInfoDataSelector =
  (number: string) => (state: RootState) => {
    if (state.orders.orders.length) {
      const data = state.orders.orders.find((item) => item.number === +number);
      if (data) return data;
    }

    if (state.feeds.feedsData.orders.length) {
      const data = state.feeds.feedsData.orders.find(
        (item) => item.number === +number
      );
      if (data) return data;
    }

    if (state.orders.orderNumberModalData?.number === +number) {
      return state.orders.orderNumberModalData;
    }

    return null;
  };
