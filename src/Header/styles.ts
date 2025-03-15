import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "/logo.png";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: 50,
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      height: 40,
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(2, 30),
    },
  },
  image: {
    width: 150,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: `url(${logo})`,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
  },
  link: {
    textAlign: "right",
    textDecoration: "none",
    color: "#52BD95",
  },
  tokenButtonsWrapper: {
    display: "flex",
    gap: 32,
    alignItems: "center",
  },
  noTokenButtonsWrapper: {
    display: "flex",
    gap: 8,
  },
  signInButton: {
    "&.MuiButton-root": {
      width: "fit-content",
      padding: theme.spacing(1, 2),
      textTransform: "none",
      borderRadius: theme.spacing(0.75),
      color: "black",
      backgroundColor: "white",
      "&:hover": {
        backgroundColor: "white",
      },
    },
  },
}));
