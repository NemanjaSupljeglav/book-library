import React, { useEffect, useState } from "react";
import "./book.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, addBook } from "../../redux/booksSlice";
import Button from "../../components/buttons/Button";

//MUIDataTable
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { faCheck, faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//forInput
import Dialogs from "../../components/dialogs/Dialog";
import TextField from "@mui/material/TextField";
//import Box from "@mui/material/Box";
//import InputLabel from "@mui/material/InputLabel";
//import MenuItem from "@mui/material/MenuItem";
//import FormControl from "@mui/material/FormControl";
//import Select from "@mui/material/Select";
//import ToggleButton from "@mui/material/ToggleButton";
//import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextareaAutosize from "@mui/material/TextareaAutosize";

function Book() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [authorId, setAuthorId] = useState(1);
  const [sorthDesc, setSorthDesc] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, [open]);
  const bookData = useSelector((state) => state.bookReducer);

  //MUIDataTable

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "category_id",
      label: "Category",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "author_id",
      label: "author",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "tagline",
      label: "Tagline",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "is_published",
      label: "PUBLISHED",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          return (
            <>
              {bookData.data[dataIndex].is_published ? (
                <FontAwesomeIcon
                  className="published"
                  icon={faCheck}
                  color="green"
                />
              ) : (
                <FontAwesomeIcon
                  className="published"
                  icon={faTimes}
                  color="red"
                />
              )}
            </>
          );
        },
      },
    },
    {
      name: "",
      label: "",
      property: "id",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <>
              {bookData.data[dataIndex].is_published ? (
                <FontAwesomeIcon
                  className="row-edit-table"
                  icon={faEdit}
                  onClick={() => {
                    console.log("This is for edit");
                    //setAddNewOrEdit("Edit movie");
                    //dispatch(getEditMovie(movies[dataIndex]?.id));
                    //setOpen(true);
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => {
                    console.log("This movie is not available");
                  }}
                />
              )}
            </>
          );
        },
      },
    },
  ];
  //Table option
  const options = {
    print: false,
    viewColumns: false,
    selectableRows: false,
  };
  const dataBook = {
    name: name,
    tagline: tagline,
    category_id: categoryId,
    author_id: authorId,
    short_desc: sorthDesc,
  };

  function handleAddNewBook() {
    const dataBook = {
      name: name,
      tagline: tagline,
      category_id: categoryId,
      author_id: authorId,
      short_desc: sorthDesc,
    };
    dispatch(addBook(dataBook));
    setOpen(false);
  }

  const dialogContent = (
    <div>
      <div className="dialog-content-wrapper">
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name={"Book title"}
          placeholder="Book title"
          type="text"
          fullWidth
          variant="standard"
          onChange={(event) => {
            setName(event.target.value);
          }}
          required
        />
        <TextareaAutosize
          autoFocus
          margin="dense"
          id="name"
          name={"Book description"}
          placeholder="Book description"
          type="text"
          fullWidth
          variant="standard"
          style={{ width: 543, height: 100 }}
          onChange={(event) => {
            setSorthDesc(event.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name={"Tagline"}
          placeholder="Tagline"
          type="text"
          fullWidth
          variant="standard"
          onChange={(event) => {
            setTagline(event.target.value);
          }}
          required
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name={"Category"}
          placeholder="Category unesi broj od 1 do 8"
          type="number"
          fullWidth
          variant="standard"
          onChange={(event) => {
            setCategoryId(event.target.value);
          }}
          required
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name={"Author"}
          placeholder="Author unesi broj od 1 do 18"
          type="number"
          fullWidth
          variant="standard"
          onChange={(event) => {
            setAuthorId(event.target.value);
          }}
          required
        />
      </div>
    </div>
  );
  return (
    <div className="book-wrapper">
      <ThemeProvider theme={createTheme()}>
        <Dialogs
          setOpen={setOpen}
          open={open}
          content={dialogContent}
          dataBook={dataBook}
          handleAddNewBook={handleAddNewBook}
        />
        <MUIDataTable
          title={
            <div className="button-add-book">
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                label={"add new Book"}
                color="error"
                variant="outlined"
                size="medium"
              />
            </div>
          }
          columns={columns}
          className="movie-data-table-wrapper"
          data={bookData.data}
          options={options}
        />
      </ThemeProvider>
    </div>
  );
}

export default Book;
