import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Button from "../buttons/Button";
import "./dialog.css";

function Dialogs({ setOpen, open, content, title, handleAddNew }) {
  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    handleAddNew();
  };

  return (
    <form className="wrapper">
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{title}</DialogTitle>

          <DialogContent>{content}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose} label={"Cancel"} variant="outlined" />

            <Button
              onClick={submitHandler}
              label={"Confirm"}
              variant="outlined"
            />
          </DialogActions>
        </Dialog>
      </div>
    </form>
  );
}

export default Dialogs;
