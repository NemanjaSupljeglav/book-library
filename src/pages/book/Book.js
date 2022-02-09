import React from "react";
import "./book.css";
import { useSelector, useDispatch } from "react-redux";
//import getAllBook from "../../redux/booksSlice";
function Book() {
  const dispatch = useDispatch();

  return (
    <div className="book-wrapper">
      <h1>Hello Book </h1>
    </div>
  );
}

export default Book;
