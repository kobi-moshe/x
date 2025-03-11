import { useEffect, useState } from "react";
import { fetchGmailEmailsUrl, generateBriefUrl } from "./utils";
import { useStyles } from "./styles";
import api from "../api";
import { CircularProgress, Skeleton, Typography } from "@mui/material";
import { Typewriter } from "../common";
import { EmailType, PossibleResponses } from "./types";
import { signInWithGoogle } from "../authService";
import axios from "axios";
import { EmailViewer } from "./EmailViewer";

// import ReactGA from "react-ga4";

export const UserLandingPage: React.FC = () => {
  const classes = useStyles();
  // ReactGA.send({
  //   hitType: "pageview",
  //   page: "/",
  //   title: "User Landing Page",
  // });
  const [summary, setSummary] = useState("");
  const [possibleResponses, setPossibleResponses] =
    useState<PossibleResponses>();
  const [actionItems, setActionItems] = useState<Array<string>>([]);
  const [emails, setEmails] = useState<Array<EmailType>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBriefLoading, setIsBriefLoading] = useState(false);

  const token = localStorage.getItem("token");
  const gmailToken = localStorage.getItem("gmailToken");

  const fetchGmailEmails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        fetchGmailEmailsUrl,
        {
          accessToken: gmailToken,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEmails(response.data);
    } catch (e) {
      if (e.status === 401) {
        await signInWithGoogle();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGmailEmails();
  }, []);

  const generateBrief = async (content: string) => {
    setTimeout(() => {
      window.scrollTo({
        top:
          document.body.scrollHeight || document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 200);
    try {
      setIsBriefLoading(true);
      const response = await api.post(generateBriefUrl, {
        content,
      });
      const { summary, responses, actions } = response.data;
      console.log(responses);
      setSummary(summary);
      setPossibleResponses(responses);
      setActionItems(actions);
    } finally {
      setIsBriefLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={classes.loadingWrapper}>
        <CircularProgress size={50} />
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      {emails.map((email) => (
        <EmailViewer key={email.id} {...email} onClick={generateBrief} />
      ))}
      {isBriefLoading ? (
        <>
          <Skeleton height={50} width="50%" className={classes.skeleton} />
          <Skeleton height={200} className={classes.skeleton} />
          <Skeleton height={50} width="50%" className={classes.skeleton} />
          <Skeleton height={200} width="85%" className={classes.skeleton} />
        </>
      ) : (
        <div className={classes.outputWrapper}>
          {summary && (
            <>
              <Typography variant="h6" className={classes.title}>
                Summary
              </Typography>
              <Typewriter text={summary} />
            </>
          )}
          {possibleResponses && (
            <>
              <Typography variant="h6" className={classes.title}>
                Possible Responses
              </Typography>
              <Typography className={classes.title}>Positive:</Typography>
              <Typewriter text={possibleResponses.positive} />
              <Typography className={classes.title}>Neutral:</Typography>
              <Typewriter text={possibleResponses.neutral} />
              <Typography className={classes.title}>Negative:</Typography>
              <Typewriter text={possibleResponses.negative} />
            </>
          )}
          {actionItems.length > 0 && (
            <>
              <Typography variant="h6" className={classes.title}>
                Action Items
              </Typography>
              {actionItems.map((action, index) => (
                <Typewriter key={index} text={`${index + 1}. ${action}`} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};
