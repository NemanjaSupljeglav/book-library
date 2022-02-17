import React, { useEffect, useState } from "react";
import "./category.css";
import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../../redux/categorySlice";
import Button from "../../components/buttons/Button";
import { getAllCategory } from "../../redux/categorySlice";
import Dialogs from "../../components/dialogs/Dialog";

//MUIDataTable
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

function Category() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const categoryData = useSelector((state) => state.categoryReducer.data);

  //MUIDataTable

  const columns = [
    {
      name: "name",
      label: "Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "short_desc",
      label: "Describe",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  //Table option
  const options = {
    print: false,
    viewColumns: false,
    selectableRows: false,
  };
  const dataAuthor = {
    name: name,
    about: about,
  };

  function handleAddNew() {
    const dataAuthor = {
      name: name,
      short_desc: about,
    };
    dispatch(addCategory(dataAuthor));
    setOpen(false);
  }

  const dialogContent = (
    <div>
      <div className="dialog-content-wrapper">
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name={"Category name"}
          placeholder="Category name"
          type="text"
          variant="standard"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <TextareaAutosize
          autoFocus
          margin="dense"
          id="name"
          name={"About"}
          placeholder="Desription"
          style={{ minWidth: 400, minHeight: 100 }}
          variant="standard"
          onChange={(event) => {
            setAbout(event.target.value);
          }}
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
          dataAuthor={dataAuthor}
          handleAddNew={handleAddNew}
          title={"Add new category"}
        />
        <MUIDataTable
          title={
            <div className="button-add-book">
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                label={"add new Category"}
                variant="outlined"
                size="medium"
              />
            </div>
          }
          columns={columns}
          className="movie-data-table-wrapper"
          data={categoryData}
          options={options}
        />
      </ThemeProvider>
    </div>
  );
}

export default Category;
