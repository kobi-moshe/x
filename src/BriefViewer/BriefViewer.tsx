import {
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useStyles } from "./styles";
import { BriefData } from "../common";
import { AddTask } from "@mui/icons-material";
import { useState } from "react";
import { ActionItemsDialog } from "./ActionItemsDialog";

export const BriefViewer: React.FC<BriefData> = (props) => {
  const { subject, summary, responses, actions } = props;
  const classes = useStyles();
  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);

  const onAddTaskClick = () => {
    setIsActionsModalOpen(true);
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.briefCardContent}>
        <Typography variant="h6">{subject}</Typography>
        <div>
          <Typography variant="h6">Summary</Typography>
          <Typography>{summary}</Typography>
        </div>
        {responses && (
          <div>
            <Typography variant="h6">Possible Responses</Typography>
            <Typography>Positive:</Typography>
            <Typography>{responses.positive}</Typography>
            <Typography>Neutral:</Typography>
            <Typography>{responses.neutral}</Typography>
            <Typography>Negative:</Typography>
            <Typography>{responses.negative}</Typography>
          </div>
        )}
        {actions.length > 0 && (
          <div>
            <div className={classes.actionItemsWrapper}>
              <Typography variant="h6">Action Items</Typography>
              <Tooltip title="Add tasks">
                <IconButton
                  size="small"
                  onClick={onAddTaskClick}
                  style={{ color: "#52BD95" }}
                >
                  <AddTask />
                </IconButton>
              </Tooltip>
            </div>
            {actions?.map((action, index) => (
              <Typography key={index}>{`${index + 1}. ${action}`}</Typography>
            ))}
          </div>
        )}
      </CardContent>
      {isActionsModalOpen && (
        <ActionItemsDialog
          setIsOpen={setIsActionsModalOpen}
          actions={actions}
          subject={subject}
        />
      )}
    </Card>
  );
};
