import React, { useEffect, useState } from "react";
import "./author.css";
import { useSelector, useDispatch } from "react-redux";
import { addAuthor } from "../../redux/authorsSlice";
import Button from "../../components/buttons/Button";
import { getAllAuthor } from "../../redux/authorsSlice";
import Dialogs from "../../components/dialogs/Dialog";

//MUIDataTable
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

function Author() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAuthor());
  }, [open]);

  const authorData = useSelector((state) => state.authorReducer.data);

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
      name: "about",
      label: "About",
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
      about: about,
    };
    dispatch(addAuthor(dataAuthor));
    setOpen(false);
  }

  const dialogContent = (
    <div>
      <div className="dialog-content-wrapper">
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name={"Author name"}
          placeholder="Author name"
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
          placeholder="About"
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
          title={"Add new author"}
        />
        <MUIDataTable
          title={
            <div className="button-add-book">
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                label={"add new Author"}
                variant="outlined"
                size="medium"
              />
            </div>
          }
          columns={columns}
          className="movie-data-table-wrapper"
          data={authorData}
          options={options}
        />
      </ThemeProvider>
    </div>
  );
}

export default Author;
