import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//import { Prisma, TranslatorModel } from "@prisma/client";
import { TranslatorModel } from "../server/prisma/generated/type-graphql";

function TranslatorPage() {
  //let t: Prisma.TranslatorModelCreateInput[];
  const navigate = useNavigate();
  const { lastName } = useParams();

  const backHandler = () => {
    navigate("/");
  };

  const GET_TRANSLATORS = gql`
    query translators {
      translators {
        id
        name
        email
        language
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_TRANSLATORS);

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>"Loading..."</div>;
  if (data) {
    const t: TranslatorModel[] = data.translators;
    console.log("data", t[0].email);
  }

  return (
    <>
      <IconButton onClick={backHandler}>
        <ArrowBackIcon style={{ color: "white", fontSize: 40 }} />
      </IconButton>
    </>
  );
}

export default TranslatorPage;
