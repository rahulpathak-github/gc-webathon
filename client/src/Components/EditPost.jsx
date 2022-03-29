import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
// import { Input } from "@mui/material";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import ImageList from "@mui/material/ImageList";
import Edit from "@mui/icons-material/Edit";
// import ImageListItem from "@mui/material/ImageListItem";
import axios from "axios";
import axiosins from "../AxiosInstance";

// const itemData = [
//   {
//     img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
//     title: "Breakfast",
//   },
// ];

export default function EditPost(props) {
  const [open, setOpen] = React.useState(false);
  const [newCaption, setNewCaption] = useState(null);
  const [firstRender, setFirstRender] = useState(false);
  const ref = React.useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updatePost = () => {
    console.log(newCaption);
    axiosins
      .patch(`api/post/${props.post._id}`, {
        caption: newCaption,
      })
      .then((res) => props.updatePost(props.post._id, newCaption))
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    updatePost();
  };
  return (
    <div>
      <IconButton size="large" onClick={handleClickOpen}>
        <Edit />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <div>
            <div>
              {props.post.fileId ? (
                <>
                  <img
                    src={`http://localhost:5000/api/image/${props.post.fileId}`}
                  />
                </>
              ) : (
                <p>No pic found</p>
              )}
            </div>
          </div>
          <TextField
            inputRef={ref}
            defaultValue={props.post.caption}
            label="Caption"
            variant="filled"
            type="text"
            required
            margin="normal"
            placeholder="Add new caption"
            onChange={(e) => setNewCaption(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClick}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
