import React from "react";
import Dialogs from "../../components/dialogs/Dialog";
import TextField from "../../components/atom/TextField";
import { FormControl } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Switch from "react-switch";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks } from "../../redux/booksSlice";
import { getAllAuthor } from "../../redux/authorsSlice";
import { getAllCategory } from "../../redux/categorySlice";
import { addBook, editBook, bookForEdit } from "../../redux/booksSlice";

function BookModal(props) {
  const { setOpen, open, setBookId, bookId } = props;

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [sorthDesc, setSorthDesc] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();

  const authorData = useSelector((state) => state.authorReducer.data);
  const categoryData = useSelector((state) => state.categoryReducer.data);
  const oneBook = useSelector((state) => state.bookReducer.oneBook);

  useEffect(() => {
    dispatch(getAllAuthor());
    dispatch(getAllCategory());
    dispatch(getAllBooks());
  }, []);

  useEffect(() => {
    if (oneBook) {
      setName(oneBook.name);
      setTagline(oneBook.tagline);
      setSorthDesc(oneBook.short_desc);
      setCategoryId(oneBook.category_id);
      setAuthorId(oneBook.author_id);
      setIsPublished(oneBook.is_published);
    } else {
      setIsValid(false);

      setBookId("");
      setName("");
      setTagline("");
      setSorthDesc("");
      setCategoryId("");
      setAuthorId("");
    }
  }, [oneBook]);

  const dialogContent = (
    <div>
      <div className="dialog-content-wrapper">
        <TextField
          margin="dense"
          id="name"
          name={"Book title"}
          placeholder="Book title"
          defaultValue={name}
          type="text"
          variant="standard"
          onChange={(event) => {
            setName(event.target.value);
          }}
          required
          style={{ width: 350 }}
          isValid={isValid}
          datacy="input-book-title"
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name={"Book description"}
          placeholder="Book description"
          type="text"
          defaultValue={sorthDesc}
          variant="standard"
          onChange={(event) => {
            setSorthDesc(event.target.value);
          }}
          multiline={true}
          style={{ width: 350 }}
          isValid={isValid}
          datacy="input-book-description"
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name={"Tagline"}
          placeholder="Tagline"
          type="text"
          defaultValue={tagline}
          variant="standard"
          onChange={(event) => {
            setTagline(event.target.value);
          }}
          required
          style={{ width: 350 }}
          isValid={isValid}
          datacy="input-book-tagline"
        />
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-standard-label">Author</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={authorId}
            label="Author"
            variant="standard"
            onChange={(event) => {
              setAuthorId(event.target.value);
            }}
            error={authorId === "" && isValid}
            datacy="input-book-author"
            data-tesid="input-book-author"
          >
            {authorData?.map((data) => {
              return (
                <MenuItem
                  key={data.id}
                  value={data.id}
                  defaultValue={1}
                  style={{
                    display: "flex",
                  }}
                >
                  {data.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-standard-label">
            Category
          </InputLabel>
          <Select
            id="demo-simple-select-standard"
            variant="standard"
            value={categoryId}
            onChange={(event) => {
              setCategoryId(event.target.value);
            }}
            error={categoryId === "" && isValid}
            label={"Category"}
            datacy="input-book-category"
          >
            {categoryData?.map((data) => {
              return (
                <MenuItem
                  key={data.id}
                  value={data.id}
                  defaultValue={1}
                  style={{
                    display: "flex",
                  }}
                >
                  {data.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {bookId !== "" && (
          <div
            onClick={() => {
              setIsPublished(!isPublished);
            }}
            className="switch-button"
          >
            <div className="label-switch">Published:</div>
            <Switch
              className="react-switch"
              checked={isPublished}
              aria-labelledby="neat-label"
              onChange={() => {}}
            />
          </div>
        )}
      </div>
    </div>
  );
  function checkInput(data) {
    let dataCheck = Object.values(data).filter((item) => /^\s*$/.test(item));
    return dataCheck.length > 0;
  }
  const dataBook = {
    name: name,
    tagline: tagline,
    category_id: categoryId,
    author_id: authorId,
    short_desc: sorthDesc,
    is_published: isPublished,
  };
  function submitHandler(event) {
    event.preventDefault();
    const dataBook = {
      name: name,
      tagline: tagline,
      category_id: categoryId,
      author_id: authorId,
      short_desc: sorthDesc,
      is_published: isPublished,
    };

    if (checkInput(dataBook)) {
      setIsValid(true);
    } else {
      bookId === ""
        ? dispatch(addBook(dataBook))
        : dispatch(editBook(dataBook, bookId));
      dispatch(bookForEdit());
      setOpen(false);
    }
  }

  const handleClose = () => {
    dispatch(bookForEdit());
    setIsValid(false);
    setOpen(false);
  };

  return (
    <div className="wrapper-book-dialog">
      <Dialogs
        setOpen={setOpen}
        setIsValide={setIsValid}
        open={open}
        content={dialogContent}
        dataBook={dataBook}
        title={bookId === "" ? "Add new book" : "Edit book"}
        PaperProps={{ sx: { width: "400px", height: "full" } }}
        submitHandler={submitHandler}
        handleClose={handleClose}
      />
    </div>
  );
}

export default BookModal;
