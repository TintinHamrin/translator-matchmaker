import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

function TranslatorPage() {
  const { lastName } = useParams();

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

  return <div>TranslatorPage {lastName}.</div>;
}

export default TranslatorPage;
