import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function DialogBox({
  title = "Dialog Title",
  description = "This is a dialog box.",
  buttonText = "Open Dialog",
  buttonVariant = "solo",
  children,
  onClose,
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
      <button
        className="w-full text-decoration-none bg-gray-100 rounded-lg"
        variant={buttonVariant}
        onClick={() => setOpen(true)}
      >
        {buttonText}
      </button>
      <Backdrop className="rounded-[50px]" open={open} onClose={handleClose}>
        <div className="min-w-[500px] p-5">{children}</div>
      </Backdrop>
    </>
  );
}
