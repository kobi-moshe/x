import DOMPurify from "dompurify";
import { EmailViewerProps } from "./types";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { useStyles } from "./styles";

export const EmailViewer: React.FC<EmailViewerProps> = (props) => {
  const { id, subject, sender, htmlContent, cleanContent, onClick } = props;
  const classes = useStyles();

  const sanitizedHTML = DOMPurify.sanitize(htmlContent, {
    ADD_TAGS: ["style"],
    ADD_ATTR: ["target"],
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick(cleanContent);
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
        </div>
        <Button
          variant="contained"
          onClick={handleClick}
          className={classes.briefButton}
        >
          Brief it!
        </Button>
      </AccordionSummary>
      <AccordionDetails dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
    </Accordion>
  );
};
