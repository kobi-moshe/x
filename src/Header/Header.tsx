import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { FreeTrialButton } from "../common";
import { useContext } from "react";
import { AuthContext } from "../authContext";
import { logout } from "../authService";
import { useStyles } from "./styles";

export const Header: React.FC = () => {
  const classes = useStyles();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className={classes.wrapper}>
      <div onClick={navigateToHome} className={classes.image} />
      {token ? (
        <div className={classes.tokenButtonsWrapper}>
          <Link to="/" className={classes.link}>
            <Typography>Home</Typography>
          </Link>
          <Link to="/" onClick={handleLogout} className={classes.link}>
            <Typography>Logout</Typography>
          </Link>
        </div>
      ) : (
        <div className={classes.noTokenButtonsWrapper}>
          <Button
            component={Link}
            variant="contained"
            to="/login"
            className={classes.signInButton}
          >
            Sign in
          </Button>
          <FreeTrialButton />
        </div>
      )}
    </div>
  );
};
