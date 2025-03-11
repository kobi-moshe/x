import { useContext } from "react";
import { Header } from "../Header";
import { LandingPage } from "../LandingPage";
import { UserLandingPage } from "../UserLandingPage";
import { AuthContext } from "../authContext";
import { useStyles } from "./styles";
import { Footer } from "../Footer";

export const MainContainer: React.FC = () => {
  const classes = useStyles();
  const { token } = useContext(AuthContext);

  return (
    <div className={classes.wrapper}>
      {token ? (
        <>
          <Header />
          <UserLandingPage />
        </>
      ) : (
        <LandingPage />
      )}
      {/* <Footer /> */}
    </div>
  );
};
