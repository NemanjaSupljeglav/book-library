// Redux

import { combineReducers } from "redux";

import { bookReducer } from "./booksSlice";
import { authorReducer } from "./authorsSlice";
import { categoryReducer } from "./categorySlice";
export default combineReducers({
  bookReducer,
  authorReducer,
  categoryReducer,
});
