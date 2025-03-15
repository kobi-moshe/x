import { Typography } from "@mui/material";
import { BriefData, Typewriter } from "../common";
import { useStyles } from "./styles";

export const BriefOutput: React.FC<BriefData> = (props) => {
  const { summary, responses, actions } = props;
  const classes = useStyles();

  return (
    <div className={classes.outputWrapper}>
      {summary && (
        <>
          <Typography variant="h6" className={classes.title}>
            Summary
          </Typography>
          <Typewriter text={summary} />
        </>
      )}
      {responses && (
        <>
          <Typography variant="h6" className={classes.title}>
            Possible Responses
          </Typography>
          <Typography className={classes.title}>Positive:</Typography>
          <Typewriter text={responses.positive} />
          <Typography className={classes.title}>Neutral:</Typography>
          <Typewriter text={responses.neutral} />
          <Typography className={classes.title}>Negative:</Typography>
          <Typewriter text={responses.negative} />
        </>
      )}
      {actions && (
        <>
          <Typography variant="h6" className={classes.title}>
            Action Items
          </Typography>
          {actions.map((action, index) => (
            <Typewriter key={index} text={`${index + 1}. ${action}`} />
          ))}
        </>
      )}
    </div>
  );
};
