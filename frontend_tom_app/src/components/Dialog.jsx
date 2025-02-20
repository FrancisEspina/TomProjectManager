import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Icon,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { UserIcon } from "@heroicons/react/24/solid";
export default function DialogBox({
  title = "Dialog Title",
  Icon = UserIcon,
  description: body = "This is a dialog box.",
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
      <Backdrop className="z-10" open={open} onClick={handleClose}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl w-[500px] mx-2 px-5 py-3"
        >
          <div className="flex items-center mt-3 gap-x-2">
            <Icon className="size-5 text-gray-600" />
            <div className="text-lg font-bold ">{title}</div>
          </div>
          <DialogContent>
            {children || <div className="text-sm">{body}</div>}
          </DialogContent>

          <DialogActions>
            <button onClick={handleClose} className="text-white">
              Done
            </button>
          </DialogActions>
        </div>
      </Backdrop>
    </>
  );
}
