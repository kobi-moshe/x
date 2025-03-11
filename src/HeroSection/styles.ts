import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  wrapper: {
    background: "linear-gradient(to left, #8f94fb, #4e54c8)",
    width: "100%",
    position: "relative",
  },
  childrenWrapper: {
    position: "relative",
  },
  circles: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    margin: 0,
    "& li": {
      position: "absolute",
      display: "block",
      listStyle: "none",
      background: "rgba(255, 255, 255, 0.2)",
      bottom: "-150px",
    },
  },
  circle1: {
    left: "25%",
    width: "80px",
    height: "80px",
    animation: "$animate 10s linear infinite 0s",
  },

  circle2: {
    left: "10%",
    width: "20px",
    height: "20px",
    animation: "$animate 12s linear infinite 2s",
  },

  circle3: {
    left: "70%",
    width: "20px",
    height: "20px",
    animation: "$animate 14s linear infinite 4s",
  },

  circle4: {
    left: "40%",
    width: "60px",
    height: "60px",
    animation: "$animate 18s linear infinite 0s",
  },

  circle5: {
    left: "65%",
    width: "20px",
    height: "20px",
    animation: "$animate 16s linear infinite 1s",
  },

  circle6: {
    left: "75%",
    width: "110px",
    height: "110px",
    animation: "$animate 20s linear infinite 3s",
  },

  circle7: {
    left: "35%",
    width: "150px",
    height: "150px",
    animation: "$animate 22s linear infinite 7s",
  },

  circle8: {
    left: "50%",
    width: "25px",
    height: "25px",
    animation: "$animate 45s linear infinite 15s",
  },

  circle9: {
    left: "20%",
    width: "15px",
    height: "15px",
    animation: "$animate 35s linear infinite 2s",
  },

  circle10: {
    left: "85%",
    width: "150px",
    height: "150px",
    animation: "$animate 11s linear infinite 0s",
  },

  "@keyframes animate": {
    "0%": {
      transform: "translateY(0) rotate(0deg)",
      opacity: 1,
      borderRadius: 0,
    },
    "100%": {
      transform: "translateY(-1000px) rotate(720deg)",
      opacity: 0,
      borderRadius: "50%",
    },
  },
}));
