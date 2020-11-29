import React, { useContext } from "react";
import UserContext from "../../../../../context/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginDialogValidationSchema } from "../../../layout/AppBar/LoginDialog/LoginDialogValidationSchema";
import Button from "@material-ui/core/Button";
import ProfileSettingsForm from "./ProfileSettingsForm";
import { CircularProgress } from "@material-ui/core";

const ProfileSettings = () => {
  const { user, setUser } = useContext(UserContext);
  const methods = useForm({
    resolver: yupResolver(loginDialogValidationSchema),
  });
  const { handleSubmit, errors, control } = methods;

  const onSubmit = (data) => {
    console.log("fuck you ", data);
  };

  if (user) {
    return (
      <div>
        <ProfileSettingsForm
          errors={errors}
          control={control}
          methods={methods}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          user={user}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Ulozit
        </Button>
      </div>
    );
  } else {
    return <CircularProgress />;
  }
};

export default ProfileSettings;
