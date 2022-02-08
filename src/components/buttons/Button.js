// React
import React from "react";
//import { useTranslation } from "react-i18next";

// MUI
import ButtonMUI from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
// import { makeStyles } from "@material-ui/core/styles";​
// Router

import { useNavigate } from "react-router-dom";

// const useStyles = makeStyles(theme => ({}));​
const Button = (props) => {
  // const classes = useStyles();
  const history = useNavigate();
  //const { t } = useTranslation();

  const {
    variant,
    label,
    onClick,
    color,
    goTo,
    icon,
    fullWidth,
    type,
    datacy,
    disabled,
    customStyle,
    startIcon,
    classes,
    size,
  } = props;

  return (
    <ButtonMUI
      disabled={disabled}
      variant={variant}
      color={color}
      onClick={goTo ? () => history.push(goTo) : onClick}
      endIcon={icon && <Icon>{icon}</Icon>}
      startIcon={startIcon && <Icon>{startIcon}</Icon>}
      fullWidth={fullWidth}
      type={type}
      datacy={datacy}
      style={customStyle}
      classes={classes}
      size={size}
    >
      {label}
    </ButtonMUI>
  );
};

Button.defaultProps = {
  variant: "contained",
  label: "Label",
  onClick: () => {
    console.log("Ouch!");
  },
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
