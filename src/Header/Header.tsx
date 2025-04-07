import { useNavigate } from "react-router-dom";
import { FreeTrialButton } from "../common";
import { useStyles } from "./styles";
import { HeaderProps } from "./types";

export const Header: React.FC<HeaderProps> = ({ isLandingPage = false }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className={classes.wrapper}>
      <div onClick={navigateToHome} className={classes.image} />
      {isLandingPage && (
        <div className={classes.noTokenButtonsWrapper}>
          <FreeTrialButton />
        </div>
      )}
    </div>
  );
};
