import { useEffect, useState } from "react";
import { historyUrl } from "./utils";
import { CircularProgress } from "@mui/material";
import { Header } from "../Header";
import api from "../api";
import { useStyles } from "./styles";
import { BriefViewer } from "../BriefViewer";
import { BriefData } from "../common";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// import ReactGA from "react-ga4";

export const HistoryPage: React.FC = () => {
  const classes = useStyles();
  // ReactGA.send({
  //   hitType: "pageview",
  //   page: "/history",
  //   title: "History Page",
  // });
  const [briefs, setBriefs] = useState<Array<BriefData>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInitData = async () => {
    try {
      const response = await api.get(historyUrl);
      setBriefs(response.data);
      setIsLoading(false);
    } finally {
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
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry>
              {briefs.map((brief, index) => (
                <BriefViewer key={index} {...brief} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </div>
    </>
  );
};
