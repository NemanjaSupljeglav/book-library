import React, { useEffect, useState } from "react";
import "./book.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, addBook } from "../../redux/booksSlice";
import Button from "../../components/buttons/Button";
import { getAllAuthor } from "../../redux/authorsSlice";
import { getAllCategory } from "../../redux/categorySlice";
import Dialogs from "../../components/dialogs/Dialog";
//MUIDataTable
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { faCheck, faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";

function Book() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [authorId, setAuthorId] = useState(1);
  const [sorthDesc, setSorthDesc] = useState("");
  //const [published, setPublished] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, [open]);

  useEffect(() => {
    dispatch(getAllAuthor());
    dispatch(getAllCategory());
  }, []);

  const bookData = useSelector((state) => state.bookReducer);
  const authorData = useSelector((state) => state.authorReducer.data);
  const categoryData = useSelector((state) => state.categoryReducer.data);
  console.log("categoryData");
  console.log(categoryData);
  console.log("categoryData");
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
          variant="standard"
          style={{ minWidth: 400, minHeight: 100 }}
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
          variant="standard"
          onChange={(event) => {
            setTagline(event.target.value);
          }}
          required
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Author</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={authorId}
            label="Author"
            onChange={(event) => {
              setAuthorId(event.target.value);
            }}
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

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={categoryId}
            label="Category"
            onChange={(event) => {
              setCategoryId(event.target.value);
            }}
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
