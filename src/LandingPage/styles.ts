import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      gap: theme.spacing(6),
    },
  },
  heroInnerWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "@keyframes fadeInUp": {
    "0%": {
      opacity: 0,
      transform: "translateY(20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  heroContentWrapper: {
    animation: "$fadeInUp 1.5s forwards",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: theme.spacing(10, 0),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexDirection: "column",
      padding: theme.spacing(5),
    },
    gap: theme.spacing(5),
  },
  heroTitle: {
    backgroundImage:
      "radial-gradient(circle, rgba(82, 189, 149, 0.7) 0%, rgba(255, 255, 255, 0.7) 70%)",
    backgroundClip: "text",
    textFillColor: "transparent",
    fontWeight: "bold",
    fontSize: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.spacing(5),
    },
  },
  heroSubtitle: {
    "&.MuiTypography-root": {
      width: "75%",
      fontSize: theme.spacing(3),
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        fontSize: theme.spacing(2.5),
      },
    },
  },
  "@keyframes pulse": {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.05)" },
    "100%": { transform: "scale(1)" },
  },
  tryButton: {
    "&.MuiButton-root": {
      // animation: "$pulse 1.5s infinite",
      padding: theme.spacing(2, 3.5),
      fontSize: theme.spacing(2.5),
    },
  },
  secondSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(0, 30),
    },
  },
  exampleImage: {
    width: "100%",
    borderRadius: 8,
  },
  demoVideo: {
    width: "100%",
    height: 720,
    border: "none",
    marginBottom: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      height: 300,
    },
  },
  featureIcon: {
    width: 75,
    height: 75,
  },
  featureSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 20,
  },
  seecondSection: {
    display: "flex",
    marginTop: 40,
    gap: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  thirdSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(4),
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(0, 30),
    },
  },
  thirdSectionInner: {
    display: "flex",
    gap: 30,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  thirdSectionInnerLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
  thirdSectionInnerRight: {
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
  fourthSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    gap: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(0, 30),
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      flexDirection: "column",
    },
  },
  fourthSectionInner: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  valueIcon: {
    width: 50,
    height: 50,
  },
}));
