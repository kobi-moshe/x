import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  TextField,
  IconButton,
  Box,
  Paper,
  Checkbox,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  Inbox as InboxIcon,
  Send as SendIcon,
  Drafts as DraftsIcon,
  Star as StarIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import api from "../api";
import { fetchGmailEmailsUrl, userStatusUrl } from "../UserLandingPage/utils";
import { EmailType } from "../UserLandingPage/types";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { logout } from "../authService";
import { useStyles } from "./styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#BB86FC",
    },
    secondary: {
      main: "#03DAC6",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
  },
});

export const UserHomePage: React.FC = () => {
  const classes = useStyles();
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEmailViewOpen, setIsEmailViewOpen] = useState(false);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<Array<EmailType>>([]);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sanitizedHTML = DOMPurify.sanitize(selectedEmail?.htmlContent, {
    ADD_TAGS: ["style"],
    ADD_ATTR: ["target"],
  });

  const emailsRef = useRef<Array<EmailType>>([]);

  const fetchInitData = async () => {
    try {
      setIsLoading(true);
      const [userStatusResponse, emailsResponse] = await Promise.all([
        api.get(userStatusUrl),
        api.post(fetchGmailEmailsUrl),
      ]);
      setIsPremiumUser(userStatusResponse.data.isPremium);
      emailsRef.current = emailsResponse.data;
      setFilteredEmails(emailsResponse.data);
    } catch (e) {
      // if ((e as AxiosError).status === 401) {
      //   await signInWithGoogle();
      //   window.location.reload();
      // }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitData();
  }, []);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setIsEmailViewOpen(true);
  };

  const handleCloseEmail = () => {
    setIsEmailViewOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  const handleCheckboxChange = (emailId: number) => {
    setSelectedEmails((prev) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedEmails(filteredEmails.map((email) => email.id));
    } else {
      setSelectedEmails([]);
    }
  };

  useEffect(() => {
    if (selectedEmail) {
      setIsEmailViewOpen(true);
    }
  }, [selectedEmail]);

  const menuItems = [
    { text: "Inbox", icon: <InboxIcon /> },
    { text: "Sent", icon: <SendIcon /> },
    { text: "Drafts", icon: <DraftsIcon /> },
    { text: "Starred", icon: <StarIcon /> },
    { text: "Trash", icon: <DeleteIcon /> },
  ];

  const handleLogout = async () => {
    await logout();
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="toggle menu"
              onClick={toggleMenu}
              edge="start"
              sx={{ mr: 2 }}
            >
              {isMenuCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
            </IconButton>
            <div onClick={navigateToHome} className={classes.image} />
            <Box sx={{ flexGrow: 1, ml: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search mail"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
                size="small"
              />
            </Box>
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
        <div
          style={{
            width: isMenuCollapsed ? 60 : 200,
            flexShrink: 0,
            transition: "width 0.5s",
            overflowX: "hidden",
          }}
        >
          <Toolbar />
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                sx={{
                  justifyContent: isMenuCollapsed ? "center" : "flex-start",
                }}
              >
                <Tooltip
                  title={isMenuCollapsed ? item.text : ""}
                  placement="right"
                >
                  <ListItemIcon
                    style={isMenuCollapsed ? { minWidth: 0 } : { minWidth: 50 }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>
                {!isMenuCollapsed && <ListItemText primary={item.text} />}
              </ListItem>
            ))}
          </List>
        </div>
        {isLoading ? (
          <div className={classes.loadingWrapper}>
            <CircularProgress size={50} />
          </div>
        ) : (
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <Toolbar />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              <Checkbox
                checked={selectedEmails.length === filteredEmails.length}
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
            </Box>
            <Box sx={{ flexGrow: 1, display: "flex", overflow: "hidden" }}>
              <Paper
                style={{
                  width: 100,
                  flexGrow: 1,
                  margin: isEmailViewOpen ? 2 : 0,
                  transition: "margin-right 0.3s",
                  overflow: "auto",
                }}
              >
                {filteredEmails.map((email) => (
                  <div
                    key={email.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: 8,
                      borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                      cursor: "pointer",
                      backgroundColor: "inherit",
                    }}
                  >
                    <Checkbox
                      checked={selectedEmails.includes(email.id)}
                      onChange={() => handleCheckboxChange(email.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div
                      onClick={() => handleEmailClick(email)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        style={{ width: "20%", fontWeight: "bold" }}
                      >
                        {email.sender.split("<")[0]}
                      </Typography>
                      <div style={{ width: "60%" }}>
                        <Typography variant="body2">{email.subject}</Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {email.snippet}
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}
              </Paper>
              <Paper
                sx={{
                  width: isEmailViewOpen ? "50%" : "0%",
                  overflow: "auto",
                  transition: "width 0.5s",
                  position: "relative",
                  backgroundColor: "transparent",
                }}
              >
                {selectedEmail && (
                  <>
                    <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
                    <IconButton
                      onClick={handleCloseEmail}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 8,
                        backgroundColor: "black",
                        color: "white",
                        padding: 4,
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </>
                )}
              </Paper>
            </Box>
          </div>
        )}
      </Box>
    </ThemeProvider>
  );
};
