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
    padding: theme.spacing(1, 4),
    borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
    cursor: "pointer",
    backgroundColor: "inherit",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 2),
    },
  },
  emailWrapperSelected: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    padding: theme.spacing(1, 4),
    borderBottom: theme.palette.grey[800],
    cursor: "pointer",
    backgroundColor: "rgba(82, 189, 149, 0.2)",
  },
  subjectWrapper: {
    width: 200,
    flexShrink: 0,
    fontWeight: "bold",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
  },
  rightSideWrapper: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
  date: {
    "&.MuiTypography-root": {
      flexShrink: 0,
      fontWeight: "bold",
    },
  },
}));
