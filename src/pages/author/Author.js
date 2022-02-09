import React from "react";
import "./author.css";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../redux/authorsSlice";
function Author() {
  const count = useSelector((state) => state.author.value);
  const dispatch = useDispatch();
  return (
    <div className="author-wrapper">
      <h1>Hello Author </h1>
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

export default Author;
