import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  tokensIndicatorWrapper: {
    "&.MuiButton-root": {
      height: 30,
      display: "flex",
      alignItems: "center",
      position: "absolute",
      right: theme.spacing(3),
      border: `1px solid ${theme.palette.grey[800]}`,
      color: "#52BD95",
      borderRadius: 50,
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  },
  tokensIndicatorWrapperSmallScreen: {
    "&.MuiButton-root": {
      display: "flex",
      alignItems: "center",
      color: "#52BD95",
      borderRadius: 50,
    },
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  card: {
    width: 250,
    height: 250,
    textAlign: "center",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  bestOffer: {
    border: `2px solid ${theme.palette.secondary.main}`,
    position: "relative",
    overflow: "visible",
  },
  bestOfferBadge: {
    width: "fit-content",
    margin: "0 auto",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing(0.5, 1),
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    fontSize: "0.75rem",
    fontWeight: "bold",
    gap: theme.spacing(0.5),
  },
  packageContentWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  creditAmount: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  price: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  purchaseButton: {
    textTransform: "none",
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
