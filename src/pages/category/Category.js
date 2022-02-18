import React, { useEffect, useState } from "react";
import "./category.css";
import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../../redux/categorySlice";
import Button from "../../components/buttons/Button";
import { getAllCategory } from "../../redux/categorySlice";
import Dialogs from "../../components/dialogs/Dialog";
import TextFieldAtom from "../../components/atom/TextField";
//MUIDataTable
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

function Category() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [isValid, setIsValid] = useState(false);

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
  function checkInput() {
    name === "" || about === "" ? setIsValid(true) : handleAddNew();
  }

  function handleAddNew() {
    const dataCategory = {
      name: name,
      short_desc: about,
    };
    dispatch(addCategory(dataCategory));
    setOpen(false);
  }

  const dialogContent = (
    <div>
      <div className="dialog-content-wrapper">
        <TextFieldAtom
          autoFocus
          margin="dense"
          id="name"
          name={"Category name"}
          placeholder="Category name"
          type="text"
          variant="standard"
          defaultValue={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          isValid={isValid}
          error={isValid && name === ""}
        />

        <TextFieldAtom
          autoFocus
          margin="dense"
          id="name"
          name={"About"}
          defaultValue={about}
          placeholder="Desription"
          variant="standard"
          onChange={(event) => {
            setAbout(event.target.value);
          }}
          multiline={true}
          isValid={isValid}
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
          handleAddNew={checkInput}
          title={"Add new category"}
          PaperProps={{ sx: { width: "280px", height: "full" } }}
          setIsValide={setIsValid}
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
