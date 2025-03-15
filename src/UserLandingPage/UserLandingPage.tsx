import { useEffect, useRef, useState } from "react";
import { fetchGmailEmailsUrl, generateBriefUrl, userStatusUrl } from "./utils";
import { useStyles } from "./styles";
import api from "../api";
import {
  CircularProgress,
  InputAdornment,
  Skeleton,
  TextField,
} from "@mui/material";
import { BriefData } from "../common";
import { GenerateBriefServerData, EmailType } from "./types";
import { signInWithGoogle } from "../authService";
import axios, { AxiosError } from "axios";
import { EmailViewer } from "./EmailViewer";
import { Search } from "@mui/icons-material";
import { BriefOutput } from "./BriefOutput";

// import ReactGA from "react-ga4";

export const UserLandingPage: React.FC = () => {
  const classes = useStyles();
  // ReactGA.send({
  //   hitType: "pageview",
  //   page: "/",
  //   title: "User Landing Page",
  // });
  const [brief, setBrief] = useState<BriefData>();
  const [filteredEmails, setFilteredEmails] = useState<Array<EmailType>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBriefLoading, setIsBriefLoading] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  const emailsRef = useRef<Array<EmailType>>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

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
      emailsRef.current = emailsResponse.data;
      setFilteredEmails(emailsResponse.data);
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

  const generateBrief = async (data: GenerateBriefServerData) => {
    setTimeout(() => {
      window.scrollTo({
        top:
          document.body.scrollHeight || document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 200);
    try {
      setIsBriefLoading(true);
      const response = await api.post<BriefData>(generateBriefUrl, data);
      setBrief(response.data);
    } finally {
      setIsBriefLoading(false);
    }
  };

  const onSearchChange = () => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    if (searchRef.current) {
      const { value } = searchRef.current;
      debounceTimeout.current = setTimeout(() => {
        const relevantEmails = emailsRef.current.filter((email) =>
          email.subject.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredEmails(relevantEmails);
      }, 300);
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
      <div className={classes.searchInputWrapper}>
        <TextField
          inputRef={searchRef}
          placeholder="Subject..."
          onChange={onSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{ color: "#52BD95" }} />
              </InputAdornment>
            ),
          }}
          className={classes.searchInput}
        />
      </div>
      {filteredEmails.map((email) => (
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
        brief && <BriefOutput {...brief} />
      )}
    </div>
  );
};
