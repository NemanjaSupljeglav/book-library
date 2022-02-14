import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Button from "../buttons/Button";
import "./dialog.css";

function Dialogs({ setOpen, open, content, title, handleAddNewMovie }) {
  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    handleAddNewMovie();
  };

  return (
    <form className="wrapper">
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{title}</DialogTitle>

          <DialogContent>{content}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose} label={"Cancel"} />

            <Button onClick={submitHandler} label={"Confirm"} />
          </DialogActions>
        </Dialog>
      </div>
    </form>
  );
}

export default Dialogs;
