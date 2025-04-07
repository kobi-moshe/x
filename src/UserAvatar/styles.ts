import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapperHidden: {
    opacity: 0,
    pointerEvents: "none",
  },
  avatar: {
    "&.MuiAvatar-root": {
      width: 40,
      height: 40,
      fontSize: 18,
      backgroundColor: "#52BD95",
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out",
      "&:hover": {
        transform: "scale(1.05)",
      },
    },
  },
  menu: {
    marginTop: theme.spacing(1),
  },
  menuItem: {
    padding: theme.spacing(1.5, 2),
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  userAvatar: {
    "&.MuiAvatar-root": {
      width: 70,
      height: 70,
      fontSize: 32,
      backgroundColor: "#52BD95",
      marginRight: theme.spacing(2),
    },
  },
  userName: {
    fontWeight: 500,
  },
  userEmail: {
    color: theme.palette.text.disabled,
  },
  signOutIcon: {
    marginRight: theme.spacing(1),
  },
}));
