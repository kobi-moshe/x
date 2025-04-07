import React, { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useStyles } from "./styles";
import { UserMetadata } from "../common";
import clsx from "clsx";
import { logout } from "../authService";

export const UserAvatar: React.FC<
  Partial<UserMetadata> & { className?: string }
> = (props) => {
  const { email, name, isPremium, className } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const firstLetter = name?.charAt(0)?.toUpperCase();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    handleClose();
    await logout();
  };

  return (
    <div className={clsx(className)}>
      <IconButton onClick={handleClick} size="small">
        <Avatar className={classes.avatar}>{firstLetter}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        <MenuItem className={classes.userInfo} onClick={handleClose}>
          <Avatar className={classes.userAvatar}>{firstLetter}</Avatar>
          <div>
            <Typography variant="subtitle1" className={classes.userName}>
              {name}
            </Typography>
            <Typography variant="body2" className={classes.userEmail}>
              {email}
            </Typography>
            <Typography variant="caption" style={{ color: "#52BD95" }}>
              {isPremium ? "Premium plan" : "Free plan"}
            </Typography>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut} className={classes.menuItem}>
          <Logout className={classes.signOutIcon} />
          Sign out
        </MenuItem>
      </Menu>
    </div>
  );
};
