import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./redux/categorySlice";
import authorsReducer from "./redux/authorsSlice";
export default configureStore({
  reducer: {
    category: categoryReducer,
    author: authorsReducer,
  },
});
