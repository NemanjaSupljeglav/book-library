import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "../buttons/Button";
import "./dialog.css";

function Dialogs({
  setOpenDelete,
  openDelte,
  contentDelte,
  title,
  handleDelete,
}) {
  const handleClose = () => {
    setOpenDelete(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("KLIKNUO");
    handleDelete();
  };

  return (
    <form className="wrapper">
      <div>
        <Dialog open={openDelte} onClose={handleClose}>
          <DialogTitle>{title}</DialogTitle>

          <DialogContent>{contentDelte}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose} label={"Cancel"} variant="outlined" />

            <Button
              variant="outlined"
              label={"Delete"}
              startIcon={<DeleteIcon />}
              onClick={submitHandler}
            />
          </DialogActions>
        </Dialog>
      </div>
    </form>
  );
}

export default Dialogs;
