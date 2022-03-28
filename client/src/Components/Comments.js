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
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Reply from "@mui/icons-material/Reply";
const Comments = (props) => {
  const messages = [
    {
      primary: "Brunch this week?",
      secondary:
        "I'll be in the neighbourhood this week. Let's grab a bite to eat",
      person: "/static/images/avatar/5.jpg",
    },
    {
      primary: "Birthday Gift",
      secondary: `Do you have a suggestion for a good present for John on his work
              anniversary. I am really confused & would love your thoughts on it.`,
      person: "/static/images/avatar/1.jpg",
    },
    {
      primary: "Recipe to try",
      secondary:
        "I am try out this new BBQ recipe, I think this might be amazing",
      person: "/static/images/avatar/2.jpg",
    },
  ];

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <List>
        {messages.map(({ primary, secondary, person }, index) => (
          <>
            <ListItem
              button
              key={index + person}
              secondaryAction={
                <ButtonGroup>
                  <IconButton>
                    <Delete />
                  </IconButton>
                </ButtonGroup>
              }
            >
              <ListItemIcon>
                <Reply />
              </ListItemIcon>
              <ListItemText
                primary={primary}
                secondary={secondary}
                sx={{ width: "70vw" }}
              />
            </ListItem>
            <Box sx={{ width: "70%", ml: 5 }}>
              <List>
                {messages.map(({ primary, secondary, person }, index) => (
                  <ListItem
                    button
                    key={index + person}
                    secondaryAction={
                      <ButtonGroup>
                        <IconButton>
                          <Delete />
                        </IconButton>
                      </ButtonGroup>
                    }
                  >
                    <ListItemIcon>
                      <Reply />
                    </ListItemIcon>
                    <ListItemText
                      primary={primary}
                      secondary={secondary}
                      sx={{ width: "70vw" }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </>
        ))}
      </List>
    </Box>
  );
};
export default Comments;
