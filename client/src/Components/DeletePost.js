import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import axiosins from "../AxiosInstance";
import Delete from "@mui/icons-material/Delete";
import { DialogTitle } from "@mui/material";
import AuthContext from "../Context/AuthContext";

export default function DeletePost(props) {
  const [open, setOpen] = React.useState(false);
  const { authenticated, currentUser } = React.useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const delPost = () => {
    axiosins
      .delete(`api/post/${props.post._id}`)
      .then((res) => props.deletePost(props.post._id))
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    delPost();
  };
  return (
    <div>
      <IconButton
        size="large"
        onClick={handleClickOpen}
        disabled={!authenticated || props.post.author.id != currentUser._id}
      >
        <Delete />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={handleClick}>YES</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
