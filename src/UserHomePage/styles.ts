import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "/logo.png";

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
  emailsWrapper: {
    flexGrow: 1,
    overflow: "auto",
    scrollbarWidth: "none",
    "-ms-overflow-style": "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));
