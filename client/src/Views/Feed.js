import {
  Box,
  Grid,
  Typography,
  IconButton,
  Stack,
  Container,
} from "@mui/material";
import Post from "../Components/Post";
import { useState, useEffect, useContext } from "react";
import axios from "../AxiosInstance";
import FormDialog from "../Components/FormDialog";
import { Fab } from "@mui/material";
import Add from "@mui/icons-material/Add";
import AuthContext from "../Context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
const drawerWidth = 250;
const Feed = (props) => {
  const [addPostModalOpen, setAddPostModalOpen] = useState(false);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authenticated, currentUser } = useContext(AuthContext);

  const openAddPostModal = () => {
    setAddPostModalOpen(true);
  };
  const closeAddPostModal = () => {
    setAddPostModalOpen(false);
  };

  const addPost = (newPost) => {
    setLoading(true);
    newPost.data.data.post.author = {
      ...newPost.data.data.post.author,
      handle: currentUser.handle,
    };
    const currentPosts = [...posts];
    const updatedPosts = [newPost.data.data.post, ...currentPosts];
    setPosts(updatedPosts);
    setLoading(false);
  };

  const updatePost = (postId, newCaption) => {
    setLoading(true);
    const oldPosts = [...posts];
    oldPosts.find((el) => el._id == postId).caption = newCaption;
    setPosts(oldPosts);
    setLoading(false);
  };

  const deletePost = (postId) => {
    setLoading(true);
    const oldPosts = [...posts];
    const updatedPosts = oldPosts.filter((el) => el._id != postId);
    setPosts(updatedPosts);
    setLoading(false);
  };

  const getPosts = () => {
    axios
      .get(`api/post/`)
      .then((res) => {
        // console.log(res.data.data.posts);
        setPosts([...res.data.data.posts]);
        setLoading(false);
      })
      .catch((err) => {
        window.alert(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  let userPosts = posts;
  if (props.userId && loading === false)
    userPosts = posts.filter((el) => el._id == props.userId);

  // let postsStack = null;
  // if (loading) {
  //   return null;
  // }

  return (
    // <Container
    //   sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    // >
    <Container fluid disableGutters>
      <Fab
        disabled={!authenticated}
        sx={{
          position: "fixed",
          bottom: 16,
          right: { md: drawerWidth + 116, xs: 16 },
        }}
        color="primary"
        onClick={openAddPostModal}
      >
        <Add />
      </Fab>
      <FormDialog
        open={addPostModalOpen}
        handleClose={closeAddPostModal}
        addPost={addPost}
      />
      <Box
        width={"95%"}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginX: "auto",
        }}
      >
        <Stack marginTop={"30px"} width={"100%"}>
          {loading === false ? (
            userPosts.map((post, idx) => (
              <Post
                post={post}
                key={idx}
                updatePost={updatePost}
                deletePost={deletePost}
              />
            ))
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}
        </Stack>
      </Box>
    </Container>

    // </Container>
  );
};

export default Feed;
