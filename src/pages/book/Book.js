import React, { useEffect } from "react";
import "./book.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks } from "../../redux/booksSlice";

//MUIDataTable
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { faCheck, faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//forInput
/*
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
*/

function Book() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);
  const bookData = useSelector((state) => state.bookReducer);
  console.log("doslo u book page", bookData.data[1]?.name);

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
  return (
    <div className="book-wrapper">
      <ThemeProvider theme={createTheme()}>
        <MUIDataTable
          title={"The Greatest Books"}
          columns={columns}
          className="movie-data-table-wrapper"
          data={bookData.data.reverse()}
          options={options}
        />
      </ThemeProvider>
    </div>
  );
}

export default Book;
