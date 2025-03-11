import { PropsWithChildren } from "react";
import { useStyles } from "./styles";

export const HeroSection: React.FC<PropsWithChildren> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <ul className={classes.circles}>
        <li className={classes.circle1} />
        <li className={classes.circle2} />
        <li className={classes.circle3} />
        <li className={classes.circle4} />
        <li className={classes.circle5} />
        <li className={classes.circle6} />
        <li className={classes.circle7} />
        <li className={classes.circle8} />
        <li className={classes.circle9} />
        <li className={classes.circle10} />
      </ul>
      <div className={classes.childrenWrapper}>{children}</div>
    </div>
  );
};
