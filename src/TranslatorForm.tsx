import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "./translatorForm.module.css";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function TranslatorForm() {
  return (
    <>
      <IconButton>
        <ArrowBackIcon style={{ color: "white", fontSize: 40 }} />
      </IconButton>
      <div className={classes.formBody}>
        <Box
          className={classes.formWrapper}
          component="form"
          noValidate
          autoComplete="off"
        >
          <Typography variant="h4" sx={{}}>
            Add a translator
          </Typography>
          <TextField
            required
            id="standard-required"
            label="Full name"
            //   defaultValue="Hello World"
            variant="standard"
          />
          <TextField
            required
            id="standard"
            label="Email"
            //   defaultValue="Hello World"
            variant="standard"
          />
          <TextField
            id="standard-number"
            label="Years experience"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
          <TextField
            id="standard-search"
            label="add tags seperated by comma"
            type="search"
            variant="standard"
          />
        </Box>
      </div>
    </>
  );
}

export default TranslatorForm;
