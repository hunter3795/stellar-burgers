import { getFeedsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

export const fetchFeeds = createAsyncThunk('feeds/getAll', getFeedsApi);

interface IFeedsState {
  feedsData: TOrdersData;
  isLoading: boolean;
  error: string | null | undefined;
}

export const initialState: IFeedsState = {
  feedsData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectFeeds: (state) => state.feedsData.orders,
    selectIsLoading: (state) => state.isLoading,
    selectTotal: (state) => state.feedsData.total,
    selectTotalToday: (state) => state.feedsData.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedsData = action.payload;
      });
  }
});

export default feedsSlice.reducer;
export const { selectFeeds, selectIsLoading, selectTotal, selectTotalToday } =
  feedsSlice.selectors;
