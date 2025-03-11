import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import logo from "/logo.png";
import { useNavigate } from "react-router-dom";
import google from "/google.svg";
import { AuthPageType } from "./types";
import {
  signInWithEmailPassword,
  signInWithGoogle,
  signUp,
} from "../authService";
import { Header } from "../Header";
import { useStyles } from "./styles";
import { useState } from "react";
import { AuthErrorMessages } from "./utils";

export const AuthPage: React.FC<AuthPageType> = ({ isSignIn = false }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      await signUp(email, password);
      // Handle successful sign-up
      setIsLoading(false);
    } catch (e) {
      // Handle error
      if (e instanceof Error) {
        setErrorMessage(e.message);
        setIsLoading(false);
      }
    }
  };

  const handleEmailSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithEmailPassword(email, password);
      // Handle successful sign-in
      setIsLoading(false);
    } catch (e) {
      // Handle error
      if (e instanceof Error) {
        setErrorMessage(e.message);
        setIsLoading(false);
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      // Handle successful sign-up
      setIsLoading(false);
    } catch (e) {
      // Handle error
      if (e instanceof Error) {
        setErrorMessage(e.message);
        setIsLoading(false);
      }
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignIn) {
      await handleEmailSignIn();
    } else {
      await handleSignup();
    }
  };

  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.innerWrapper}>
        <Card raised className={isLoading ? classes.cardLoading : classes.card}>
          {isLoading && (
            <CircularProgress
              style={{
                position: "absolute",
                top: "50%",
              }}
            />
          )}
          <img src={logo} style={{ width: 150 }} />
          <form onSubmit={handleSubmit} className={classes.form}>
            <CardContent
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                marginTop: 50,
                gap: 10,
              }}
            >
              <Button
                startIcon={
                  <img src={google} style={{ width: 25, height: 25 }} />
                }
                variant="outlined"
                fullWidth
                onClick={handleGoogleSignUp}
                style={{
                  textTransform: "none",
                  color: "black",
                  borderColor: "black",
                }}
              >
                Sign {isSignIn ? "in" : "up"} with Google
              </Button>
              <Divider style={{ margin: "24px 0" }} />
              <Typography variant="caption" fontWeight="bold">
                Email
              </Typography>
              <TextField
                type="email"
                size="small"
                placeholder="Email"
                onChange={handleEmailChange}
              />
              <Typography variant="caption" fontWeight="bold">
                Password
              </Typography>
              <TextField
                type="password"
                size="small"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
              {(errorMessage.includes(
                AuthErrorMessages.INVALID_LOGIN_CREDENTIALS
              ) ||
                errorMessage.includes(AuthErrorMessages.INVALID_EMAIL)) && (
                <Typography variant="body2" className={classes.errorText}>
                  {isSignIn ? "Invalid email or password" : "Invalid email"}
                </Typography>
              )}
              {errorMessage.includes(AuthErrorMessages.WEAK_PASSWORD) && (
                <Typography variant="body2" className={classes.errorText}>
                  Password should be at least 6 characters
                </Typography>
              )}
              {errorMessage.includes(AuthErrorMessages.EMAIL_EXISTS) && (
                <Typography variant="body2" className={classes.errorText}>
                  Email already exists
                </Typography>
              )}
            </CardContent>
            <CardActions style={{ width: "100%" }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{
                  textTransform: "none",
                  backgroundColor: "#52BD95",
                }}
              >
                Sign {isSignIn ? "in" : "up"}
              </Button>
            </CardActions>
          </form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Typography variant="body2">
              {isSignIn
                ? "Doesn't have an account yet?"
                : "Already have an account?"}
            </Typography>
            <Button
              onClick={isSignIn ? navigateToSignup : navigateToLogin}
              style={{
                width: "fit-content",
                height: "fit-content",
                padding: "8px 16px",
                textTransform: "none",
                color: "#52BD95",
              }}
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
