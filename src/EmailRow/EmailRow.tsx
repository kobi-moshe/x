import { useRef } from "react";
import { Button, Typography } from "@mui/material";
import { useStyles } from "./styles";
import { EmailRowProps } from "./types";
import { EmailData } from "../common";
import DOMPurify from "dompurify";
import moment from "moment";

export const EmailRow: React.FC<EmailRowProps> = (props) => {
  const {
    selectedEmail,
    setSelectedEmail,
    hasBrief,
    onShowBriefClick,
    ...email
  } = props;
  const { id, domain, sender, subject, snippet, sentDate } = email;
  const classes = useStyles();

  const sanitizedHTML = useRef("");

  const matches = sender.match(/(.*)(?=<)/);
  const senderName = matches ? matches[0].trim() : sender;
  const from = senderName.replace(/^"|"$/g, "");
  const date = moment(sentDate).format("MMM D");

  const handleEmailClick = (email: EmailData) => {
    setSelectedEmail(email);
    sanitizedHTML.current = DOMPurify.sanitize(email.htmlContent, {
      ADD_TAGS: ["style"],
      ADD_ATTR: ["target"],
    });
  };

  return (
    <div
      key={id}
      onClick={() => handleEmailClick(email)}
      className={
        selectedEmail?.id === id
          ? classes.emailWrapperSelected
          : classes.emailWrapper
      }
    >
      <img
        src={`https://cdn.brandfetch.io/${domain}`}
        style={{
          width: 30,
          height: 30,
          marginRight: 12,
          borderRadius: 8,
          backgroundColor: "#E8E8E8",
        }}
      />
      {/* <Checkbox
            size="small"
            checked={selectedEmails.includes(id)}
            onChange={() => handleCheckboxChange(id)}
            onClick={(e) => e.stopPropagation()}
          /> */}
      <Typography
        variant="body2"
        style={{
          width: 200,
          flexShrink: 0,
          fontWeight: "bold",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {from}
      </Typography>
      <div style={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="body2">{subject}</Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {snippet}
        </Typography>
      </div>
      <Typography variant="caption" className={classes.date}>
        {date}
      </Typography>
      {hasBrief && (
        <div className={classes.emailActions}>
          <Button
            variant="contained"
            onClick={(e) => onShowBriefClick(e, id)}
            className={classes.showBriefButton}
          >
            Show brief
          </Button>
        </div>
      )}
    </div>
  );
};
