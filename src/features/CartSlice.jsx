import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
export const fetchCart = createAsyncThunk(
  "fetchCart",
  async ({ cartId, userId, api }) => {
    const response = await api.get(
      `cart/get-cart/?cartId=${cartId}&?userId=${userId}`
    );

    return response.data.cart;
  }
);
export const addToCart = createAsyncThunk(
  "addToCart",

  async ({ userId, cartId, quantity, productId, api }) => {
    const response = await api.post(`cart/add-to-cart`, {
      product: productId,
      quantity,
      userId,
      cartId,
    });

    localStorage.setItem("cart", JSON.stringify(response.data.cart));
    return response.data.cart;
  }
);
export const decrementFromCart = createAsyncThunk(
  "decrementFromCart",
  async ({ api, cartId, userId, itemId }) => {
    const response = await api.post("cart/decrement-from-cart", {
      cartId,
      userId,
      itemId,
    });
    return response.data.cart;
  }
);
export const removeFromCart = createAsyncThunk(
  "removeFromCart",
  async ({ itemId, api, cartId }) => {
    const response = await api.post("cart/remove-from-cart", {
      itemId,
      cartId,
    });
    localStorage.setItem("cart", JSON.stringify(response.data.cart));
    return response.data.cart;
  }
);
const CartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    cart: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        console.log("error");
        console.log(action);
        state.cart = [];
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
        Swal.fire({
          title: "Product added to cart!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          position: "top-right",
        });
      })
      .addCase(decrementFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(decrementFromCart.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message;
      })
      .addCase(decrementFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      });
  },
});

export default CartSlice.reducer;
