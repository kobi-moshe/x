import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(5, 0, 2, 0),
      gap: theme.spacing(5),
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0),
      justifyContent: "space-around",
    },
  },
}));
