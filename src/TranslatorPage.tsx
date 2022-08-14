import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//import { Prisma, TranslatorModel } from "@prisma/client";
import { TranslatorModel } from "../server/prisma/generated/type-graphql";

function TranslatorPage() {
  //let t: Prisma.TranslatorModelCreateInput[];
  const navigate = useNavigate();
  const { lastName } = useParams();
  let translator: TranslatorModel = {
    id: 0,
    name: "",
    email: "",
    language: "",
    experience: 0,
    certified: false,
  };

  const backHandler = () => {
    navigate("/");
  };

  const GET_TRANSLATOR = gql`
    query translator {
      translator {
        id
        name
        email
        language
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_TRANSLATOR);

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>"Loading..."</div>;
  if (data) {
    translator = data.translators;
    console.log("data", translator);
  }

  return (
    <>
      <IconButton onClick={backHandler}>
        <ArrowBackIcon style={{ color: "white", fontSize: 40 }} />
      </IconButton>
      <Card>
        <CardContent>{translator.email}</CardContent>
      </Card>
    </>
  );
}

export default TranslatorPage;
