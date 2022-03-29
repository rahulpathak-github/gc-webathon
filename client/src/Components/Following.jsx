import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import { NavLink } from "react-router-dom";
// import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Avatar from "@mui/material/Avatar";
import SearchBar from "./SearchBar";
import Search from "@mui/icons-material/Search";
// import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import BookmarkIcon from "@mui/icons-material/Bookmark";

function Following() {
  return (
    <div>
      <Toolbar>
        <Search sx={{ paddingX: 2 }} />
        <SearchBar />
      </Toolbar>
      <Divider />
      <List>
        {["Rahul Pathak", "Anand Amar", "Kushagra Gupta"].map((item, idx) => (
          <ListItem
            key={idx}
            button
            secondaryAction={
              <IconButton>
                <BookmarkIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <Avatar
                src="https://imageio.forbes.com/specials-images/imageserve/5faad4255239c9448d6c7bcd/Best-Animal-Photos-Contest--Close-Up-Of-baby-monkey/960x0.jpg?fit=bounds&format=jpg&width=960"
                sx={{ width: 50, height: 50 }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline", fontSize: "18px" }}
                    component="span"
                    //   variant="body1"
                  >
                    {item}
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline", fontSize: "6" }}
                    component="span"
                    variant="body2"
                  >
                    Followed By You
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Following;
