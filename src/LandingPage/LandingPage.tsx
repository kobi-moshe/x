import { Typography } from "@mui/material";
import { useStyles } from "./styles";
import { FreeTrialButton, PulseAnimation, Typewriter } from "../common";
import { Header } from "../Header";
import { HeroSection } from "../HeroSection";
import { Footer } from "../Footer";
import arrow from "/arrow.png";
import arrow2 from "/arrow2.png";
import intro1 from "/intro1.mp4";
import intro2 from "/intro2.mp4";
import intro3 from "/intro3.mp4";
import intro4 from "/intro4.mp4";

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
      <div className={classes.secondSection}>
        <div className={classes.featureWrapperLeft}>
          <Typography variant="h4" className={classes.featureLeftText}>
            Browse your emails effortlessly with a sleek and intuitive user
            interface
          </Typography>
          <img width={300} src={arrow} className={classes.rightArrow} />
          <video autoPlay controls className={classes.video}>
            <source src={intro1} type="video/mp4" />
          </video>
        </div>
        <div className={classes.featureWrapperRight}>
          <Typography variant="h4" className={classes.featureRightText}>
            Get quick summaries, key action items, and suggested responses from
            your emails
          </Typography>
          <img width={300} src={arrow2} className={classes.leftArrow} />
          <video autoPlay controls className={classes.video}>
            <source src={intro2} type="video/mp4" />
          </video>
        </div>
        <div className={classes.featureWrapperLeft}>
          <Typography variant="h4" className={classes.featureLeftText}>
            Easily access the history of all your email briefs in one convenient
            location
          </Typography>
          <img width={300} src={arrow} className={classes.rightArrow} />
          <video autoPlay controls className={classes.video}>
            <source src={intro3} type="video/mp4" />
          </video>
        </div>
        <div className={classes.featureWrapperRight}>
          <Typography variant="h4" className={classes.featureRightText}>
            Manage action items directly in your email interface with seamless
            Google Tasks integration
          </Typography>
          <img width={300} src={arrow2} className={classes.leftArrow} />
          <video autoPlay controls className={classes.video}>
            <source src={intro4} type="video/mp4" />
          </video>
        </div>
      </div>
      {/* <div className={classes.thirdSection}></div> */}
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
