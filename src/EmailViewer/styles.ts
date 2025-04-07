import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    "&.MuiPaper-root": {
      width: "50%",
      overflow: "auto",
      position: "relative",
      flexGrow: 1,
      flexShrink: 0,
      padding: theme.spacing(4),
      backgroundImage: "none",
      borderLeft: `1px solid ${theme.palette.text.secondary}`,
    },
  },
  headerWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeftWrapper: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: theme.spacing(1.5),
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
  },
  briefButtonWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
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
  contentWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    "&.MuiIconButton-root": {
      position: "absolute",
      top: 0,
      right: 4,
      color: "white",
    },
  },
}));
