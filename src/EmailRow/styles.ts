import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
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
  date: {
    width: 100,
    fontWeight: "bold",
    textAlign: "right",
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
}));
