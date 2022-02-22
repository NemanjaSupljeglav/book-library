import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import Button from "../buttons/Button";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { makeStyles } from "@mui/styles";
import "./warningDialog.css";
const useStyles = makeStyles({
  delete: {
    background: "rgb(255, 89, 89)",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: "35px",
    padding: "0 30px",
    "&:hover": {
      color: "white",
      background: "rgb(237, 45, 31)",
      border: "none",
    },
    transition: "0,5s",
    position: "relative",
  },
  cancle: {
    background: "white",
    border: "2px",
    borderRadius: 3,
    color: "black",
    height: "35px",
    padding: "0 30px",
    transition: "0.7s",
    position: "relative",
    "&:hover": {
      background: "rgb(217, 217, 217)",
      border: "none",
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
  const classes = useStyles();
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
            <Button
              onClick={handleClose}
              label={"Cancel"}
              variant="outlined"
              className={classes.cancle}
            />

            <Button
              variant="outlined"
              label={"Delete"}
              onClick={submitHandler}
              className={classes.delete}
              customStyle={{
                background: "rgb(255, 89, 89)",
                "&:hover": {
                  background: "rgb(217, 217, 217)",
                },
              }}
            />
          </DialogActions>
        </Dialog>
      </div>
    </form>
  );
}

export default Dialogs;
