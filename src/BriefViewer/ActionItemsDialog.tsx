import { Close } from "@mui/icons-material";
import {
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { forwardRef, useState } from "react";
import { ActionItemsDialogProps } from "./types";
import { useStyles } from "./styles";
import api from "../api";
import { tasksUrl } from "./utils";
import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Transition = forwardRef(function Transition(props: any, ref) {
  return <Slide ref={ref} direction="up" {...props} timeout={1000} />;
});

export const ActionItemsDialog: React.FC<ActionItemsDialogProps> = (props) => {
  const { setIsOpen, actions, subject } = props;
  const classes = useStyles();
  const [actionChips, setActionChips] = useState<Array<string>>(actions);
  const [isLoading, setIsLoading] = useState(false);

  const gmailToken = localStorage.getItem("gmailToken");

  const onDeleteChip = (action: string) => {
    setActionChips((prevState) => prevState.filter((chip) => chip !== action));
  };

  const onCloseClick = () => {
    setIsOpen(false);
  };

  const onConfirmClick = async () => {
    try {
      setIsLoading(true);
      await api.post(tasksUrl, {
        accessToken: gmailToken,
        listTitle: subject,
        actionItems: actionChips,
      });
      toast("Successfully added to your Google Tasks!", {
        type: "success",
        closeButton: false,
        className: classes.taskCreatedToast,
      });
    } finally {
      setIsLoading(false);
      onCloseClick();
    }
  };

  return (
    <Dialog
      open
      keepMounted
      TransitionComponent={Transition}
      PaperProps={{ className: classes.dialogWrapper }}
    >
      <Close
        fontSize="small"
        onClick={onCloseClick}
        className={classes.closeIcon}
      />
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Action Items
        </Typography>
      </DialogTitle>
      {isLoading ? (
        <CircularProgress className={classes.loadingWrapper} />
      ) : (
        <DialogContent>
          {actionChips.map((action, index) => (
            <Chip
              key={index}
              label={action}
              onDelete={() => onDeleteChip(action)}
            />
          ))}
        </DialogContent>
      )}
      <DialogActions className={classes.dialogActionsWrapper}>
        <Button
          variant="contained"
          disabled={isLoading}
          onClick={onCloseClick}
          className={classes.submitButton}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={isLoading}
          onClick={onConfirmClick}
          className={classes.submitButton}
        >
          Add tasks
        </Button>
      </DialogActions>
    </Dialog>
  );
};
