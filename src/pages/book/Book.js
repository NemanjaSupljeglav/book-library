import React, { useEffect, useState } from "react";
import "./book.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, deleteBook, bookForEdit } from "../../redux/booksSlice";
import WarniningDialog from "../../components/dialogs/WarningDialog";
import BookModal from "./BookModal";
//MUI
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function Book() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [count, setCount] = useState(0);
  const [bookId, setBookId] = useState("");
  const [delteBookId, steDelteBookId] = useState(0);

  const dispatch = useDispatch();

  const bookData = useSelector((state) => state.bookReducer.data);
  const authorData = useSelector((state) => state.authorReducer.data);
  const categoryData = useSelector((state) => state.categoryReducer.data);

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

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
                  style={{ color: "green", marginLeft: "5px" }}
                />
              ) : (
                <ErrorOutlineIcon
                  className="published"
                  style={{ color: "red", marginLeft: "5px" }}
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

  function handleDelete() {
    dispatch(deleteBook(delteBookId));
    setCount(count + 1);
    setOpenDelete(false);
  }

  //dialog content
  const dialogContentDelte = (
    <div className="content-dialog">
      Are you sure you want to delete this book?
    </div>
  );

  return (
    <div className="book-wrapper">
      <ThemeProvider theme={createTheme()}>
        <BookModal
          setOpen={setOpen}
          open={open}
          bookId={bookId}
          setBookId={setBookId}
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
              <Tooltip
                title="Add new book"
                onClick={() => {
                  setOpen(true);
                }}
                className="edit-icon"
                data-testid="add-book-btn"
              >
                <IconButton>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Tooltip>
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
