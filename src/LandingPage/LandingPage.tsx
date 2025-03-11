import { Typography } from "@mui/material";
import { useStyles } from "./styles";
import { FreeTrialButton } from "../common";
import ReactGA from "react-ga4";
import { Header } from "../Header";
import { HeroSection } from "../HeroSection";

export const LandingPage: React.FC = () => {
  const classes = useStyles();
  ReactGA.send({
    hitType: "pageview",
    page: "/",
    title: "Landing Page",
  });

  return (
    <div className={classes.wrapper}>
      <HeroSection>
        <Header />
        <div className={classes.firstSection}>
          <div className={classes.firstSectionLeft}>
            <Typography
              variant="h3"
              fontWeight="bold"
              style={{ lineHeight: 1.5 }}
            >
              Struggling to Come Up With Creative Prompts for AI Art?
            </Typography>
            <Typography>
              Generate unique, AI-powered prompts tailored to your selections,
              making it easier to create inspiring designs with your favorite
              art tools. Save time and streamline your creative workflow.
            </Typography>
            <FreeTrialButton />
          </div>
        </div>
      </HeroSection>
      <div className={classes.secondSection}>
        <iframe
          src="https://www.youtube.com/embed/mwhqYDDt4k8?autoplay=1"
          allowFullScreen
          className={classes.demoVideo}
        />
        <Typography variant="h4" fontWeight="bold">
          Unleash the best possible prompts
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          for your creative art projects
        </Typography>
        <div className={classes.seecondSection}>
          <div className={classes.featureSection}>
            <Typography fontWeight="bold">Tailored Creative Prompts</Typography>
            <Typography>
              Generate personalized prompts that match your chosen medium,
              style, and elements, ensuring your artistic vision comes to life.
            </Typography>
          </div>
          <div className={classes.featureSection}>
            <Typography fontWeight="bold">Continuous Inspiration</Typography>
            <Typography>
              Discover an ever-expanding library of prompts designed to fuel
              your creativity and keep your artistic journey fresh.
            </Typography>
          </div>
          <div className={classes.featureSection}>
            <Typography fontWeight="bold">Effortless Workflow</Typography>
            <Typography>
              Quickly copy and use prompts in your favorite AI art tools, making
              it easy to jump from idea to creation.
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.thirdSection}>
        <Typography variant="h4" fontWeight="bold">
          Spend less time thinking, and more time creating
        </Typography>
        <div className={classes.thirdSectionInner}>
          <div className={classes.thirdSectionInnerLeft}>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography fontWeight="bold">Save Valuable Time</Typography>
              </div>
              <Typography>
                Quickly generate high-quality prompts tailored to your needs,
                allowing you to focus on creating rather than brainstorming.
              </Typography>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography fontWeight="bold">Enhance Creativity</Typography>
              </div>
              <Typography>
                Unlock new ideas and artistic possibilities with unique prompts
                designed to inspire and push your creative boundaries.
              </Typography>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography fontWeight="bold">Boost Productivity</Typography>
              </div>
              <Typography>
                Streamline your creative process by having ready-made prompts at
                your fingertips, helping you start projects faster and stay in
                the creative flow.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.fourthSection}>
        <div className={classes.fourthSectionInner}>
          <Typography variant="h4" fontWeight="bold">
            Streamline Your Creative Process
          </Typography>
          <Typography>
            Try it for free today and start saving valuable time.
          </Typography>
        </div>
        <FreeTrialButton />
      </div>
    </div>
  );
};
