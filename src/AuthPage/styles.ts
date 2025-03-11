import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  innerWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  card: {
    width: 370,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 25,
    [theme.breakpoints.up("md")]: {
      padding: 40,
    },
  },
  cardLoading: {
    width: 370,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    padding: 40,
    opacity: 0.3,
  },
  form: {
    minWidth: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    color: "red",
  },
}));
