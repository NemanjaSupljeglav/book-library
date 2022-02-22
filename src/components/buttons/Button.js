// React
import React from "react";
//import { useTranslation } from "react-i18next";

// MUI
import ButtonMUI from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@mui/styles";
import { style } from "@mui/system";

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
// import { makeStyles } from "@material-ui/core/styles";​
// Router

//import { useNavigate } from "react-router-dom";

// const useStyles = makeStyles(theme => ({}));​
const Button = (props) => {
  // const classes = useStyles();
  //const history = useNavigate();
  //const { t } = useTranslation();

  const {
    variant,
    label,
    onClick,
    color,
    icon,
    fullWidth,
    type,
    datacy,
    disabled,
    customStyle,
    startIcon,
    size,
  } = props;

  const classes = useStyles();
  return (
    <ButtonMUI
      disabled={disabled}
      variant={variant}
      color={color}
      onClick={onClick}
      endIcon={icon && <Icon>{icon}</Icon>}
      startIcon={startIcon && <Icon>{startIcon}</Icon>}
      fullWidth={fullWidth}
      type={type}
      datacy={datacy}
      style={customStyle}
      classes={classes}
      size={size}
      className={classes.addNew}
    >
      <div style={{ fontSize: "15px", position: "relative", top: "3px" }}>
        {label}
      </div>
    </ButtonMUI>
  );
};

Button.defaultProps = {
  variant: "contained",
  label: "Label",
  onClick: () => console.log("Ouch!"),
  color: "primary",
  goTo: "",
  icon: "",
  startIcon: "",
  fullWidth: false,
  type: "button",
  dataCy: null,
  disabled: false,
  customStyle: {},
  classes: {},
  size: "medium",
};

export default Button;
