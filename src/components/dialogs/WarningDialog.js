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
                left: "405px",
                top: "5px",
                cursor: "pointer",
              }}
              onClick={handleClose}
            />
            <DialogTitle>{title}</DialogTitle>
            <div
              className="warning-title"
              style={{
                display: "flex",
              }}
            >
              <WarningAmberOutlinedIcon
                style={{
                  top: "-5px",
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  color: "red",
                  marginLeft: "20px",
                }}
              />
              <h2
                style={{
                  position: "relative",
                  top: "5px",
                }}
              >
                {titleDelete}
              </h2>
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
                label={"Cancel"}
                variant="outlined"
                color="cancle"
              />

              <Button
                label={"Delete"}
                onClick={submitHandler}
                variant="contained"
                color="confirm"
              />
            </DialogActions>
          </Dialog>
        </div>
      </ThemeProvider>
    </form>
  );
}

export default Dialogs;
