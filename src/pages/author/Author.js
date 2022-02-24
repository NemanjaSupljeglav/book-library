import React, { useEffect, useState } from "react";
import "./author.css";
import { useSelector, useDispatch } from "react-redux";
import { addAuthor } from "../../redux/authorsSlice";
import Button from "../../components/buttons/Button";
import { getAllAuthor } from "../../redux/authorsSlice";
import Dialogs from "../../components/dialogs/Dialog";
import TextFieldAtom from "../../components/atom/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
//MUIDataTable
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

function Author() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAuthor());
  }, []);

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
    selectableRows: "none",
  };
  const dataAuthor = {
    name: name,
    about: about,
  };

  const dialogContent = (
    <div>
      <div className="dialog-content-wrapper">
        <TextFieldAtom
          autoFocus
          margin="dense"
          id="name"
          name={"Author name"}
          placeholder="Author name"
          type="text"
          defaultValue={name}
          variant="standard"
          onChange={(event) => {
            setName(event.target.value);
          }}
          isValid={isValid}
        />

        <TextFieldAtom
          autoFocus
          margin="dense"
          id="name"
          name={"About"}
          placeholder="About"
          style={{ Width: 350 }}
          variant="standard"
          defaultValue={about}
          onChange={(event) => {
            setAbout(event.target.value);
          }}
          multiline={true}
          isValid={isValid}
        />
      </div>
    </div>
  );
  function checkInput(data) {
    let dataCheck = Object.values(data).filter((item) => /^\s*$/.test(item));
    return dataCheck.length > 0;
  }

  function handleAddNew(event) {
    event.preventDefault();
    const dataAuthor = {
      name: name,
      about: about,
    };

    if (checkInput(dataAuthor)) {
      setIsValid(true);
    } else {
      dispatch(addAuthor(dataAuthor));
      setOpen(false);
      setName("");
      setAbout("");
    }
  }

  const handleClose = () => {
    setIsValid(false);
    setOpen(false);
  };
  return (
    <div className="book-wrapper">
      <ThemeProvider theme={createTheme()}>
        <Dialogs
          setOpen={setOpen}
          open={open}
          content={dialogContent}
          dataAuthor={dataAuthor}
          title={"Add new author"}
          PaperProps={{ sx: { width: "280px", height: "full" } }}
          setIsValide={setIsValid}
          handleClose={handleClose}
          submitHandler={handleAddNew}
        />
        <MUIDataTable
          title={
            <div className="button-add-book">
              <Tooltip
                title="Add new author"
                onClick={() => {
                  setOpen(true);
                }}
                className="edit-icon"
                datacy="add-author-btn"
              >
                <IconButton>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Tooltip>
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
