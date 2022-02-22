import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import Button from "../buttons/Button";
import "./dialog.css";
import { bookForEdit } from "../../redux/booksSlice";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  addNew: {
    background: "rgb(222, 222, 222)",
    border: 0,
    borderRadius: 3,
    color: "black",
    height: "35px",
    padding: "0 10px",
    "&:hover": { background: "rgb(179, 179, 179)", border: "none" },
    transition: "0,5s",
    position: "relative",
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
  const classes = useStyles();
  return (
    <form className="wrapper-dialog">
      <div>
        <Dialog open={open} onClose={handleClose} PaperProps={PaperProps}>
          <DialogTitle>{title}</DialogTitle>

          <DialogContent>{content}</DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              label={"Cancel"}
              variant="outlined"
              className={classes.addNew}
            />

            <Button
              onClick={submitHandler}
              label={"Confirm"}
              variant="outlined"
              className={classes.addNew}
            />
          </DialogActions>
        </Dialog>
      </div>
    </form>
  );
}

export default Dialogs;
