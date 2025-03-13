import { useEffect, useState } from "react";
import { fetchGmailEmailsUrl, generateBriefUrl, userStatusUrl } from "./utils";
import { useStyles } from "./styles";
import api from "../api";
import { CircularProgress, Skeleton, Typography } from "@mui/material";
import { BriefData, Typewriter } from "../common";
import { EmailType } from "./types";
import { signInWithGoogle } from "../authService";
import axios, { AxiosError } from "axios";
import { EmailViewer } from "./EmailViewer";

// import ReactGA from "react-ga4";

export const UserLandingPage: React.FC = () => {
  const classes = useStyles();
  // ReactGA.send({
  //   hitType: "pageview",
  //   page: "/",
  //   title: "User Landing Page",
  // });
  const [briefs, setBriefs] = useState<BriefData>();
  const [emails, setEmails] = useState<Array<EmailType>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBriefLoading, setIsBriefLoading] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  const token = localStorage.getItem("token");
  const gmailToken = localStorage.getItem("gmailToken");

  const fetchInitData = async () => {
    try {
      setIsLoading(true);
      const [userStatusResponse, emailsResponse] = await Promise.all([
        api.get(userStatusUrl),
        axios.post(
          fetchGmailEmailsUrl,
          {
            accessToken: gmailToken,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        ),
      ]);
      setIsPremiumUser(userStatusResponse.data.isPremium);
      setEmails(emailsResponse.data);
    } catch (e) {
      if ((e as AxiosError).status === 401) {
        await signInWithGoogle();
        window.location.reload();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitData();
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
      const response = await api.post<BriefData>(generateBriefUrl, {
        content,
      });
      setBriefs(response.data);
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
        <EmailViewer
          key={email.id}
          {...email}
          isPremiumUser={isPremiumUser}
          onClick={generateBrief}
        />
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
          {briefs?.summary && (
            <>
              <Typography variant="h6" className={classes.title}>
                Summary
              </Typography>
              <Typewriter text={briefs.summary} />
            </>
          )}
          {briefs?.responses && (
            <>
              <Typography variant="h6" className={classes.title}>
                Possible Responses
              </Typography>
              <Typography className={classes.title}>Positive:</Typography>
              <Typewriter text={briefs.responses.positive} />
              <Typography className={classes.title}>Neutral:</Typography>
              <Typewriter text={briefs.responses.neutral} />
              <Typography className={classes.title}>Negative:</Typography>
              <Typewriter text={briefs.responses.negative} />
            </>
          )}
          {briefs?.actions && (
            <>
              <Typography variant="h6" className={classes.title}>
                Action Items
              </Typography>
              {briefs.actions.map((action, index) => (
                <Typewriter key={index} text={`${index + 1}. ${action}`} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};
