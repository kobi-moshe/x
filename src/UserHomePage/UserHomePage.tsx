import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  //   List,
  //   ListItem,
  //   ListItemIcon,
  //   ListItemText,
  Typography,
  TextField,
  IconButton,
  Box,
  Paper,
  //   Checkbox,
  ThemeProvider,
  CssBaseline,
  //   Tooltip,
  CircularProgress,
  Button,
  Dialog,
} from "@mui/material";
import {
  //   Inbox as InboxIcon,
  //   Send as SendIcon,
  //   Drafts as DraftsIcon,
  //   Star as StarIcon,
  //   Delete as DeleteIcon,
  Search as SearchIcon,
  //   Menu as MenuIcon,
  //   Refresh as RefreshIcon,
  //   MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import api from "../api";
import DOMPurify from "dompurify";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../authService";
import { darkTheme, useStyles } from "./styles";
import { EmailViewer } from "./EmailViewer";
import { BriefData } from "../common";
import { briefsUrl } from "../HistoryPage/utils";
import { BriefViewer } from "../BriefViewer";
import { EmailType } from "./types";
import { gmailEmailsUrl } from "./utils";

export const UserHomePage: React.FC = () => {
  const classes = useStyles();
  const [selectedEmail, setSelectedEmail] = useState<EmailType | null>();
  //   const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  //   const [selectedEmails, setSelectedEmails] = useState<Array<string>>([]);
  const [filteredEmails, setFilteredEmails] = useState<Array<EmailType>>([]);
  const [briefs, setBriefs] = useState<Array<BriefData>>([]);
  const [selectedBrief, setSelectedBrief] = useState<BriefData | null>();
  //   const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sanitizedHTML = useRef("");
  const emailsRef = useRef<Array<EmailType>>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  //   const isCheckboxAllSelected = selectedEmails.length === filteredEmails.length;
  const briefsIds = briefs.map((brief) => brief.id);

  const fetchInitData = async () => {
    try {
      setIsLoading(true);
      const [emailsResponse, briefsResponse] = await Promise.all([
        // api.get(userStatusUrl),
        api.post(gmailEmailsUrl),
        api.get(briefsUrl),
      ]);
      //   setIsPremiumUser(userStatusResponse.data.isPremium);
      emailsRef.current = emailsResponse.data;
      setBriefs(briefsResponse.data);
      setFilteredEmails(emailsResponse.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitData();
  }, []);

  const handleEmailClick = (email: EmailType) => {
    setSelectedEmail(email);
    sanitizedHTML.current = DOMPurify.sanitize(email.htmlContent, {
      ADD_TAGS: ["style"],
      ADD_ATTR: ["target"],
    });
  };

  const handleCloseEmail = () => {
    setSelectedEmail(null);
  };

  //   const toggleMenu = () => {
  //     setIsMenuCollapsed(!isMenuCollapsed);
  //   };

  //   const handleCheckboxChange = (emailId: string) => {
  //     setSelectedEmails((prev) =>
  //       prev.includes(emailId)
  //         ? prev.filter((id) => id !== emailId)
  //         : [...prev, emailId]
  //     );
  //   };

  //   const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     if (event.target.checked) {
  //       const selected = filteredEmails.map((email) => email.id);
  //       setSelectedEmails(selected);
  //     } else {
  //       setSelectedEmails([]);
  //     }
  //   };

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
  const onShowBriefClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    emailId: string
  ) => {
    e.stopPropagation();
    const relevantBrief = briefs.find((brief) => brief.id === emailId);
    if (relevantBrief) {
      setSelectedBrief(relevantBrief);
    }
  };

  const onGenerateBriefSuccess = async () => {
    const briefsResponse = await api.get(briefsUrl);
    setBriefs(briefsResponse.data);
  };

  const handleLogout = async () => {
    await logout();
  };

  const navigateToHome = () => {
    navigate("/");
  };

  //   const menuItems = [
  //     { text: "Inbox", icon: <InboxIcon /> },
  //     { text: "Sent", icon: <SendIcon /> },
  //     { text: "Drafts", icon: <DraftsIcon /> },
  //     { text: "Starred", icon: <StarIcon /> },
  //     { text: "Trash", icon: <DeleteIcon /> },
  //   ];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <AppBar position="fixed" style={{ backgroundImage: "none" }}>
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <div onClick={navigateToHome} className={classes.image} />
            <TextField
              inputRef={searchRef}
              variant="outlined"
              size="small"
              placeholder="Search mail"
              onChange={onSearchChange}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
              className={classes.searchbox}
            />
            <div className={classes.linksWrapper}>
              <Link to="/briefs" className={classes.link}>
                Briefs
              </Link>
              <Link to="/" onClick={handleLogout} className={classes.link}>
                Logout
              </Link>
            </div>
          </Toolbar>
        </AppBar>
        {/* <div
          style={{
            width: isMenuCollapsed ? 60 : 200,
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            transition: "width 0.5s",
            overflowX: "hidden",
          }}
        >
          <Toolbar />
          <List className={classes.navLinksWrapper}>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                style={{
                  justifyContent: "center",
                }}
              >
                <Tooltip
                  title={isMenuCollapsed ? item.text : ""}
                  placement="right"
                >
                  <ListItemIcon style={{ minWidth: isMenuCollapsed ? 0 : 50 }}>
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>
                {!isMenuCollapsed && <ListItemText primary={item.text} />}
              </ListItem>
            ))}
          </List>
        </div> */}
        {isLoading ? (
          <div className={classes.loadingWrapper}>
            <CircularProgress size={50} />
          </div>
        ) : (
          <div
            style={{
              flexGrow: 1,
              flexShrink: 1,
              minWidth: 0,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Toolbar />
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              <Checkbox
                size="small"
                checked={isCheckboxAllSelected}
                onChange={handleSelectAll}
                indeterminate={
                  selectedEmails.length > 0 &&
                  selectedEmails.length < filteredEmails.length
                }
              />
              <IconButton>
                <RefreshIcon />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box> */}
            <div className={classes.emailsWrapper}>
              <Paper className={classes.emailsPaper}>
                {filteredEmails.map((email) => (
                  <div
                    key={email.id}
                    onClick={() => handleEmailClick(email)}
                    className={
                      selectedEmail?.id === email.id
                        ? classes.emailWrapperSelected
                        : classes.emailWrapper
                    }
                  >
                    <img
                      src={`https://cdn.brandfetch.io/${email.domain}`}
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 12,
                        borderRadius: 8,
                        backgroundColor: "#E8E8E8",
                      }}
                    />
                    {/* <Checkbox
                      size="small"
                      checked={selectedEmails.includes(email.id)}
                      onChange={() => handleCheckboxChange(email.id)}
                      onClick={(e) => e.stopPropagation()}
                    /> */}
                    <Typography
                      variant="body2"
                      style={{
                        width: 200,
                        flexShrink: 0,
                        fontWeight: "bold",
                      }}
                    >
                      {email.sender.replace(/"/g, "").split("<")[0]}
                    </Typography>
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography variant="body2">{email.subject}</Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {email.snippet}
                      </Typography>
                    </div>
                    {briefsIds.includes(email.id) && (
                      <div className={classes.emailActions}>
                        <Button
                          variant="outlined"
                          onClick={(e) => onShowBriefClick(e, email.id)}
                          className={classes.showBriefButton}
                        >
                          Show brief
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </Paper>
              {selectedEmail && (
                <EmailViewer
                  {...selectedEmail}
                  hasBrief={briefsIds.includes(selectedEmail.id)}
                  onShowBriefClick={onShowBriefClick}
                  onClose={handleCloseEmail}
                  onGenerateBriefSuccess={onGenerateBriefSuccess}
                />
              )}
            </div>
          </div>
        )}
      </Box>
      {selectedBrief && (
        <Dialog
          open
          onClose={() => setSelectedBrief(null)}
          PaperProps={{ className: classes.briefDialog }}
        >
          <BriefViewer {...selectedBrief} />
          <Button
            variant="contained"
            disabled={isLoading}
            onClick={() => setSelectedBrief(null)}
          >
            Close
          </Button>
        </Dialog>
      )}
    </ThemeProvider>
  );
};
