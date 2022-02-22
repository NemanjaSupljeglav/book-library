// React
import React from "react";
//import { useTranslation } from "react-i18next";
// MUI
import Stack from "@mui/material/Stack";
import ButtonMUI from "@mui/material/Button";

import Icon from "@material-ui/core/Icon";

const Button = (props) => {
  const {
    variant,
    label,
    onClick,
    icon,
    fullWidth,
    type,
    color,
    datacy,
    disabled,
    customStyle,
    startIcon,
    size,
    className,
  } = props;

  return (
    <Stack spacing={2} direction="row">
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
        classes={className}
        size={size}
        className={className}
      >
        <div style={{ fontSize: "15px", position: "relative", top: "3px" }}>
          <div style={{ fontWeight: "bold" }}>{label}</div>
        </div>
      </ButtonMUI>
    </Stack>
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
