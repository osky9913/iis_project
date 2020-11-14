import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import LoginDialogForm from "./LoginDialogForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  return (
    <Dialog
      open={props.openLoginDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"Prihlasenie"}</DialogTitle>
      <DialogContent>
        <LoginDialogForm />
      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Zrušiť
        </Button>
        <Button onClick={props.handleClose} color="primary">
          Prihlásiť
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AlertDialogSlide.propTypes;
