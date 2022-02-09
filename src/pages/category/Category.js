import React from "react";
import "./category.css";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../redux/categorySlice";
function Category() {
  const count = useSelector((state) => state.category.value);
  const dispatch = useDispatch();
  return (
    <div className="category-wrapper">
      <h1>Hello category </h1>

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

export default Category;
