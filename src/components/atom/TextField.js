import React from "react";
import TextFieldMUI from "@mui/material/TextField";

function TextField(props) {
  const {
    defaultValue,
    onChange,
    margin,
    id,
    name,
    placeholder,
    variant,
    multiline,
    style,
    isValid,
    datacy,
  } = props;

  return (
    <div className="textField">
      <TextFieldMUI
        margin={margin}
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        type="text"
        variant={variant}
        onChange={onChange}
        multiline={multiline}
        style={style}
        error={/^\s*$/.test(defaultValue) && isValid}
        helperText={
          /^\s*$/.test(defaultValue) && isValid ? "Invalid input!" : ""
        }
        rows={5}
        label={placeholder}
        datacy={datacy}
      />
    </div>
  );
}

export default TextField;
