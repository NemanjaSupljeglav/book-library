import React, { useEffect, useState } from "react";
import "./category.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
} from "../../redux/categorySlice";
import Dialogs from "../../components/dialogs/Dialog";
import TextFieldAtom from "../../components/atom/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import WarniningDialog from "../../components/dialogs/WarningDialog";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

function Category() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteCategoryId, steDeleteCategoryId] = useState(0);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const categoryData = useSelector((state) => state.categoryReducer.data);

  //MUIDataTable

  const columns = [
    {
      name: t("name"),
      label: t("category"),
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "short_desc",
      label: t("describe"),
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
              {categoryData[dataIndex] && (
                <Tooltip
                  title="Delete category"
                  onClick={() => {
                    steDeleteCategoryId(categoryData[dataIndex].id);
                    setOpenDelete(true);
                  }}
                  datacy="delete-category-test"
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
          name={t("category-name")}
          placeholder={t("category-name")}
          type="text"
          variant="standard"
          defaultValue={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          isValid={isValid}
          error={isValid && name === ""}
          datacy="input-category-name"
        />

        <TextFieldAtom
          autoFocus
          margin="dense"
          id="name"
          name={t("about")}
          defaultValue={about}
          placeholder={t("description")}
          variant="standard"
          onChange={(event) => {
            setAbout(event.target.value);
          }}
          multiline={true}
          isValid={isValid}
          datacy="input-category-about"
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
      short_desc: about,
    };

    if (checkInput(dataAuthor)) {
      setIsValid(true);
    } else {
      dispatch(addCategory(dataAuthor));
      setOpen(false);
      setIsValid(false);
      setName("");
      setAbout("");
    }
  }

  const handleClose = () => {
    setIsValid(false);
    setOpen(false);
  };
  //dialog content
  const dialogContentDelte = (
    <div className="content-dialog">{t("delete-category-question")}</div>
  );
  function handleDelete() {
    dispatch(deleteCategory(deleteCategoryId));
    setOpenDelete(false);
  }
  return (
    <div className="book-wrapper">
      <ThemeProvider theme={createTheme()}>
        <WarniningDialog
          setOpenDelete={setOpenDelete}
          openDelte={openDelete}
          contentDelte={dialogContentDelte}
          deleteCategoryId={deleteCategoryId}
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
          handleAddNew={handleAddNew}
          title={t("add-new-category")}
          handleClose={handleClose}
          submitHandler={handleAddNew}
          PaperProps={{ sx: { width: "280px", height: "full" } }}
        />
        <MUIDataTable
          title={
            <div className="button-add-book">
              <Tooltip
                title={t("add-new-category")}
                onClick={() => {
                  setOpen(true);
                }}
                className="edit-icon"
                datacy="add-category-btn"
              >
                <IconButton>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Tooltip>
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
