import { Box, Button, Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import classes from "./App.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { TranslatorModel } from "../server/prisma/generated/type-graphql";

function App() {
  let translators: TranslatorModel[] = [];
  const navigate = useNavigate();
  //const [translators, setTranslators] = useState<tr[]>([]);

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
    console.log(data.translators);
    translators = data.translators;
  }

  const pushHandler = (path: string) => {
    console.log("click");
    navigate(`${path}`);
  };

  return (
    <div>
      <Box className={classes.box}>
        <div className={classes.title}>
          <Button onClick={() => pushHandler("/translator-form")}>
            Add a translator!
          </Button>
        </div>
        <div className={classes.profilesWrapper}>
          {translators.length > 0 &&
            translators.map((t) => (
              <Card className={classes.profileBoxes}>
                <Link to={`/translator/${t.name}`}>
                  <CardContent>{t.name}</CardContent>
                </Link>
              </Card>
            ))}
        </div>
      </Box>
    </div>
  );
}

export default App;
