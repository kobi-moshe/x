import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4, 30),
      gap: theme.spacing(1),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2),
      justifyContent: "space-around",
    },
  },
  divider: {
    "&.MuiDivider-root": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      marginBottom: theme.spacing(2),
    },
  },
}));
