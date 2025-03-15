import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
    margin: theme.spacing(0.75),
    transition: "transform 0.3s",
    overflow: "hidden",
    "&:hover": {
      transform: "scale(1.01)",
    },
  },
  wrapper: {
    "&.MuiCard-root": {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      padding: theme.spacing(2),
      gap: theme.spacing(6),
      borderRadius: theme.spacing(1),
      height: 500,
    },
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
  briefCardContent: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  actionItemsWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  dialogWrapper: {
    padding: theme.spacing(2),
  },
  dialogActionsWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  closeIcon: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    cursor: "pointer",
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
  loadingWrapper: {
    margin: "0 auto",
  },
  taskCreatedToast: {
    whiteSpace: "nowrap",
    display: "inline-block",
    overflow: "hidden",
    padding: theme.spacing(2),
  },
}));
