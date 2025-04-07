import { createTheme, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "/logo.png";

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
  linksWrapper: {
    display: "flex",
    marginLeft: theme.spacing(4),
    gap: 20,
  },
  link: {
    textDecoration: "none",
    color: "#52BD95",
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
    "& .MuiInputBase-root": {
      borderRadius: 50,
    },
  },
  navLinksWrapper: {
    flexGrow: 1,
    borderRight: `1px solid ${theme.palette.grey[800]}`,
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
  emailWrapper: {
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.01)",
    },
    display: "flex",
    alignItems: "center",
    position: "relative",
    padding: theme.spacing(1, 4.5),
    borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
    cursor: "pointer",
    backgroundColor: "inherit",
    "&:hover $emailActions": {
      opacity: 1,
    },
  },
  emailWrapperSelected: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    padding: theme.spacing(1, 4.5),
    borderBottom: theme.palette.grey[800],
    cursor: "pointer",
    backgroundColor: "rgba(82, 189, 149, 0.2)",
    "&:hover $emailActions": {
      opacity: 1,
    },
  },
  emailActions: {
    position: "absolute",
    right: theme.spacing(2),
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  showBriefButton: {
    "&.MuiButton-root": {
      textTransform: "capitalize",
    },
  },
  briefDialog: {
    "&.MuiPaper-root": {
      backgroundImage: "none !important",
    },
  },
}));
