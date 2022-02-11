// Redux

import { combineReducers } from "redux";

import { bookReducer } from "./booksSlice";

export default combineReducers({
  bookReducer,
});
