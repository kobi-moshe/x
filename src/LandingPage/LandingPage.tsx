import { Typography } from "@mui/material";
import { useStyles } from "./styles";
import { FreeTrialButton, PulseAnimation, Typewriter } from "../common";
import { Header } from "../Header";
import { HeroSection } from "../HeroSection";
import { Footer } from "../Footer";

export const LandingPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <HeroSection>
        <Header isLandingPage />
        <div className={classes.heroInnerWrapper}>
          <div className={classes.heroContentWrapper}>
            <div style={{ minHeight: 240 }}>
              <Typewriter
                text="Transform Emails into Actions in Seconds"
                delay={50}
                wrapperClassName={classes.heroTitle}
              />
            </div>
            <Typography className={classes.heroSubtitle}>
              Easily extract summaries, actionable tasks, and responses powered
              by AI from your emails.
            </Typography>
            <PulseAnimation>
              <FreeTrialButton className={classes.tryButton} />
            </PulseAnimation>
          </div>
        </div>
      </HeroSection>
      <div className={classes.secondSection}></div>
      <div className={classes.thirdSection}></div>
      <div className={classes.fourthSection}>
        <div className={classes.fourthSectionInner}>
          <Typography variant="h4" fontWeight="bold">
            Streamline Your Emails Management
          </Typography>
          <Typography>
            Try it for free today and start saving valuable time.
          </Typography>
        </div>
        <FreeTrialButton />
      </div>
      <Footer />
    </div>
  );
};
