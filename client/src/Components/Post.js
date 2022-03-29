import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import { ButtonGroup } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import Comments from "./Comments";
import EditPost from "./EditPost";
import { useEffect, useState } from "react";
import DeletePost from "./DeletePost";
import { TextField, Box } from "@mui/material";
import EnterIcon from "@mui/icons-material/Send";
import AuthContext from "../Context/AuthContext";

export default function Post(props) {
  const [expanded, setExpanded] = React.useState(false);
  const { authenticated, currentUser } = React.useContext(AuthContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "100%", marginBottom: "20px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>
            {props.post.author.handle[0]}
          </Avatar>
        }
        action={
          <ButtonGroup>
            <EditPost post={props.post} updatePost={props.updatePost} />
            <DeletePost post={props.post} deletePost={props.deletePost} />
          </ButtonGroup>
        }
        title={props.post.author.handle}
        subheader={props.post.createdAt}
      />
      <CardMedia
        component="img"
        height="auto"
        image={`http://localhost:5000/api/image/${props.post.fileId}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.post.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton onClick={handleExpandClick} sx={{ ml: "auto" }}>
          <CommentIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Comments postId={props.post._id} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
