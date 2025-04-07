import { useRef } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { useStyles } from "./styles";
import { EmailRowProps } from "./types";
import { EmailAvatar, EmailData } from "../common";
import DOMPurify from "dompurify";
import moment from "moment";
import { Visibility as VisibilityIcon } from "@mui/icons-material";

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
  let senderName = matches ? matches[0].trim() : sender;
  senderName = senderName.replace(/^"|"$/g, "");
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
      <EmailAvatar
        key={domain}
        url={`https://cdn.brandfetch.io/${domain}`}
        senderName={senderName}
      />
      {/* <Checkbox
            size="small"
            checked={selectedEmails.includes(id)}
            onChange={() => handleCheckboxChange(id)}
            onClick={(e) => e.stopPropagation()}
          /> */}
      <Typography variant="body2" className={classes.subjectWrapper}>
        {senderName}
      </Typography>
      <div style={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="body2">{subject}</Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {snippet}
        </Typography>
      </div>
      <div className={classes.rightSideWrapper}>
        {hasBrief && (
          <IconButton onClick={(e) => onShowBriefClick(e, id)}>
            <Tooltip title="Show brief" placement="left">
              <VisibilityIcon style={{ color: "#52BD95" }} />
            </Tooltip>
          </IconButton>
        )}
        <Typography variant="caption" className={classes.date}>
          {date}
        </Typography>
      </div>
    </div>
  );
};
