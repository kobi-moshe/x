import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(0, 30),
    },
  },
}));
