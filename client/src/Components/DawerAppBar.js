import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
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
import Badge from "@mui/material/Badge";
import Notification from "@mui/icons-material/Notifications";
import FormDialog from "./FormDialog";
import Feed from "@mui/icons-material/Feed";
import Person from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import { CircularProgress, Button } from "@mui/material";
import AuthContext from "../Context/AuthContext";

const navItems = [
  { text: "Feed", path: "/", icon: <Feed />, badge: false },
  { text: "Profile", path: "/profile", icon: <Person />, badge: false },
  {
    text: "Notifications",
    path: "/notifications",
    icon: <Notification />,
    badge: true,
  },
  { text: "Signout", path: "/logout", icon: <Logout />, badge: false },
];

const DrawerAppBar = (props) => {
  const [open, setOpen] = React.useState(false);
  const [discOpen, setDiscOpen] = React.useState(false);
  const { authenticated } = React.useContext(AuthContext);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDiscoverDrawerToggle = () => {
    setDiscOpen(!discOpen);
  };

  const spinner = (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );

  let drawer = null;

  if (authenticated)
    drawer = (
      <div>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            @username
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {navItems.map((text, index) => (
            <NavLink to={text.path} onClick={handleDrawerToggle}>
              <ListItem button key={index}>
                <ListItemIcon>
                  {text.badge ? (
                    <Badge badgeContent={4} color="primary">
                      {text.icon}
                    </Badge>
                  ) : (
                    text.icon
                  )}
                </ListItemIcon>
                <ListItemText primary={text.text} sx={{ float: "right" }} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </div>
    );
  else
    drawer = (
      <Box
        sx={{
          position: "relative",
          display: "flex",
          top: "50vh",
          justifyContent: "center",
        }}
      >
        <NavLink to="/auth">
          <Button>Auth</Button>;
        </NavLink>
      </Box>
    );

  let discDrawer = null;
  if (authenticated)
    discDrawer = (
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
  else
    discDrawer = (
      <Box
        sx={{
          position: "relative",
          display: "flex",
          top: "50vh",
          justifyContent: "center",
        }}
      >
        <NavLink to="/auth">
          <Button>Auth</Button>;
        </NavLink>
      </Box>
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
