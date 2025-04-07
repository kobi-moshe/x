import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  generatingBriefText: {
    color: "#52BD95",
    fontSize: theme.typography.h6.fontSize,
  },
  briefButton: {
    "&.MuiButton-root": {
      "&:hover": {
        backgroundColor: "#52BD95",
      },
      textTransform: "capitalize",
      color: "white",
      backgroundColor: "#52BD95",
    },
  },
  showBriefButton: {
    "&.MuiButton-root": {
      textTransform: "capitalize",
    },
  },
}));
