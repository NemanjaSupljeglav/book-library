import * as React from "react";
import DialogMUI from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../buttons/Button";
import "./dialog.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

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
function Dialog({
  open,
  content,
  title,
  PaperProps,
  submitHandler,
  handleClose,
}) {
  const { t } = useTranslation();

  return (
    <form className="wrapper-dialog">
      <div>
        <ThemeProvider theme={theme}>
          <DialogMUI open={open} onClose={handleClose} PaperProps={PaperProps}>
            <CancelOutlinedIcon
              onClick={handleClose}
              className="close-icon"
              datacy="cancel-book-icon"
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
                label={t("cancel")}
                variant="outlined"
                color="cancle"
                datacy="cancel-book-btn"
              />

              <Button
                onClick={submitHandler}
                label={t("confirm")}
                variant="contained"
                color="confirm"
                datacy="confirm-book-btn"
              />
            </DialogActions>
          </DialogMUI>
        </ThemeProvider>
      </div>
    </form>
  );
}

export default Dialog;
