import { useContext } from "react";
import { LandingPage } from "../LandingPage";
import { AuthContext } from "../authContext";
import { useStyles } from "./styles";
import { UserHomePage } from "../UserHomePage";

export const MainContainer: React.FC = () => {
  const classes = useStyles();
  const { token } = useContext(AuthContext);

  return (
    <div className={classes.wrapper}>
      {token ? (
        <>
          {/* <Header /> */}
          <UserHomePage />
        </>
      ) : (
        <LandingPage />
      )}
      {/* <Footer /> */}
    </div>
  );
};
