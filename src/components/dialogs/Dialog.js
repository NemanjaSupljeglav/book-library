import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import Button from "../buttons/Button";
import "./dialog.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { bookForEdit } from "../../redux/booksSlice";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    confirm: {
      main: "#ff764b",
      contrastText: "#fff",
    },
    cancle: {
      main: "#ff764b",
      contrastText: "#fff",
    },
  },
});
function Dialogs({
  setOpen,
  open,
  content,
  title,
  handleAddNew,
  PaperProps,
  setIsValide,
}) {
  const dispatch = useDispatch();
  const handleClose = () => {
    setIsValide(false);
    setOpen(false);
    dispatch(bookForEdit());
  };

  const submitHandler = (event) => {
    event.preventDefault();
    handleAddNew();
  };
  return (
    <form className="wrapper-dialog">
      <div>
        <ThemeProvider theme={theme}>
          <Dialog open={open} onClose={handleClose} PaperProps={PaperProps}>
            <CancelOutlinedIcon
              onClick={handleClose}
              style={{
                position: "absolute",
                right: "15px",
                top: "23px",
                cursor: "pointer",
                zIndex: "99999",
              }}
            />
            <DialogTitle className="title-add-dialog">{title}</DialogTitle>
            <div className="line-dialog"></div>
            <DialogContent>{content}</DialogContent>

            <DialogActions>
              <Button
                onClick={handleClose}
                label={"Cancel"}
                variant="outlined"
                color="cancle"
              />

              <Button
                onClick={submitHandler}
                label={"Confirm"}
                variant="contained"
                color="confirm"
              />
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </div>
    </form>
  );
}

export default Dialogs;
