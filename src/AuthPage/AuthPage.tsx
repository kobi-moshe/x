import { Button, Typography } from "@mui/material";
import gmail from "/gmail.svg";
import { signInWithGoogle } from "../authService";
import { Header } from "../Header";
import { useStyles } from "./styles";

export const AuthPage: React.FC = () => {
  const classes = useStyles();

  const handleGoogleSignUp = async () => {
    await signInWithGoogle();
  };

  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.innerWrapper}>
        <Button
          startIcon={
            <img src={gmail} style={{ width: 35, height: 35, zIndex: 2 }} />
          }
          onClick={handleGoogleSignUp}
          className={classes.loginButton}
        >
          <Typography variant="h5" style={{ textTransform: "none", zIndex: 2 }}>
            Continue with Gmail
          </Typography>
        </Button>
        <Typography variant="caption" className={classes.agreementText}>
          By logging in, you accept the MailBrief{" "}
          <a href="/privacy-policy">Privacy Policy</a> and{" "}
          <a href="terms-and-conditions">Terms of Service</a>
        </Typography>
      </div>
    </div>
  );
};
