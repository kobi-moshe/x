import DOMPurify from "dompurify";
import { Close as CloseIcon } from "@mui/icons-material";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useCallback, useMemo, useRef, useState } from "react";
import { useStyles } from "./styles";
import { EmailViewerProps, GenerateBriefServerData } from "./types";
import { EmailAvatar, briefsUrl, Typewriter } from "../common";
import api from "../api";
import { generateBriefUrl } from "./utils";
import moment from "moment";
import { userMetadataUrl } from "../UserHomePage/utils";

export const EmailViewer: React.FC<EmailViewerProps> = (props) => {
  const {
    id,
    subject,
    sender,
    domain,
    sentDate,
    htmlContent,
    cleanContent,
    setSelectedEmail,
    hasBrief,
    onShowBriefClick,
    setBriefs,
    isPremiumUser,
    setUserMetadata,
  } = props;
  const classes = useStyles();
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
  const briefButtonRef = useRef<HTMLButtonElement>(null);

  const matches = sender.match(/(.*)(?=<)/);
  let senderName = matches ? matches[0].trim() : sender;
  senderName = senderName.replace(/^"|"$/g, "");
  const from = sender.replace(/"|"$/g, "");
  const localTime = moment(sentDate);
  const date = `${localTime.format(
    "MMM D, ddd, h:mm a"
  )} (${localTime.fromNow()})`;

  const isActionButtonDisabled = !isPremiumUser && cleanContent.length > 4000;
  const actionTooltip = isActionButtonDisabled
    ? "Max 4000 characters, upgrade to premium for unlimited characters"
    : "";

  const sanitizedHTML = DOMPurify.sanitize(htmlContent, {
    ADD_TAGS: ["style"],
    ADD_ATTR: ["target"],
  });

  const generateBrief = useCallback(
    async (data: GenerateBriefServerData) => {
      try {
        setIsGeneratingBrief(true);
        await api.post(generateBriefUrl, data);
        toast("Brief generated successfully!", {
          type: "success",
        });
        api.get(userMetadataUrl).then((response) => {
          setUserMetadata(response.data);
        });
        api.get(briefsUrl).then((response) => {
          setBriefs(response.data);
          setTimeout(() => briefButtonRef.current?.click(), 500);
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response.data.message === "Insufficient credits") {
          toast("Insufficient credits for generation", {
            type: "error",
          });
        }
      } finally {
        setIsGeneratingBrief(false);
      }
    },
    [setBriefs, setUserMetadata]
  );

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      await generateBrief({ id, subject, content: cleanContent });
    },
    [cleanContent, generateBrief, id, subject]
  );

  const onClose = () => {
    setSelectedEmail(null);
  };

  const BriefButton = useMemo(() => {
    if (isGeneratingBrief) {
      return (
        <Typewriter
          text="Generating brief..."
          delay={30}
          wrapperClassName={classes.generatingBriefText}
        />
      );
    }
    if (hasBrief) {
      return (
        <Button
          ref={briefButtonRef}
          variant="outlined"
          onClick={(e) => onShowBriefClick(e, id)}
          className={classes.showBriefButton}
        >
          Show brief
        </Button>
      );
    }
    return (
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
    );
  }, [
    actionTooltip,
    classes.briefButton,
    classes.generatingBriefText,
    classes.showBriefButton,
    handleClick,
    hasBrief,
    id,
    isActionButtonDisabled,
    isGeneratingBrief,
    onShowBriefClick,
  ]);

  return (
    <Paper className={classes.wrapper}>
      <div className={classes.headerWrapper}>
        <div className={classes.headerLeftWrapper}>
          <EmailAvatar
            key={domain}
            url={`https://cdn.brandfetch.io/${domain}`}
            senderName={senderName}
          />
          <Typography variant="body2">{from}</Typography>
        </div>
        {sentDate && <Typography variant="caption">{date}</Typography>}
      </div>
      <div className={classes.briefButtonWrapper}>{BriefButton}</div>
      <div className={classes.contentWrapper}>
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizedHTML,
          }}
        />
      </div>
      <IconButton onClick={onClose} className={classes.closeIcon}>
        <CloseIcon />
      </IconButton>
    </Paper>
  );
};
