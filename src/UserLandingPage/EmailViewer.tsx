import DOMPurify from "dompurify";
import { EmailViewerProps } from "./types";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Tooltip,
  Typography,
} from "@mui/material";
import { useStyles } from "./styles";

export const EmailViewer: React.FC<EmailViewerProps> = (props) => {
  const {
    id,
    subject,
    sender,
    htmlContent,
    cleanContent,
    isPremiumUser,
    onClick,
  } = props;
  const classes = useStyles();

  const isActionButtonDisabled = !isPremiumUser && cleanContent.length > 4000;
  const actionTooltip = isActionButtonDisabled
    ? "Max 4000 characters, upgrade to premium for unlimited characters"
    : "";

  const sanitizedHTML = DOMPurify.sanitize(htmlContent, {
    ADD_TAGS: ["style"],
    ADD_ATTR: ["target"],
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick({ subject, content: cleanContent });
  };

  return (
    <Accordion key={id} className={classes.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        classes={{ content: classes.accordionContent }}
      >
        <div>
          <Typography variant="h6">{subject}</Typography>
          <Typography>From: {sender}</Typography>
          <Typography variant="body2">
            Characters count: {cleanContent.length}
          </Typography>
        </div>
        <Tooltip title={actionTooltip}>
          <span>
            <Button
              variant="contained"
              disabled={isActionButtonDisabled}
              onClick={handleClick}
              className={classes.briefButton}
            >
              Brief it!
            </Button>
          </span>
        </Tooltip>
      </AccordionSummary>
      <AccordionDetails dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
    </Accordion>
  );
};
