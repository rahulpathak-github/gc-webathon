import { Box, Grid, Typography, IconButton } from "@mui/material";
import CoverProfileX from "../Components/CoverProfileX";
import { useParams } from "react-router-dom";
import DynamicCoverProfile from "../Components/DynamicCoverProfile";
import axios from "../AxiosInstance";
import { useState } from "react";

const DynamicProfile = () => {
  const id = useParams();
  const [user, setUser] = useState(null);

  // fetch user with id from database and pass it in DynamicCoverProfile
  axios.get(`/api/user/${id}`).then((res) => {
    setUser(res);
  });

  return (
    <Box>
      <DynamicCoverProfile {...user} />
    </Box>
  );
};

export default DynamicProfile;
