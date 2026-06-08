import { IPagination } from '@/types/common.type';
import { IProduct } from '@/types/product.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auctionApi } from '../api/auctions.api';
import { productApi } from '../api/product.api';
import { RootState } from '../store';

export const PRODUCT_SLICE_KEY = 'product';

export interface IProductSlice {
  products: IProduct[];
  pagination: IPagination;
}

const initialState: IProductSlice = {
  products: [],
  pagination: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 1,
  },
};

const productSlice = createSlice({
  name: PRODUCT_SLICE_KEY,
  initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<IProduct[]>) => {
      state.products = payload;
    },

    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
    },
  },

  extraReducers(builder) {
    builder.addMatcher(productApi.endpoints.createProduct.matchFulfilled, (state, { payload }) => {
      if (payload?.body?.data) {
        state.products = [payload.body.data, ...state.products];
      }
    });

    builder.addMatcher(productApi.endpoints.editProduct.matchFulfilled, (state, { payload }) => {
      if (payload?.body?.data) {
        state.products = state.products.map(e =>
          e?._id === payload.body?.data._id ? payload.body?.data : e,
        );
      }
    });

    builder.addMatcher(productApi.endpoints.getAllProducts.matchFulfilled, (state, { payload }) => {
      state.products = payload?.body?.data ?? [];
      state.pagination = payload.body.pagination;
    });

    builder.addMatcher(auctionApi.endpoints.createAuction.matchFulfilled, (state, { payload }) => {
      const product = payload.body?.data.product;
      if (product)
        state.products = state.products?.map(e =>
          e._id === product._id ? { ...e, availableStock: product.availableStock } : e,
        );
    });
  },
});

export const { setProducts, setCurrentPage } = productSlice.actions;
export const getProductSlice = (rootState: RootState) => rootState[PRODUCT_SLICE_KEY];
export const getAllProducts = (rootState: RootState) => getProductSlice(rootState).products;

export default productSlice.reducer;
