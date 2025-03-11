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
  firstSection: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    padding: theme.spacing(5, 2),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(10, 30),
    },
    gap: theme.spacing(5),
  },
  firstSectionLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      gap: 20,
    },
  },
  firstSectionRight: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    alignItems: "center",
    gap: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      width: "40%",
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
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(0, 30),
    },
    [theme.breakpoints.down("sm")]: {
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
