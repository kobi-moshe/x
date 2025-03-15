import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import { Divider } from "@mui/material";

export const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Divider className={classes.divider} />
      <Link
        to="/privacy-policy"
        style={{ color: "lightgrey", textDecoration: "none" }}
      >
        Privacy Policy
      </Link>
      <Link
        to="/terms-and-conditions"
        style={{ color: "lightgrey", textDecoration: "none" }}
      >
        Terms & Conditions
      </Link>
    </div>
  );
};
