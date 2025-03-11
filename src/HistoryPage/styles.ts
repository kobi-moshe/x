import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  loaderWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
}));
