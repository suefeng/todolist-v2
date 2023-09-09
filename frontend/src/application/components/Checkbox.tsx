import React, { ComponentProps } from "react";
import MuiCheckbox from "@mui/material/Checkbox";

export const Checkbox = ({
  id,
  inputProps,
  icon,
  checkedIcon,
  onChange,
}: ComponentProps<typeof MuiCheckbox>) => {
  return (
    <MuiCheckbox
      id={id}
      inputProps={inputProps}
      icon={icon}
      checkedIcon={checkedIcon}
      onChange={onChange}
    />
  );
};
