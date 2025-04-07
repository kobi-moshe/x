import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  AppBar,
  Toolbar,
  //   List,
  //   ListItem,
  //   ListItemIcon,
  //   ListItemText,
  TextField,
  IconButton,
  Box,
  //   Checkbox,
  ThemeProvider,
  CssBaseline,
  //   Tooltip,
  CircularProgress,
  Dialog,
  List,
  ListItem,
  Tooltip,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import {
  Close,
  Inbox as InboxIcon,
  Topic as TopicIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  //   Refresh as RefreshIcon,
  //   MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import api from "../api";
import { darkTheme, useStyles } from "./styles";
import { BriefData, briefsUrl, EmailData, UserMetadata } from "../common";
import { BriefViewer } from "../BriefViewer";
import { gmailEmailsUrl, userMetadataUrl } from "./utils";
import { UserAvatar } from "../UserAvatar";
import { CurrentTab } from "./types";
import { BriefsBoard } from "../BriefsBoard";
import { EmailViewer } from "../EmailViewer";
import { EmailRow } from "../EmailRow";
import { Credits } from "../Credits";

export const UserHomePage: React.FC = () => {
  const classes = useStyles();
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  //   const [selectedEmails, setSelectedEmails] = useState<Array<string>>([]);
  const [filteredEmails, setFilteredEmails] = useState<Array<EmailData>>([]);
  const [userMetadata, setUserMetadata] = useState<UserMetadata>();
  const [selectedEmail, setSelectedEmail] = useState<EmailData | null>();
  const [briefs, setBriefs] = useState<Array<BriefData>>([]);
  const [selectedBrief, setSelectedBrief] = useState<BriefData | null>();
  const [currentTab, setCurrentTab] = useState<CurrentTab>("inbox");
  const [isLoading, setIsLoading] = useState(false);

  const emailsRef = useRef<Array<EmailData>>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const onInboxClick = () => {
    setCurrentTab("inbox");
  };

  const onBriefsClick = () => {
    setCurrentTab("briefs");
  };

  const briefsIds = briefs.map((brief) => brief.id);

  const menuItems = [
    {
      key: "inbox",
      text: "Inbox",
      icon: <InboxIcon />,
      callback: onInboxClick,
    },
    {
      key: "briefs",
      text: "Briefs",
      icon: <TopicIcon />,
      callback: onBriefsClick,
    },
  ];

  const fetchInitData = async () => {
    setIsLoading(true);
    const userMetadataResponse = await api.get(userMetadataUrl);
    setUserMetadata(userMetadataResponse.data);
    api.get(gmailEmailsUrl).then((response) => {
      emailsRef.current = response.data;
      setFilteredEmails(response.data);
      setIsLoading(false);
    });
    api.get(briefsUrl).then((response) => {
      setBriefs(response.data);
    });
  };

  useEffect(() => {
    fetchInitData();
  }, []);

  const toggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
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
  const onShowBriefClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, emailId: string) => {
      e.stopPropagation();
      const relevantBrief = briefs.find((brief) => brief.id === emailId);
      if (relevantBrief) {
        setSelectedBrief(relevantBrief);
      }
    },
    [briefs]
  );

  const onSelectedBriefClose = () => {
    setSelectedBrief(null);
  };

  const Content = useMemo(() => {
    if (currentTab === "briefs") {
      return (
        <div className={classes.briefsWrapper}>
          <Toolbar />
          <BriefsBoard />
        </div>
      );
    }
    if (isLoading) {
      return (
        <div className={classes.loadingWrapper}>
          <CircularProgress size={50} />
        </div>
      );
    }
    return (
      <div className={classes.emailsContinerWrapper}>
        <Toolbar />
        <div className={classes.emailsWrapper}>
          <Paper className={classes.emailsPaper}>
            {filteredEmails.map((email) => (
              <EmailRow
                key={email.id}
                {...email}
                selectedEmail={selectedEmail}
                setSelectedEmail={setSelectedEmail}
                hasBrief={briefsIds.includes(email.id)}
                onShowBriefClick={onShowBriefClick}
              />
            ))}
          </Paper>
          {selectedEmail && (
            <EmailViewer
              {...selectedEmail}
              setSelectedEmail={setSelectedEmail}
              hasBrief={briefsIds.includes(selectedEmail.id)}
              onShowBriefClick={onShowBriefClick}
              setBriefs={setBriefs}
              isPremiumUser={!!userMetadata?.isPremium}
              setUserMetadata={setUserMetadata}
            />
          )}
        </div>
      </div>
    );
  }, [
    briefsIds,
    classes.briefsWrapper,
    classes.emailsContinerWrapper,
    classes.emailsPaper,
    classes.emailsWrapper,
    classes.loadingWrapper,
    currentTab,
    filteredEmails,
    isLoading,
    onShowBriefClick,
    selectedEmail,
    userMetadata?.isPremium,
  ]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <AppBar position="fixed" style={{ backgroundImage: "none" }}>
          <Toolbar style={{ display: "flex", gap: 16, position: "relative" }}>
            <IconButton
              color="inherit"
              aria-label="toggle menu"
              onClick={toggleMenu}
              edge="start"
              className={classes.collapseMenuIcon}
            >
              {isMenuCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
            </IconButton>
            <UserAvatar {...userMetadata} className={classes.userAvatar} />
            <TextField
              inputRef={searchRef}
              variant="outlined"
              size="small"
              placeholder="Search mail..."
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
            <Credits credits={userMetadata?.credits} />
          </Toolbar>
        </AppBar>
        <div
          className={
            isMenuCollapsed
              ? classes.navLinksContainerWrapperCollapsed
              : classes.navLinksContainerWrapper
          }
        >
          <Toolbar />
          <List className={classes.navLinksWrapper}>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                onClick={item.callback}
                className={
                  item.key === currentTab
                    ? classes.navLinkWrapperSelected
                    : classes.navLinkWrapper
                }
              >
                <Tooltip
                  title={isMenuCollapsed ? item.text : ""}
                  placement="right"
                >
                  <ListItemIcon style={{ minWidth: isMenuCollapsed ? 0 : 45 }}>
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>
                {!isMenuCollapsed && (
                  <ListItemText
                    primary={item.text}
                    className={classes.navLinkLabel}
                  />
                )}
              </ListItem>
            ))}
          </List>
        </div>
        {Content}
        <AppBar className={classes.bottomAppBar}>
          <Credits credits={userMetadata?.credits} isSmallScreen />
          <UserAvatar {...userMetadata} />
          {menuItems.map((item) => (
            <IconButton
              key={item.key}
              onClick={item.callback}
              style={{ color: currentTab === item.key ? "#52BD95" : "white" }}
            >
              {React.cloneElement(item.icon, {
                fontSize: "large",
              })}
            </IconButton>
          ))}
        </AppBar>
      </Box>
      {selectedBrief && (
        <Dialog
          open
          onClose={onSelectedBriefClose}
          classes={{ paper: classes.briefDialog }}
        >
          <BriefViewer {...selectedBrief} />
          <Close
            fontSize="small"
            onClick={onSelectedBriefClose}
            className={classes.closeIcon}
          />
        </Dialog>
      )}
    </ThemeProvider>
  );
};
