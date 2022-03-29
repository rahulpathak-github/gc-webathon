import {
  Box,
  CssBaseline,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  ButtonGroup,
  ListItemIcon,
  TextField,
  getTableSortLabelUtilityClass,
  CircularProgress,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Reply from "@mui/icons-material/Reply";
import axiosins from "../AxiosInstance";
import { useEffect, useState, useContext } from "react";
import EnterIcon from "@mui/icons-material/Send";
import AuthContext from "../Context/AuthContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import { DialogTitle } from "@mui/material";

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentValue, setCommentValue] = useState("");
  const [replyValue, setReplyValue] = useState("");
  const [open, setOpen] = useState(false);
  const [openDeleteComment, setOpenDeleteComment] = useState(false);
  const [openDeleteReply, setOpenDeleteReply] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [parentIdx, setParentIdx] = useState(null);
  const { authenticated, currentUser } = useContext(AuthContext);

  const handleClickOpen = (commentId) => {
    setOpen(true);
    setCommentId(commentId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDeleteComment = (commentId) => {
    setOpenDeleteComment(true);
    setCommentId(commentId);
  };

  const handleCloseDeleteComment = () => {
    setOpenDeleteComment(false);
  };

  const deleteComment = () => {
    const commentid = commentId;
    setLoading(true);
    axiosins
      .delete(`api/comment/${commentid}`)
      .then((res) => {
        console.log(res);
        const oldComments = [...comments];
        const updatedComments = oldComments.filter((el) => el._id != commentid);
        setComments(updatedComments);
        setLoading(false);
        handleCloseDeleteComment();
      })
      .catch((err) => console.log(err));
  };

  const handleClickOpenDeleteReply = (commentId, idx) => {
    setOpenDeleteReply(true);
    setCommentId(commentId);
    setParentIdx(idx);
  };

  const handleCloseDeleteReply = () => {
    setOpenDeleteReply(false);
  };

  const deleteReply = () => {
    const commentid = commentId;
    const parentidx = parentIdx;
    setLoading(true);
    axiosins
      .delete(`api/comment/${commentid}`)
      .then((res) => {
        console.log(res);
        const oldComments = [...comments];
        const newReplies = oldComments[parentidx].replies.filter(
          (el) => el._id != commentid
        );
        oldComments[parentidx].replies = [...newReplies];
        setComments(oldComments);
        setLoading(false);
        handleCloseDeleteReply();
      })
      .catch((err) => console.log(err));
  };
  // const { authenticated, currentUser } = useContext(AuthContext);

  const getComments = () => {
    axiosins
      .get(`api/post/${props.postId}/comments`)
      .then((res) => {
        console.log(res.data.data.comments);
        setComments(res.data.data.comments);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const addComment = () => {
    setLoading(true);
    axiosins
      .post(`api/comment/`, {
        body: commentValue,
        postId: props.postId,
      })
      .then((res) => {
        console.log(res);
        const oldComments = [...comments];
        const updatedComments = [res.data.data.comment, ...oldComments];
        setComments(updatedComments);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const addReply = () => {
    // console.log(commentId);
    setLoading(true);
    const commentid = commentId;
    axiosins
      .post(`api/comment/`, {
        body: replyValue,
        postId: props.postId,
        parCommentId: commentid,
      })
      .then((res) => {
        // console.log(res);
        const oldComments = [...comments];
        oldComments[
          oldComments.findIndex((el) => el._id == commentid)
        ].replies.push(res.data.data.comment);
        // const updatedComments = [res.data.data.comment, ...oldComments];
        setComments(oldComments);
        setLoading(false);
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getComments();
  }, []);

  const replyModal = (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <TextField
          label="Reply"
          variant="filled"
          type="text"
          required
          margin="normal"
          placeholder="Reply"
          onChange={(e) => setReplyValue(e.target.value)}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={addReply}>Submit</Button>
      </DialogActions>
    </Dialog>
  );

  const deleteCommentModal = (
    <Dialog open={openDeleteComment} onClose={handleCloseDeleteComment}>
      <DialogTitle>Confirm Delete?</DialogTitle>
      <DialogActions>
        <Button onClick={handleCloseDeleteComment}>NO</Button>
        <Button onClick={deleteComment}>YES</Button>
      </DialogActions>
    </Dialog>
  );

  const deleteReplyModal = (
    <Dialog open={openDeleteReply} onClose={handleCloseDeleteReply}>
      <DialogTitle>Confirm Delete?</DialogTitle>
      <DialogActions>
        <Button onClick={handleCloseDeleteReply}>NO</Button>
        <Button onClick={deleteReply}>YES</Button>
      </DialogActions>
    </Dialog>
  );

  const spinner = (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      {replyModal}
      {deleteCommentModal}
      {deleteReplyModal}

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          label="Enter Comment"
          sx={{ width: "90%" }}
          onChange={(e) => setCommentValue(e.target.value)}
          disabled={!authenticated}
        />
        <IconButton onClick={addComment} disabled={!authenticated}>
          <EnterIcon sx={{ my: "auto" }} />
        </IconButton>
      </Box>
      <List>
        {loading === false && comments.length != 0
          ? comments.map((comment, index) => (
              <>
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton
                      disabled={
                        !authenticated || comment.author.id != currentUser._id
                      }
                    >
                      <Delete
                        onClick={() =>
                          handleClickOpenDeleteComment(comment._id)
                        }
                      />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <IconButton
                      onClick={() => handleClickOpen(comment._id)}
                      disabled={!authenticated}
                    >
                      <Reply />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText
                    primary={comment.author.handle}
                    secondary={comment.body}
                    sx={{ width: "70vw" }}
                  />
                </ListItem>
                <Box sx={{ width: "70%", ml: 10 }}>
                  <List>
                    {loading === false &&
                    comments.length != 0 &&
                    comment.replies.length != 0
                      ? comment.replies.map((reply, idx) => (
                          <ListItem
                            key={idx}
                            secondaryAction={
                              <IconButton
                                onClick={() =>
                                  handleClickOpenDeleteReply(reply.id, index)
                                }
                                disabled={
                                  !authenticated ||
                                  reply.author.id != currentUser._id
                                }
                              >
                                <Delete />
                              </IconButton>
                            }
                          >
                            <ListItemText
                              primary={reply.author.handle}
                              secondary={reply.body}
                              sx={{ width: "70vw" }}
                            />
                          </ListItem>
                        ))
                      : null}
                  </List>
                </Box>
              </>
            ))
          : spinner}
      </List>
    </Box>
  );
};
export default Comments;
