import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import Button from "../buttons/Button";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import "./warningDialog.css";
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
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                color: "rgb(255, 89, 89)",
                marginLeft: "20px",
              }}
            />
            <h2
              style={{
                position: "relative",
                top: "-12px",
              }}
            >
              {titleDelete}
            </h2>
          </div>
          <DialogContent
            style={{
              position: "relative",
              top: "-25px",
            }}
          >
            {contentDelte}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} label={"Cancel"} variant="outlined" />

            <Button
              variant="outlined"
              label={"Delete"}
              onClick={submitHandler}
              customStyle={{
                background: "rgb(255, 89, 89)",
                border: "none",
                color: "white",
                "&:hover": { background: "black", color: "RGB(255, 82, 82)" },
              }}
            />
          </DialogActions>
        </Dialog>
      </div>
    </form>
  );
}

export default Dialogs;
