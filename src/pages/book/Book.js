import React from "react";
import "./book.css";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../redux/booksSlice";
function Book() {
  const count = useSelector((state) => state.book.value);
  const dispatch = useDispatch();
  return (
    <div className="book-wrapper">
      <h1>Hello Book </h1>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default Book;
