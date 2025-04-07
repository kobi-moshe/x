import { useEffect, useMemo, useState } from "react";
import { CircularProgress } from "@mui/material";
import api from "../api";
import { useStyles } from "./styles";
import { BriefViewer } from "../BriefViewer";
import { BriefData, briefsUrl, Typewriter } from "../common";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// import ReactGA from "react-ga4";

export const BriefsBoard: React.FC = () => {
  const classes = useStyles();
  // ReactGA.send({
  //   hitType: "pageview",
  //   page: "/history",
  //   title: "History Page",
  // });
  const [briefs, setBriefs] = useState<Array<BriefData>>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchInitData = async () => {
    try {
      const response = await api.get(briefsUrl);
      setBriefs(response.data);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitData();
  }, []);

  const Content = useMemo(() => {
    if (isLoading) {
      return (
        <div className={classes.centerWrapper}>
          <CircularProgress size={50} />
        </div>
      );
    }
    if (briefs?.length === 0) {
      return (
        <div className={classes.centerWrapper}>
          <Typewriter
            text="You have no saved briefs yet..."
            delay={20}
            wrapperClassName={classes.noItemsText}
          />
        </div>
      );
    }
    return (
      <div className={classes.wrapper}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry>
            {briefs?.map((brief, index) => (
              <BriefViewer key={index} {...brief} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    );
  }, [
    briefs,
    classes.centerWrapper,
    classes.noItemsText,
    classes.wrapper,
    isLoading,
  ]);

  return Content;
};
