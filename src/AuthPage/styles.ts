import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  innerWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    gap: theme.spacing(2),
  },
  loginButton: {
    "&.MuiButton-root": {
      position: "relative",
      color: "#fff",
      background: "transparent",
      border: "none",
      padding: theme.spacing(3, 10),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2, 4),
      },
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "all 0.3s ease",
      "&::before": {
        content: '""',
        position: "absolute",
        top: -2,
        left: -2,
        right: -2,
        bottom: -2,
        background: `linear-gradient(
      90deg,
      #ff00ff,
      #00ffff,
      #ff00ff,
      #00ffff
    )`,
        backgroundSize: "400% 100%",
        animation: "$trailingAnimation 4s linear infinite",
        filter: "blur(5px)",
        opacity: 1,
      },
      "&::after": {
        content: '""',
        position: "absolute",
        inset: "3px",
        background: "rgba(0, 0, 0, 0.9)",
        zIndex: 1,
      },
      "& .button-content": {
        position: "relative",
        zIndex: 2,
      },
      "&:hover": {
        transform: "scale(1.05)",
        "&::after": {
          background: "rgba(0, 0, 0, 0.7)",
        },
      },
      "&:focus": {
        outline: "none",
        boxShadow: "0 0 0 3px rgba(0, 255, 255, 0.5)",
      },
    },
  },
  "@keyframes trailingAnimation": {
    "0%": {
      backgroundPosition: "200% 0",
    },
    "100%": {
      backgroundPosition: "-200% 0",
    },
  },
  agreementText: {
    textAlign: "center",
    color: theme.palette.grey[500],
    padding: theme.spacing(0, 2),
    "& a": {
      color: theme.palette.grey[400],
    },
  },
}));
