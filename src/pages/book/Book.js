import React, { useEffect, useState } from "react";
import "./book.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllBooks,
  addBook,
  deleteBook,
  editBook,
} from "../../redux/booksSlice";
import Button from "../../components/buttons/Button";
import { getAllAuthor } from "../../redux/authorsSlice";
import { getAllCategory } from "../../redux/categorySlice";
import Dialogs from "../../components/dialogs/Dialog";
import WarniningDialog from "../../components/dialogs/WarningDialog";

//MUI
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

import { FormControl } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
function Book() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [authorId, setAuthorId] = useState(0);
  const [sorthDesc, setSorthDesc] = useState("");
  const [count, setCount] = useState(0);
  const [bookId, setBookId] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [delteBookId, steDelteBookId] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  useEffect(() => {
    dispatch(getAllAuthor());
    dispatch(getAllCategory());
  }, []);

  const bookData = useSelector((state) => state.bookReducer.data);
  const authorData = useSelector((state) => state.authorReducer.data);
  const categoryData = useSelector((state) => state.categoryReducer.data);

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
      name: "author_id",
      label: "Author",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          let authorId = bookData[dataIndex].author_id;
          let authorName = authorData.find((e) => {
            return e.id === authorId;
          });
          return <>{authorName && <div>{authorName.name}</div>}</>;
        },
      },
    },
    {
      name: "category_id",
      label: "Category",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          let categoryId = bookData[dataIndex].category_id;
          let categoryName = categoryData.find((e) => {
            return e.id === categoryId;
          });
          return <>{categoryName && <div>{categoryName.name}</div>}</>;
        },
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
      label: "Published",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          return (
            <>
              {bookData[dataIndex].is_published ? (
                <CheckCircleOutlineIcon className="published" color="green" />
              ) : (
                <ErrorOutlineIcon className="published" />
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
              {bookData[dataIndex] && (
                <EditIcon
                  className="row-edit-table"
                  onClick={() => {
                    setBookId(bookData[dataIndex].uuid);
                    setName(bookData[dataIndex].name);
                    setTagline(bookData[dataIndex].tagline);
                    setSorthDesc(bookData[dataIndex].short_desc);
                    setCategoryId(bookData[dataIndex].category_id);
                    setAuthorId(bookData[dataIndex].author_id);
                    setIsPublished(bookData[dataIndex].is_published);
                    setOpen(true);
                  }}
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
              {bookData[dataIndex] && (
                <DeleteOutlineIcon
                  className="row-edit-table"
                  onClick={() => {
                    steDelteBookId(bookData[dataIndex].uuid);
                    setOpenDelete(true);
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
    is_published: isPublished,
  };

  function handleDelete() {
    dispatch(deleteBook(delteBookId));
    setCount(count + 1);
    setOpenDelete(false);
  }

  function handleAddNew() {
    const dataBook = {
      name: name,
      tagline: tagline,
      category_id: categoryId,
      author_id: authorId,
      short_desc: sorthDesc,
      is_published: isPublished,
    };

    bookId === ""
      ? dispatch(addBook(dataBook))
      : dispatch(editBook(dataBook, bookId));

    setCount(count + 1);
    setOpen(false);
  }
  //dialog content
  const dialogContentDelte = (
    <h3> Are you sure you want to delete this book?</h3>
  );
  const dialogContent = (
    <div>
      <div className="dialog-content-wrapper">
        <TextField
          autoFocus
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
        />
        <TextareaAutosize
          autoFocus
          margin="dense"
          id="name"
          name={"Book description"}
          placeholder="Book description"
          type="text"
          defaultValue={sorthDesc}
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
          defaultValue={tagline}
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
            variant="standard"
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
            variant="standard"
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
        {bookId !== "" && (
          <FormControlLabel
            value="Publish"
            control={
              <Switch
                checked={isPublished}
                defaultValue={isPublished}
                onChange={(event) => {
                  setIsPublished(event.target.checked);
                  console.log(isPublished);
                }}
                inputProps={{ "aria-label": "controlled" }}
                label={"Published"}
              />
            }
            label="Publish"
          />
        )}
      </div>
    </div>
  );
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <div className="book-wrapper">
      <FormControlLabel control={<Switch defaultChecked />} label="Label" />
      <FormControlLabel disabled control={<Switch />} label="Disabled" />
      <Switch {...label} defaultChecked />
      <ThemeProvider theme={createTheme()}>
        <Dialogs
          setOpen={setOpen}
          open={open}
          content={dialogContent}
          dataBook={dataBook}
          handleAddNew={handleAddNew}
          title={bookId === "" ? "Add new book" : "Edit book"}
        />
        <WarniningDialog
          setOpenDelete={setOpenDelete}
          openDelte={openDelete}
          contentDelte={dialogContentDelte}
          delteBookId={delteBookId}
          handleDelete={handleDelete}
        />
        <MUIDataTable
          title={
            <div className="button-add-book">
              <Button
                onClick={() => {
                  setBookId("");
                  setName("");
                  setTagline("");
                  setSorthDesc("");
                  setCategoryId("");
                  setAuthorId("");
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
          data={bookData}
          options={options}
        />
      </ThemeProvider>
    </div>
  );
}

export default Book;
