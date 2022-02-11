import React, { useEffect } from "react";
import "./book.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks } from "../../redux/booksSlice";

function Book() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);
  const bookData = useSelector((state) => state.bookReducer);
  console.log("doslo u book page", bookData.data);

  return (
    <div className="book-wrapper">
      <h1>Hello Book </h1>
    </div>
  );
}

export default Book;
