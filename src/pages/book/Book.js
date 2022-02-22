import React, { useEffect, useState } from "react";
import "./book.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllBooks,
  addBook,
  deleteBook,
  editBook,
  bookForEdit,
} from "../../redux/booksSlice";
import Button from "../../components/buttons/Button";
import { getAllAuthor } from "../../redux/authorsSlice";
import { getAllCategory } from "../../redux/categorySlice";
import Dialogs from "../../components/dialogs/Dialog";
import WarniningDialog from "../../components/dialogs/WarningDialog";
import TextFieldAtom from "../../components/atom/TextField";
//MUI
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { FormControl } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Switch from "react-switch";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();

  const bookData = useSelector((state) => state.bookReducer.data);
  const authorData = useSelector((state) => state.authorReducer.data);
  const categoryData = useSelector((state) => state.categoryReducer.data);
  const oneBook = useSelector((state) => state.bookReducer.oneBook);

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  useEffect(() => {
    dispatch(getAllAuthor());
    dispatch(getAllCategory());
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
      setBookId("");
      setName("");
      setTagline("");
      setSorthDesc("");
      setCategoryId("");
      setAuthorId("");
    }
  }, [oneBook]);

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
                <CheckCircleOutlineIcon
                  className="published"
                  style={{ color: "green" }}
                />
              ) : (
                <ErrorOutlineIcon
                  className="published"
                  style={{ color: "red" }}
                />
              )}
            </>
          );
        },
      },
    },
    {
      name: "Edit",
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
                <Tooltip
                  title="Edit"
                  onClick={() => {
                    dispatch(bookForEdit(bookData[dataIndex].uuid));
                    setBookId(bookData[dataIndex].uuid);
                    setIsValid(false);
                    setOpen(true);
                  }}
                  className="edit-icon"
                >
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
            </>
          );
        },
      },
    },
    {
      name: "Delete",
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
                <Tooltip
                  title="Delete"
                  onClick={() => {
                    steDelteBookId(bookData[dataIndex].uuid);
                    setOpenDelete(true);
                  }}
                >
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
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
    selectableRows: "none",
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

  function checkInput(data) {
    let dataCheck = Object.values(data).filter((item) => /^\s*$/.test(item));
    return dataCheck.length > 0;
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

    if (checkInput(dataBook)) {
      setIsValid(true);
    } else {
      bookId === ""
        ? dispatch(addBook(dataBook))
        : dispatch(editBook(dataBook, bookId));
      setIsValid(false);
      setOpen(false);
    }
  }
  //dialog content
  const dialogContentDelte = (
    <div className="content-dialog">
      {" "}
      Are you sure you want to delete this book?
    </div>
  );
  const dialogContent = (
    <div>
      <div className="dialog-content-wrapper">
        <TextFieldAtom
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
        />
        <TextFieldAtom
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
        />
        <TextFieldAtom
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

  return (
    <div className="book-wrapper">
      <ThemeProvider theme={createTheme()}>
        <Dialogs
          setOpen={setOpen}
          setIsValide={setIsValid}
          open={open}
          content={dialogContent}
          dataBook={dataBook}
          handleAddNew={handleAddNew}
          title={bookId === "" ? "Add new book" : "Edit book"}
          PaperProps={{ sx: { width: "400px", height: "full" } }}
        />
        <WarniningDialog
          setOpenDelete={setOpenDelete}
          openDelte={openDelete}
          contentDelte={dialogContentDelte}
          delteBookId={delteBookId}
          handleDelete={handleDelete}
          titleDelete="Confirm Delete"
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
          data={bookData}
          options={options}
        />
      </ThemeProvider>
    </div>
  );
}

export default Book;
