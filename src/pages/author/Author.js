import React, { useEffect, useState } from "react";
import "./author.css";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import WarniningDialog from "../../components/dialogs/WarningDialog";
import { useTranslation } from "react-i18next";

import {
  getAllAuthor,
  deleteAuthor,
  addAuthor,
} from "../../redux/authorsSlice";
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
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteAuthorId, steDeleteAuthorId] = useState(0);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(getAllAuthor());
  }, []);

  const authorData = useSelector((state) => state.authorReducer.data);

  //MUIDataTable

  const columns = [
    {
      name: "name",
      label: t("name"),
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "about",
      label: t("about"),
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: t("delete"),
      label: "",
      property: "id",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <>
              {authorData[dataIndex] && (
                <Tooltip
                  title={t("delete-category")}
                  onClick={() => {
                    steDeleteAuthorId(authorData[dataIndex].id);
                    setOpenDelete(true);
                  }}
                  datacy="delete-author-test"
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
          name={t("author-name")}
          placeholder={t("author-name")}
          type="text"
          defaultValue={name}
          variant="standard"
          onChange={(event) => {
            setName(event.target.value);
          }}
          isValid={isValid}
          datacy="input-author-name"
        />

        <TextFieldAtom
          autoFocus
          margin="dense"
          id="name"
          name={t("about")}
          placeholder={t("about")}
          style={{ Width: 350 }}
          variant="standard"
          defaultValue={about}
          onChange={(event) => {
            setAbout(event.target.value);
          }}
          multiline={true}
          isValid={isValid}
          datacy="input-author-about"
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
  function handleDelete() {
    dispatch(deleteAuthor(deleteAuthorId));
    setOpenDelete(false);
  }
  const dialogContentDelte = (
    <div className="content-dialog">{t("delete-author-question")}</div>
  );
  return (
    <div className="book-wrapper">
      <ThemeProvider theme={createTheme()}>
        <WarniningDialog
          setOpenDelete={setOpenDelete}
          openDelte={openDelete}
          contentDelte={dialogContentDelte}
          deleteCategoryId={deleteAuthorId}
          handleDelete={handleDelete}
          titleDelete={t("confirm-delete")}
          buttonNo={t("cancel")}
          buttonOk={t("confirm")}
        />
        <Dialogs
          setOpen={setOpen}
          open={open}
          content={dialogContent}
          dataAuthor={dataAuthor}
          title={t("add-new-author")}
          PaperProps={{ sx: { width: "280px", height: "full" } }}
          setIsValide={setIsValid}
          handleClose={handleClose}
          submitHandler={handleAddNew}
        />
        <MUIDataTable
          title={
            <div className="button-add-book">
              <Tooltip
                title={t("add-new-author")}
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
