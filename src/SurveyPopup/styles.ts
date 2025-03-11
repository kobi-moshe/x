import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import feedback from "/feedback.jpeg";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    backgroundImage: `url(${feedback})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: theme.spacing(2),
  },
  closeIcon: {
    position: "absolute",
    right: theme.spacing(2),
    cursor: "pointer",
  },
  title: {
    textAlign: "center",
    color: "#52BD95",
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
  },
  rating: {
    margin: theme.spacing(3, 0),
    marginRight: "auto",
    marginLeft: "auto",
  },
  actionsWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  submitButton: {
    "&.MuiButton-root": {
      "&:hover": {
        backgroundColor: "#52BD95",
      },
      textTransform: "none",
      backgroundColor: "#52BD95",
    },
  },
  errorWrapper: {
    marginTop: theme.spacing(1),
  },
  errorMessage: {
    color: "red",
  },
}));
