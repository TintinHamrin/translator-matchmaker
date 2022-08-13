import React, { ChangeEvent, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "./translatorForm.module.css";
import { Button, dividerClasses, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Prisma, TranslatorModel } from "@prisma/client";
import { TranslatorModelCreateInput } from "../server/prisma/generated/type-graphql";

function TranslatorForm() {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const languageRef = useRef<HTMLInputElement>();
  const experienceRef = useRef<HTMLInputElement>();
  const tagsRef = useRef<HTMLInputElement>();
  const certifiedRef = useRef<HTMLInputElement>();
  //let translatorData: TranslatorModel; //TODO type
  let translatorData: TranslatorModelCreateInput; //TODO type

  const backHandler = () => {
    navigate("/");
  };

  const ADD_TRANSLATOR = gql`
    mutation CreateOneTranslatorModel($data: TranslatorModelCreateInput!) {
      createOneTranslatorModel(data: $data) {
        email
        name
        language
        experience
        certified
      }
    }
  `;

  const [addTodo, { data, loading, error }] = useMutation(ADD_TRANSLATOR);

  if (loading) return <div>"Submitting..."</div>;
  if (error) return <div>`Submission error! ${error.message}`</div>;

  function save() {
    console.log("saving");
    translatorData = {
      name: nameRef.current!.value,
      email: emailRef.current!.value,
      language: languageRef.current!.value,
      experience: parseInt(experienceRef.current!.value),
      // tags: tagsRef.current?.value,
      certified: !!certifiedRef.current?.value,
    };

    addTodo({ variables: { data: translatorData } });
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
            variant="standard"
            inputRef={nameRef}
          />
          <TextField
            required
            id="standard-required"
            label="Language"
            variant="standard"
            inputRef={languageRef}
          />
          <TextField
            required
            id="standard"
            label="Email"
            variant="standard"
            inputRef={emailRef}
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
          />
          <TextField
            id="standard-search"
            label="add tags seperated by comma"
            type="search"
            variant="standard"
            inputRef={tagsRef}
          />
          <TextField
            id="standard-search"
            label="certified? y/n"
            type="text"
            variant="standard"
            inputRef={certifiedRef}
          />
          <Button onClick={save}>Submit</Button>
          <Button>Reset All Fields</Button>
        </Box>
      </div>
    </>
  );
}

export default TranslatorForm;
