import { createTheme, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "/logo.png";
import favicon from "/favicon.png";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#52BD95",
    },
    secondary: {
      main: "#03DAC6",
    },
    background: {
      default: "#28282B",
      paper: "#232323",
    },
  },
});

export const useStyles = makeStyles((theme: Theme) => ({
  collapseMenuIcon: {
    "&.MuiIconButton-root": {
      marginRight: theme.spacing(2.5),
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  },
  userAvatar: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  link: {
    textDecoration: "none",
    color: "#52BD95",
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.caption.fontSize,
    },
  },
  image: {
    height: 50,
    width: 125,
    margin: theme.spacing(0, 2, 0, 1),
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: `url(${logo})`,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      backgroundImage: `url(${favicon})`,
      height: 30,
      margin: theme.spacing(0, 1, 0, 0),
    },
  },
  loadingWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  searchbox: {
    width: 500,
    maxWidth: "100%",
    "&.MuiTextField-root": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
      },
    },
    "& .MuiInputBase-root": {
      borderRadius: 50,
    },
  },
  tokensIndicatorWrapper: {
    "&.MuiButton-root": {
      height: 30,
      position: "absolute",
      right: theme.spacing(3),
      display: "flex",
      alignItems: "center",
      color: darkTheme.palette.primary.main,
      border: `1px solid ${theme.palette.grey[800]}`,
      borderRadius: 50,
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  },
  tokensIndicatorWrapperSmallScreen: {
    display: "flex",
    alignItems: "center",
    color: darkTheme.palette.primary.main,
    borderRadius: 50,
    gap: theme.spacing(0.5),
  },
  navLinksContainerWrapper: {
    width: 200,
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    transition: "width 0.5s",
    overflowX: "hidden",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  navLinksContainerWrapperCollapsed: {
    width: 65,
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    transition: "width 0.5s",
    overflowX: "hidden",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  navLinksWrapper: {
    flexGrow: 1,
    borderRight: `1px solid ${theme.palette.grey[800]}`,
  },
  navLinkWrapper: {
    "&.MuiListItem-root": {
      "&:hover": {
        backgroundColor: theme.palette.grey[800],
      },
      padding: theme.spacing(1.5, 2.5),
      cursor: "pointer",
    },
  },
  navLinkWrapperSelected: {
    "&.MuiListItem-root": {
      padding: theme.spacing(1.5, 2.5),
      cursor: "pointer",
      backgroundColor: theme.palette.grey[800],
    },
  },
  navLinkLabel: {
    "&.MuiListItemText-root": {
      margin: 0,
    },
  },
  briefsWrapper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  emailsContinerWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  emailsWrapper: {
    flexGrow: 1,
    display: "flex",
    overflow: "hidden",
    padding: 1,
  },
  emailsPaper: {
    flexGrow: 1,
    overflow: "auto",
    scrollbarWidth: "none",
    "-ms-overflow-style": "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  bottomAppBar: {
    "&.MuiAppBar-root": {
      top: "auto",
      bottom: 0,
      flexDirection: "row",
      justifyContent: "space-evenly",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
  },
  briefDialog: {
    "& .MuiPaper-root": {
      padding: 0,
      overflowY: "auto",
    },
    backgroundImage: "none !important",
  },
  closeIcon: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    cursor: "pointer",
  },
}));
