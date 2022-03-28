import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Avatar from "@mui/material/Avatar";
import SearchBar from "./SearchBar";
import Search from "@mui/icons-material/Search";
import AddPost from "./AddPost";

const DrawerAppBar = (props) => {
  const [open, setOpen] = React.useState(false);
  const [discOpen, setDiscOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDiscoverDrawerToggle = () => {
    setDiscOpen(!discOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          @username
        </Typography>
      </Toolbar>
      <AddPost />
      <Divider />
      <List>
        {[
          { text: "Feed", path: "/" },
          { text: "Profile", path: "/profile" },
          { text: "Signout", path: "/logout" },
        ].map((text, index) => (
          <NavLink to={text.path}>
            <ListItem button key={index}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={text.text} sx={{ float: "right" }} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  const discDrawer = (
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
                <PersonAddAlt1Icon />
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
                    Follows You
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${props.drawerWidth}px)` },
          ml: { md: `${props.drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            edge="start"
            sx={{ display: { md: "none" }, float: "left" }}
            onClick={() => handleDrawerToggle()}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            //     sx={{ mr: { xs: 0, sm: "auto" },
            //     ml: { xs: "auto", sm: "auto" }
            // }}
          >
            Webathon
          </Typography>

          <IconButton
            edge="start"
            sx={{ display: { md: "none" }, float: "right" }}
            onClick={() => handleDiscoverDrawerToggle()}
          >
            <PersonAddAlt1Icon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* <Box sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}> */}
      <Drawer
        open={open}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        }}
        onClose={() => handleDrawerToggle()}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        open={discOpen}
        anchor="right"
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        }}
        onClose={() => handleDiscoverDrawerToggle()}
      >
        {discDrawer}
      </Drawer>

      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth + 100,
          },
        }}
      >
        {discDrawer}
      </Drawer>
      {/* </Box> */}
    </Box>
  );
};

export default DrawerAppBar;
