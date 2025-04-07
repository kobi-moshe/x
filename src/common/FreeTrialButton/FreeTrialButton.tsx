import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import { FreeTrialButtonProps } from "./types";
import clsx from "clsx";
import google from "/google.svg";

export const FreeTrialButton: React.FC<FreeTrialButtonProps> = ({
  className,
}) => {
  const classes = useStyles();

  return (
    <Button
      startIcon={<img src={google} style={{ width: 25, height: 25 }} />}
      component={Link}
      variant="outlined"
      to="/login"
      className={clsx(classes.wrapper, className)}
    >
      Sign in with Google
    </Button>
  );
};
