import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function TranslatorPage() {
  const navigate = useNavigate();
  const { lastName } = useParams();

  const backHandler = () => {
    navigate("/");
  };

  const GET_TRANSLATORS = gql`
    query translators {
      translators {
        name
        email
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_TRANSLATORS);

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>"Loading..."</div>;
  if (data) {
    console.log(data);
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
