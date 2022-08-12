import React, { ChangeEvent, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "./translatorForm.module.css";
import { Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function TranslatorForm() {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const languageRef = useRef<HTMLInputElement>();
  const experienceRef = useRef<HTMLInputElement>();
  const tagsRef = useRef<HTMLInputElement>();
  const certifiedRef = useRef<HTMLInputElement>();
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [language, setLanguage] = useState("");
  // const [experience, setExperience] = useState("");
  // const [tags, setTags] = useState("");

  const backHandler = () => {
    navigate("/");
  };

  function save() {
    console.log("saving");
    const data = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      language: languageRef.current?.value,
      experience: experienceRef.current?.value,
      tags: tagsRef.current?.value,
      certifiedRef: certifiedRef.current?.value,
    };
    console.log("saved", data);
  }

  return (
    <>
      <IconButton onClick={backHandler}>
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
            inputRef={nameRef}
            //onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            id="standard-required"
            label="Language"
            //   defaultValue="Hello World"
            variant="standard"
            inputRef={languageRef}
            //onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            id="standard"
            label="Email"
            //   defaultValue="Hello World"
            variant="standard"
            inputRef={emailRef}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="standard-number"
            label="Years experience"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            inputRef={experienceRef}
            // onChange={(e) => onExperienceChange(e)}
          />
          <TextField
            id="standard-search"
            label="add tags seperated by comma"
            type="search"
            variant="standard"
            inputRef={tagsRef}
            // onChange={(e) => onTagsChange(e)}
          />
          <TextField
            id="standard-search"
            label="certified? y/n"
            type="text"
            variant="standard"
            inputRef={certifiedRef}
            // onChange={(e) => onTagsChange(e)}
          />
          <Button onClick={save}>Submit</Button>
          <Button>Reset All Fields</Button>
        </Box>
      </div>
    </>
  );
}

export default TranslatorForm;
