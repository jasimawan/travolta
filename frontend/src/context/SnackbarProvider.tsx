import React, { createContext, useContext, useState, ReactNode } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

type Severity = "success" | "warning" | "info" | "error";

type SnackbarMessage = {
  message: string;
  severity?: Severity;
};

type SnackbarContextType = {
  openSnackbar: (data: SnackbarMessage) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<Severity>("success");

  const openSnackbar = ({ message, severity = "success" }: SnackbarMessage) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = (
    _?: React.SyntheticEvent<any> | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason && reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <div>
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </div>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
}

export default SnackbarProvider;
