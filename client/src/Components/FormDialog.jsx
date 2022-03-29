import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import axiosins from "../AxiosInstance";

export default function FormDialog(props) {
  const [file, setFile] = useState(null);
  const [inputContainsFile, setInputContainsFile] = useState(false);
  const [currentlyUploading, setCurrentlyUploading] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [progress, setProgress] = useState(null);
  const [caption, setCaption] = useState(null);

  const handleFile = (event) => {
    setFile(event.target.files[0]);
    setInputContainsFile(true);
  };

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image", file, file.name);
    axios
      .post(`http://localhost:5000/api/image/upload`, fd, {
        onUploadProgress: (progressEvent) => {
          setProgress((progressEvent.loaded / progressEvent.total) * 100);
          console.log(
            "upload progress: ",
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
        },
      })
      .then(({ data }) => {
        setImageId(data);
        setFile(null);
        setInputContainsFile(false);
        setCurrentlyUploading(false);
      })
      .then(() => {
        axiosins
          .post(`api/post/`, {
            fileId: imageId,
            caption,
          })
          .then((res) => {
            // console.log(res);
            props.handleClose();
            props.addPost(res);
          });
        // .catch((err) => window.alert(err));
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          const errMsg = err.response.data;
          if (errMsg) {
            console.log(errMsg);
            alert(errMsg);
          }
        } else if (err.response.status === 500) {
          console.log("db error");
          alert("db error");
        } else {
          console.log("other error: ", err);
        }
        setInputContainsFile(false);
        setCurrentlyUploading(false);
      });
  };

  const handleClick = async () => {
    if (inputContainsFile) {
      setCurrentlyUploading(true);
      fileUploadHandler();
    }
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogContent>
          <div>
            <div>
              {imageId ? (
                <>
                  <img src={`http://localhost:5000/api/image/${imageId}`} />
                </>
              ) : (
                <p className="nopic">No pic uploaded yet</p>
              )}
            </div>
            <div>
              {currentlyUploading ? null : (
                <>
                  <input
                    className="file-input"
                    onChange={handleFile}
                    type="file"
                    name="file"
                    id="file"
                  />
                </>
              )}
            </div>
          </div>
          <TextField
            label="Caption"
            variant="filled"
            type="text"
            required
            margin="normal"
            onChange={(e) => setCaption(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button
            //  type="submit"
            // onClick={handleClose}
            onClick={handleClick}
          >
            Submit
          </Button>
        </DialogActions>
        {/* </form> */}
      </Dialog>
    </div>
  );
}
