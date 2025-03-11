import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useStyles } from "./styles";
import { Close, EmojiEmotions } from "@mui/icons-material";
import api from "../api";
import { feedbackUrl } from "./utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Transition = React.forwardRef(function Transition(props: any, ref) {
  return <Slide ref={ref} direction="up" {...props} timeout={1000} />;
});

export const SurveyPopup: React.FC = () => {
  const classes = useStyles();
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [rating, setRating] = useState<number | null>();
  const [isRatingFilled, setIsRatingFilled] = useState(true);
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    setTimeout(() => {
      setIsFeedbackModalOpen(true);
      localStorage.setItem("isFeedbackPopupWasShown", "true");
    }, 5000);
  }, []);

  const handleClose = () => {
    setIsFeedbackModalOpen(false);
  };

  const handleRatingChange = (
    _event: React.SyntheticEvent,
    value: number | null
  ) => {
    setRating(value);
    setIsRatingFilled(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!rating) {
        setIsRatingFilled(false);
      } else {
        await api.post(feedbackUrl, {
          rating,
          text: inputRef.current?.value,
        });
        setIsFeedbackModalOpen(false);
      }
    } catch (e) {
      console.log(e);
      setIsFeedbackModalOpen(false);
    }
  };

  return (
    <div>
      <Dialog
        open={isFeedbackModalOpen}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{ className: classes.wrapper }}
      >
        <Close
          fontSize="small"
          onClick={handleClose}
          className={classes.closeIcon}
        />
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold" className={classes.title}>
            We'd love your feedback!
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent className={classes.content}>
            <Typography fontWeight="bold">
              How would you rate your experience?
            </Typography>
            <Rating
              icon={<EmojiEmotions sx={{ fontSize: 50 }} />}
              emptyIcon={<EmojiEmotions sx={{ fontSize: 50 }} />}
              value={rating}
              onChange={handleRatingChange}
              className={classes.rating}
            />
            <Typography fontWeight="bold">
              How can we make your experience better?
            </Typography>
            <TextField
              inputRef={inputRef}
              multiline
              placeholder="Share your thoughts with us..."
              inputProps={{ maxLength: 500 }}
              InputProps={{ maxRows: 10 }}
              className={classes.input}
            />
          </DialogContent>
          <DialogActions className={classes.actionsWrapper}>
            <Button
              variant="contained"
              type="submit"
              className={classes.submitButton}
            >
              Submit feedback
            </Button>
            {!isRatingFilled && (
              <div className={classes.errorWrapper}>
                <Typography variant="body2" className={classes.errorMessage}>
                  Please rate your experience
                </Typography>
              </div>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
