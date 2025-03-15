import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import { FreeTrialButtonProps } from "./types";
import clsx from "clsx";

export const FreeTrialButton: React.FC<FreeTrialButtonProps> = ({
  className,
}) => {
  const classes = useStyles();

  return (
    <Button
      component={Link}
      variant="contained"
      to="/signup"
      className={clsx(classes.wrapper, className)}
    >
      Try it for Free
    </Button>
  );
};
