import { useEffect, useState } from "react";
import { historyUrl } from "./utils";
import { CircularProgress } from "@mui/material";
import { Header } from "../Header";
import { PromptsViewer } from "../PromptsViewer";
import api from "../api";
import { useStyles } from "./styles";
import ReactGA from "react-ga4";

export const HistoryPage: React.FC = () => {
  const classes = useStyles();
  ReactGA.send({
    hitType: "pageview",
    page: "/history",
    title: "History Page",
  });
  const [prompts, setPrompts] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInitData = async () => {
    try {
      const response = await api.get(historyUrl);
      setPrompts(response.data);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitData();
  }, []);

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        {isLoading ? (
          <div className={classes.loaderWrapper}>
            <CircularProgress />
          </div>
        ) : (
          <PromptsViewer
            generatedPrompts={prompts}
            setGeneratedPrompts={setPrompts}
          />
        )}
      </div>
    </>
  );
};
