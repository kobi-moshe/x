import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4, 30),
    },
    gap: theme.spacing(6),
  },
  imageWrapper: {
    maxHeight: 512,
    maxWidth: 512,
    margin: "0 auto",
  },
  image: {
    "& .image-gallery-content .image-gallery-slide .image-gallery-image": {
      maxHeight: "100vh",
    },
  },
  backButton: {
    "&.MuiButton-root": {
      "&.Mui-disabled": {
        backgroundColor: "grey",
      },
      "&:hover": {
        backgroundColor: "#52BD95",
      },
      width: "fit-content",
      display: "flex",
      backgroundColor: "#52BD95",
      color: "white",
      borderColor: "transparent",
      position: "fixed",
      bottom: 16,
      textTransform: "none",
    },
  },
  generateImageButton: {
    "&.MuiButton-root": {
      margin: "0 auto",
      color: "#52BD95",
      textTransform: "none",
    },
  },
  shareCreationButton: {
    "&.MuiButton-root": {
      margin: "0 auto",
      color: "#52BD95",
      textTransform: "none",
    },
  },
  generatingWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 30,
  },
  generatingSkeleton: {
    "&.MuiSkeleton-root": {
      transform: "none",
      backgroundColor: "rgba(0,0,0,0.2)",
    },
  },
  noHistoryWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    textAlign: "center",
  },
  noHistoryTextWrapper: {
    fontSize: 17,
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
    },
  },
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
