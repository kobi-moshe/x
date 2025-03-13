import { Card, CardContent, Typography } from "@mui/material";
import { useStyles } from "./styles";
import { BriefData } from "../common";

export const PromptsViewer: React.FC<BriefData> = (props) => {
  const { summary, responses, actions } = props;
  console.log(props)
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6">Summary</Typography>
        <Typography>{summary}</Typography>
        {responses && (
          <>
            <Typography variant="h6">Possible Responses</Typography>
            <Typography>Positive:</Typography>
            <Typography>{responses.positive}</Typography>
            <Typography>Neutral:</Typography>
            <Typography>{responses.neutral}</Typography>
            <Typography>Negative:</Typography>
            <Typography>{responses.negative}</Typography>
          </>
        )}
        <Typography variant="h6">Action Items</Typography>
        {actions?.map((action, index) => (
          <Typography key={index}>{`${index + 1}. ${action}`}</Typography>
        ))}
      </CardContent>
    </Card>
  );
};
