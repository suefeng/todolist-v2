import * as React from 'react';
import { Alert, Snackbar } from '@mui/material';

export const Toast = ({
  message,
  action,
  open,
  setOpen,
  severity,
}: {
  message: string;
  action?: React.ReactNode;
  open: boolean;
  setOpen: Function;
  severity?: React.ComponentProps<typeof Alert>['severity'];
}) => {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={7000}
      onClose={handleClose}
      message={message}
      action={action}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
