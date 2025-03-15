import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    "&.MuiButton-root": {
      "&:hover": {
        backgroundColor: "#52BD95",
      },
      width: "fit-content",
      padding: theme.spacing(2),
      textTransform: "none",
      borderRadius: theme.spacing(0.75),
      backgroundColor: "#52BD95",
    },
  },
}));
