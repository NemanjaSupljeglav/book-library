import React from "react";
import Dialogs from "../../components/dialogs/Dialog";
import TextFieldAtom from "../../components/atom/TextField";
import { FormControl } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Switch from "react-switch";
import { useEffect, useState } from "react";
function BookModal(props) {
  const {
    setOpen,
    setIsValid,
    open,
    name,
    dataBook,
    bookId,
    submitHandler,
    handleClose,
    setName,
    isValid,
    sorthDesc,
    setSorthDesc,
    tagline,
    setTagline,
    authorId,
    setAuthorId,
    authorData,
    categoryId,
    setCategoryId,
    categoryData,
    setIsPublished,
    isPublished,
  } = props;

  const dialogContent = (
    <div>
      <div className="dialog-content-wrapper">
        <TextFieldAtom
          margin="dense"
          id="name"
          name={"Book title"}
          placeholder="Book title"
          defaultValue={name}
          type="text"
          variant="standard"
          onChange={(event) => {
            setName(event.target.value);
          }}
          required
          style={{ width: 350 }}
          isValid={isValid}
        />
        <TextFieldAtom
          autoFocus
          margin="dense"
          id="name"
          name={"Book description"}
          placeholder="Book description"
          type="text"
          defaultValue={sorthDesc}
          variant="standard"
          onChange={(event) => {
            setSorthDesc(event.target.value);
          }}
          multiline={true}
          style={{ width: 350 }}
          isValid={isValid}
        />
        <TextFieldAtom
          autoFocus
          margin="dense"
          id="name"
          name={"Tagline"}
          placeholder="Tagline"
          type="text"
          defaultValue={tagline}
          variant="standard"
          onChange={(event) => {
            setTagline(event.target.value);
          }}
          required
          style={{ width: 350 }}
          isValid={isValid}
        />
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-standard-label">Author</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={authorId}
            label="Author"
            variant="standard"
            onChange={(event) => {
              setAuthorId(event.target.value);
            }}
            error={authorId === "" && isValid}
          >
            {authorData?.map((data) => {
              return (
                <MenuItem
                  key={data.id}
                  value={data.id}
                  defaultValue={1}
                  style={{
                    display: "flex",
                  }}
                >
                  {data.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-standard-label">
            Category
          </InputLabel>
          <Select
            id="demo-simple-select-standard"
            variant="standard"
            value={categoryId}
            onChange={(event) => {
              setCategoryId(event.target.value);
            }}
            error={categoryId === "" && isValid}
            label={"Category"}
          >
            {categoryData?.map((data) => {
              return (
                <MenuItem
                  key={data.id}
                  value={data.id}
                  defaultValue={1}
                  style={{
                    display: "flex",
                  }}
                >
                  {data.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {bookId !== "" && (
          <div
            onClick={() => {
              setIsPublished(!isPublished);
            }}
            className="switch-button"
          >
            <div className="label-switch">Published:</div>
            <Switch
              className="react-switch"
              checked={isPublished}
              aria-labelledby="neat-label"
              onChange={() => {}}
            />
          </div>
        )}
      </div>
    </div>
  );
  return (
    <div className="wrapper-book-dialog">
      <Dialogs
        setOpen={setOpen}
        setIsValide={setIsValid}
        open={open}
        content={dialogContent}
        dataBook={dataBook}
        title={bookId === "" ? "Add new book" : "Edit book"}
        PaperProps={{ sx: { width: "400px", height: "full" } }}
        submitHandler={submitHandler}
        handleClose={handleClose}
      />
    </div>
  );
}

export default BookModal;
