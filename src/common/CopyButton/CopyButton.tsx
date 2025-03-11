import { IconButton, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { CopyButtonProps } from "./types";
import { ContentCopy } from "@mui/icons-material";
import { useStyles } from "./styles";

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const classes = useStyles();

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(text);
    toast("Prompt copied to clipboard!", { type: "success", autoClose: 1000 });
  };

  return (
    <IconButton onClick={handleCopyPrompt} className={classes.copyButton}>
      <Tooltip title="Copy prompt">
        <ContentCopy className={classes.copyIcon} />
      </Tooltip>
    </IconButton>
  );
};
