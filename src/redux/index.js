// Redux

import { combineReducers } from "redux";

import { getAllBooks } from "./booksSlice";

export default combineReducers({
  getAllBooks,
});
