import { Close } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { forwardRef, useCallback, useMemo, useState } from "react";
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
  const [selectedActions, setSelectedActions] =
    useState<Array<string>>(actions);
  const [isLoading, setIsLoading] = useState(false);

  const onActionClick = useCallback(
    (actionName: string) => {
      const isActionChecked = selectedActions.includes(actionName);
      if (isActionChecked) {
        setSelectedActions((prevState) =>
          prevState.filter((action) => action !== actionName)
        );
      } else {
        setSelectedActions((prevState) => [...prevState, actionName]);
      }
    },
    [selectedActions]
  );

  const onCloseClick = () => {
    setIsOpen(false);
  };

  const onConfirmClick = async () => {
    try {
      setIsLoading(true);
      await api.post(tasksUrl, {
        listTitle: subject,
        actionItems: selectedActions,
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

  const ActionsList = useMemo(
    () =>
      actions.map((action, index) => {
        const isChecked = selectedActions.includes(action);

        return (
          <div
            key={index}
            onClick={() => onActionClick(action)}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Checkbox checked={isChecked} />
            <Typography>{action}</Typography>
          </div>
        );
      }),
    [actions, onActionClick, selectedActions]
  );

  return (
    <Dialog
      open
      keepMounted
      TransitionComponent={Transition}
      PaperProps={{ className: classes.dialogPaper }}
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
        <div className={classes.loadingWrapper}>
          <CircularProgress />
        </div>
      ) : (
        <DialogContent>{ActionsList}</DialogContent>
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
