import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "../features/ProductSlice";
import CartSlice from "../features/CartSlice";
import UserSlice from "../features/UserSlice";
export const store = configureStore({
  reducer: {
    products: ProductSlice,
    cart: CartSlice,
    users: UserSlice,
  },
});
