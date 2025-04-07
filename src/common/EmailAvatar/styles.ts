import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    "&.MuiAvatar-root": {
      width: 30,
      height: 30,
      marginRight: theme.spacing(1.5),
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.grey[300],
    },
  },
  initialsLogo: {
    "&.MuiAvatar-root": {
      width: 30,
      height: 30,
      marginRight: theme.spacing(1.5),
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.grey[400],
    },
  },
}));
