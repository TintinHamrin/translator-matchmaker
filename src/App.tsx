import { Box, Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import classes from "./App.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

type tr = {
  fn: string;
  lastName: string;
  data: any;
};

function App() {
  const navigate = useNavigate();
  const [translators, setTranslators] = useState<tr[]>([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/users?limit=10").then((response) => {
      console.log("translators", response);
      setTranslators(response.data.users);
    });
  }, []);

  const pushHandler = (path: string) => {
    console.log("click");
    navigate(`/translator/`);
  };

  return (
    <div>
      <Box className={classes.box}>
        <div className={classes.title}>
          <Card onClick={() => pushHandler("/add-translator")}>
            Add a translator!
          </Card>
        </div>
        <div className={classes.profilesWrapper}>
          {translators.length > 0 &&
            translators.map((t) => (
              <Card className={classes.profileBoxes}>
                <Link to={`/translator/${t.lastName}`} state={t}>
                  <CardContent>{t.lastName}</CardContent>
                </Link>
              </Card>
            ))}
        </div>
      </Box>
    </div>
  );
}

export default App;
