import DOMPurify from "dompurify";
import { Close as CloseIcon } from "@mui/icons-material";
import { Button, IconButton, Paper, Tooltip } from "@mui/material";
import { EmailViewerProps, GenerateBriefServerData } from "../types";
import { Typewriter } from "../../common";
import api from "../../api";
import { generateBriefUrl } from "../utils";
import { toast } from "react-toastify";
import { useCallback, useMemo, useState } from "react";
import { useStyles } from "./styles";

export const EmailViewer: React.FC<EmailViewerProps> = (props) => {
  const {
    id,
    subject,
    htmlContent,
    cleanContent,
    isPremiumUser,
    hasBrief,
    onShowBriefClick,
    onGenerateBriefSuccess,
    onClose,
  } = props;
  const classes = useStyles();
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);

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
        onGenerateBriefSuccess();
      } finally {
        setIsGeneratingBrief(false);
      }
    },
    [onGenerateBriefSuccess]
  );

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      await generateBrief({ id, subject, content: cleanContent });
    },
    [cleanContent, generateBrief, id, subject]
  );

  const handleCloseEmail = () => {
    onClose();
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
    <Paper
      style={{
        width: "50%",
        overflow: "auto",
        position: "relative",
        flexGrow: 1,
        flexShrink: 0,
        padding: 32,
        backgroundImage: "none",
        borderLeft: "1px solid dimgrey",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {BriefButton}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizedHTML,
          }}
        />
        <IconButton
          onClick={handleCloseEmail}
          style={{
            position: "absolute",
            top: 0,
            right: 8,
            color: "white",
            padding: 4,
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
    </Paper>
  );
};
