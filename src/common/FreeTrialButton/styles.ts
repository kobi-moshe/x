import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    "&.MuiButton-root": {
      "&:hover": {
        borderColor: "#52BD95",
        backgroundColor: "#52BD95",
      },
      width: "fit-content",
      padding: theme.spacing(2),
      textTransform: "none",
      borderRadius: theme.spacing(0.75),
      borderColor: "#52BD95",
      color: "white",
    },
  },
}));
