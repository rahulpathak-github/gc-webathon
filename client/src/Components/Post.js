import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "100%", marginBottom: "20px" }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>KG</Avatar>}
        title="Kushagra Gupta"
        subheader="March 27, 2022"
      />
      <CardMedia
        component="img"
        height="auto"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc86ZSEXqa-k9grHSfSKmSNvZk0rTooiwCHw&usqp=CAU"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Caption
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
    </Card>
  );
}
