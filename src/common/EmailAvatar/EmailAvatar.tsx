import React, { useMemo, useState } from "react";
import { Avatar as MuiAvatar } from "@mui/material";
import { AvatarProps } from "./types";
import { useStyles } from "./styles";

export const EmailAvatar: React.FC<AvatarProps> = ({ url, senderName }) => {
  const classes = useStyles();
  const [logoSrc, setLogoSrc] = useState(url);
  const isTransparentLogo = logoSrc !== url;

  const stringAvatar = useMemo(() => {
    const splitName = senderName.split(" ");
    const firstLetter = splitName[0].charAt(0).toUpperCase();
    const secondLetter = splitName[1] && splitName[1].charAt(0).toUpperCase();
    return secondLetter ? `${firstLetter}${secondLetter}` : firstLetter;
  }, [senderName]);

  const onLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    if (img.naturalWidth < 50 && img.naturalHeight < 50) {
      setLogoSrc(senderName);
    }
  };

  return (
    <MuiAvatar
      src={logoSrc}
      onLoad={onLoad}
      className={isTransparentLogo ? classes.initialsLogo : classes.logo}
    >
      {stringAvatar}
    </MuiAvatar>
  );
};
