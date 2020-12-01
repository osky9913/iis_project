import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import LoginDialogForm from "./LoginDialogForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginDialogValidationSchema } from "./LoginDialogValidationSchema";
import { userService } from "../../../../../services";
import UserContext from "../../../../../context/UserContext";
import { api } from "../../../../../api/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const methods = useForm({
    resolver: yupResolver(loginDialogValidationSchema),
  });
  const { handleSubmit, errors, control } = methods;
  const { setUser } = useContext(UserContext);

  const onSubmit = (data) => {
    api
      .login(data)
      .then((response) => {
        userService.login(data, setUser);
        props.handleClose();
      })
      .catch((err) => props.setError(true));
  };

  return (
    <Dialog
      open={props.openLoginDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"Prihlásenie"}</DialogTitle>
      <DialogContent>
        <LoginDialogForm
          errors={errors}
          control={control}
          methods={methods}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Zrušiť
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Prihlásiť
        </Button>
      </DialogActions>
      {props.error ? (
        <p style={{ color: "red", marginLeft: "20px" }}>
          {" "}
          Prihlasenie sa nezdarilo
        </p>
      ) : null}
    </Dialog>
  );
}
