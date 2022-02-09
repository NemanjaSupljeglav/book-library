import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./redux/booksSlice";
import categoryReducer from "./redux/categorySlice";
import authorsReducer from "./redux/authorsSlice";
export default configureStore({
  reducer: {
    book: booksReducer,
    category: categoryReducer,
    author: authorsReducer,
  },
});
