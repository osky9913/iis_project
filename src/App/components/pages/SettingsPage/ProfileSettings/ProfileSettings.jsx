import React, { useContext, useEffect } from "react";
import UserContext from "../../../../../context/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import ProfileSettingsForm from "./ProfileSettingsForm";
import { CircularProgress } from "@material-ui/core";
import { ProfileSettingsValidationSchema } from "./ProfileSettingsValidationSchema";
import { api } from "../../../../../api/api";

//@todo tlacitko ulozit na pravo

const ProfileSettings = (props) => {
  const { user, setUser } = useContext(UserContext);
  const methods = useForm({
    resolver: yupResolver(ProfileSettingsValidationSchema),
  });
  const { handleSubmit, errors, control, reset } = methods;

  const onSubmit = (data) => {
    data["id"] = user["user"]["id"];
    api.deleteTokenFromHeader();

    api
      .putUser(JSON.stringify(data))
      .then((res) => {
        if (res.status === 200) {
          const token = user["token"];
          let tempUser = user["user"];
          tempUser["username"] = data["username"];
          tempUser["name"] = data["name"];
          tempUser["surname"] = data["surname"];
          tempUser["city"] = data["city"];
          tempUser["country"] = data["country"];
          tempUser["email"] = data["email"];
          tempUser["psc"] = data["psc"];
          tempUser["role"] = data["role"];
          tempUser["street"] = data["street"];
          tempUser["password"] = data["password"];
          setUser({ token: token, user: tempUser });
          localStorage.setItem("user", JSON.stringify(tempUser));
        }
      })
      .catch((err) => console.error(err));
    location.reload();
  };

  useEffect(() => {}, [user]);

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
          reset={reset}
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
