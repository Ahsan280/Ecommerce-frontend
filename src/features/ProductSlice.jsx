import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("fetchProducts", async (api) => {
  const response = await api.get("product/get-all-products");

  return response.data.products;
});
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ api, formData }) => {
    const response = await api.post(`product/update-product`, formData);
    return response.data.product;
  }
);
export const addProduct = createAsyncThunk(
  "addProduct",
  async ({ api, formData }) => {
    const response = await api.post(`product/create-product`, formData);
    return response.data.product;
  }
);
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async ({ api, productId }, { rejectWithValue }) => {
    try {
      const response = await api.post(`product/delete-product`, {
        productId,
      });
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ProductSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProducts = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
        state.products = updatedProducts;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.error = null;
      });
  },
});

export default ProductSlice.reducer;
