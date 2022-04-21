import React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Snackbar, AlertColor } from "@mui/material";

interface SnackBarProps {
  openState: boolean;
  handleClose: Function;
  SnackBarType: AlertColor;
  message: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackBar: React.FC<SnackBarProps> = ({
  handleClose,
  openState,
  SnackBarType,
  message,
}) => {
  return (
    <Snackbar
      open={openState}
      autoHideDuration={6000}
      onClose={() => handleClose()}
      key="top-right"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={() => handleClose()}
        severity={SnackBarType}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
