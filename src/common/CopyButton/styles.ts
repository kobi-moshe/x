import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  copyButton: {
    "&.MuiIconButton-root": {
      width: 50,
      position: "relative",
    },
  },
  copyIcon: {
    position: "absolute",
    top: 0,
    color: "white",
  },
}));
