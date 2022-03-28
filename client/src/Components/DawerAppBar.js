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
// import DeleteIcon from "@mui/icons-material/Delete";

const DrawerAppBar = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          @username
        </Typography>
      </Toolbar>
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

      {/* </Box> */}
    </Box>
  );
};

export default DrawerAppBar;
