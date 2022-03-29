import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function FreeSolo() {
  return (
    <Autocomplete
      freeSolo
      fullWidth
      disableClearable
      options={users.map((option) => option)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Find User"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}

const users = ["Rahul Pathak", "Anand Amar", "Kushagra Gupta"];
