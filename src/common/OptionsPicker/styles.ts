import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 8,
    padding: theme.spacing(2, 0),
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
    [theme.breakpoints.up("xl")]: {
      gridTemplateColumns: "repeat(5, 1fr)",
    },
  },
  button: {
    "&.MuiButton-root": {
      "&:hover": {
        backgroundColor: "#52BD95",
        transform: "scale(1.05)",
      },
      width: "clamp(64px, 5vw, 100px)",
      height: "clamp(64px, 5vw, 100px)",
      backgroundColor: "#f0f0f0",
      borderRadius: 8,
      cursor: "pointer",
      textTransform: "none",
      color: "black",
      transition: "background-color 0.3s, border-color 0.3s",
    },
  },
  buttonSelected: {
    "&.MuiButton-root": {
      "&:hover": {
        backgroundColor: "#52BD95",
      },
      width: "clamp(64px, 5vw, 100px)",
      height: "clamp(64px, 5vw, 100px)",
      borderRadius: 8,
      textTransform: "none",
      backgroundColor: "#52BD95",
      color: "white",
      transform: "scale(1.05)",
    },
  },
  label: {
    "&.MuiTypography-root": {
      fontSize: "0.5rem",
      [theme.breakpoints.up("md")]: {
        fontSize: "0.75rem",
      },
    },
  },
}));
