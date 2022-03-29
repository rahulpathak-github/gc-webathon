import { Box, CircularProgress } from "@mui/material";
const Spinner = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
