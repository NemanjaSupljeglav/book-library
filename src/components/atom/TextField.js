import React from "react";
import TextField from "@mui/material/TextField";

function TextFieldAtom(props) {
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
  } = props;

  return (
    <div className="textField">
      <TextField
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
        error={defaultValue === "" && isValid}
        helperText={defaultValue === "" && isValid ? "Empty" : ""}
        rows={5}
        label={placeholder}
      />
    </div>
  );
}

export default TextFieldAtom;
