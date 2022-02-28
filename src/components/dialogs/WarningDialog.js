import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import Button from "../buttons/Button";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import "./warningDialog.css";
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
  setOpenDelete,
  openDelte,
  contentDelte,
  title,
  handleDelete,
  titleDelete,
  buttonOk,
  buttonNo,
}) {
  const handleClose = () => {
    setOpenDelete(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    handleDelete();
  };
  return (
    <form className="wrapper">
      <ThemeProvider theme={theme}>
        <div className="wrappr-warning-dialog">
          <Dialog open={openDelte} onClose={handleClose}>
            <CancelOutlinedIcon
              style={{
                position: "absolute",
                left: "390px",
                top: "23px",
                cursor: "pointer",
              }}
              onClick={handleClose}
            />
            <DialogTitle>{title}</DialogTitle>
            <div
              className="line-dialog-war"
              style={{
                position: "relative",
                height: "3px",
                width: "95%",
                background: "#ff764b",
                top: "30px",
                margin: "auto",
              }}
            ></div>
            <div
              className="warning-title"
              style={{
                display: "flex",
              }}
            >
              <WarningAmberOutlinedIcon
                style={{
                  position: "relative",
                  top: "-15px",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  color: "red",
                  marginLeft: "20px",
                }}
              />
              <DialogTitle className="title-add-dialog-warning">
                {titleDelete}
              </DialogTitle>
            </div>
            <DialogContent
              style={{
                position: "relative",
                top: "-15px",
              }}
            >
              {contentDelte}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                label={buttonNo}
                variant="outlined"
                color="cancle"
                datacy="delete-cancel-btn"
              />

              <Button
                label={buttonOk}
                onClick={submitHandler}
                variant="contained"
                color="confirm"
                datacy="delete-confirm-btn"
              />
            </DialogActions>
          </Dialog>
        </div>
      </ThemeProvider>
    </form>
  );
}

export default Dialogs;
