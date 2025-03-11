import { Link } from "react-router-dom";
import { useStyles } from "./styles";

export const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Link to="/privacy-policy" style={{ color: "white" }}>
        Privacy Policy
      </Link>
      <Link to="/terms-and-conditions" style={{ color: "white" }}>
        Terms and Conditions
      </Link>
    </div>
  );
};
