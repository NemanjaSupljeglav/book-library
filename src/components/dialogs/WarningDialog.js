import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
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
          <DeleteForeverOutlinedIcon
            style={{
              position: "relative",
              top: "-5px",
              color: "RGB(255, 82, 82)",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "RGB(255, 240, 240)",
              left: "150px",
            }}
          />
          <DialogContent>{contentDelte}</DialogContent>
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
