import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useStyles } from "./styles";
import { OptionsPickerType } from "./types";

export const OptionsPicker: React.FC<OptionsPickerType> = (props) => {
  const { items, onClick, selected } = props;
  const classes = useStyles();
  const [selectedLabel, setSelectedLabel] = useState("");

  useEffect(() => {
    if (selected) {
      setSelectedLabel(selected);
    }
  }, [selected]);

  const handleButtonClick = (label: string) => {
    setSelectedLabel((prevState) => (prevState === label ? "" : label));
    onClick(label === selectedLabel ? "" : label);
  };

  return (
    <div className={classes.wrapper}>
      {items.map((item, index) => {
        const { title } = item;
        return (
          <Button
            key={index}
            classes={{
              root:
                selectedLabel === title
                  ? classes.buttonSelected
                  : classes.button,
            }}
            onClick={() => handleButtonClick(title)}
          >
            <Typography variant="caption" className={classes.label}>
              {title}
            </Typography>
          </Button>
        );
      })}
    </div>
  );
};
