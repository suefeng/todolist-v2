import React, { ComponentProps } from "react";
import MuiModal from "@mui/material/Modal";

export const Modal = ({
  children,
  open,
  onClose,
}: ComponentProps<typeof MuiModal>) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      {children}
    </MuiModal>
  );
};
