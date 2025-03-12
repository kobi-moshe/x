import { useEffect, useRef, useState } from "react";

import { CopyButton, Typewriter } from "../common";
import { Button, Skeleton, Typography } from "@mui/material";
import { Palette } from "@mui/icons-material";
import { useStyles } from "./styles";
import { PromptsViewerType } from "./types";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { checkImageStatusUrl, generateImageUrl } from "./utils";

export const PromptsViewer: React.FC<PromptsViewerType> = (props) => {
  const { generatedPrompts, setGeneratedPrompts, isAnimated = false } = props;
  const classes = useStyles();
  const [imageUid, setImageUid] = useState(-1);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const imagePromptRef = useRef("");
  const navgiate = useNavigate();

  const fetchImageStatus = async () => {
    try {
      const response = await api.get(`${checkImageStatusUrl}/${imageUid}`);
      if (response.data) {
        setImageUid(-1);
        setIsGeneratingImage(false);
      }
    } catch {
      setImageUid(-1);
      setIsGeneratingImage(false);
      imagePromptRef.current = "";
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (imageUid !== -1) {
        fetchImageStatus();
      } else {
        clearInterval(interval);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [imageUid]);

  const handleGenerateImage = async (prompt: string) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    try {
      setIsGeneratingImage(true);
      imagePromptRef.current = prompt;
      const response = await api.post(generateImageUrl, { prompt });
      setImageUid(response.data);
    } catch {
      setIsGeneratingImage(false);
      imagePromptRef.current = "";
    }
  };

  const backToMenu = () => {
    setGeneratedPrompts([]);
    navgiate("/");
  };

  return (
    <div className={classes.wrapper}>
      {isGeneratingImage && (
        <div className={classes.generatingWrapper}>
          <Typewriter text="Generating your image, please wait..." />
          <Skeleton
            width={512}
            height={512}
            className={classes.generatingSkeleton}
          />
        </div>
      )}
      {generatedPrompts.length === 0 && (
        <div className={classes.noHistoryWrapper}>
          <Typewriter
            text="You have not generated any prompts yet..."
            wrapperClassName={classes.noHistoryTextWrapper}
          />
        </div>
      )}
      {generatedPrompts.map((generatedPrompt, index) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Typography>Prompt {index + 1}:</Typography>
          <div style={{ display: "flex", position: "relative" }}>
            <div style={{ width: "100%" }}>
              {isAnimated ? (
                <Typewriter text={generatedPrompt} />
              ) : (
                <Typography>{generatedPrompt}</Typography>
              )}
            </div>
            <CopyButton text={generatedPrompt} />
          </div>
          <Button
            startIcon={<Palette />}
            onClick={() => handleGenerateImage(generatedPrompt)}
            className={classes.generateImageButton}
          >
            Generate Image
          </Button>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button className={classes.backButton} onClick={backToMenu}>
          Back to generating
        </Button>
      </div>
    </div>
  );
};
