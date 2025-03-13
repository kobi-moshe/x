import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3, 1),
    gap: theme.spacing(0.5),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6, 30),
    },
  },
  loadingWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  textfield: {
    "& .MuiOutlinedInput-root": {
      // Border color
      "& fieldset": {
        borderColor: "white",
      },
      // Change border color when hovered
      "&:hover fieldset": {
        borderColor: "white",
      },
      // Change border color when focused
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    // Text color
    "& .MuiInputBase-input": {
      color: "white",
    },
    // Label color
    "& .MuiInputLabel-root": {
      color: "grey",
    },
    // Label color when focused
    "& .MuiInputLabel-root.Mui-focused": {
      color: "white",
    },
  },
  textfieldDisabled: {
    pointerEvents: "none",
  },
  title: {
    color: "#52BD95",
  },
  skeleton: {
    "&.MuiSkeleton-root": {
      transform: "none",
      backgroundColor: "rgba(0,0,0,0.2)",
    },
  },
  briefButton: {
    "&.MuiButton-root": {
      "&:hover": {
        backgroundColor: "#52BD95",
      },
      alignSelf: "center",
      textTransform: "capitalize",
      backgroundColor: "#52BD95",
    },
  },
  accordion: {
    "&.MuiAccordion-root": {
      "&.Mui-expanded": {
        "&:hover": {
          transform: "scale(1)",
        },
      },
      "&:hover": {
        transform: "scale(1.01)",
      },
      "&:first-of-type, &:last-of-type": {
        border: "1px solid #52BD95",
        borderRadius: theme.spacing(1),
        borderTopLeftRadius: theme.spacing(1),
        borderTopRightRadius: theme.spacing(1),
      },
      border: "1px solid #52BD95",
      borderRadius: theme.spacing(1),
      borderTopLeftRadius: theme.spacing(1),
      borderTopRightRadius: theme.spacing(1),
    },
  },
  accordionContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(0, 2, 0, 0),
  },
  outputWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    margin: theme.spacing(3, 0),
    fontWeight: 500,
  },
}));
