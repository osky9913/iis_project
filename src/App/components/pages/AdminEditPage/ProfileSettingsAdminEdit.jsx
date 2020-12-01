import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import { ProfileSettingsValidationSchemaAdminEdit } from "./ProfileSettingValidationSchemaAdminEdit";
import ProfileSettingsFormAdminEdit from "./ProfileSettingsFormAdminEdit";
import { api } from "../../../../api/api";
import { useHistory } from "react-router-dom";
import UserContext from "../../../../context/UserContext";

//@todo tlacitko ulozit na pravo

const ProfileSettingsAdminEdit = (props) => {
  let history = useHistory();
  const { user } = useContext(UserContext);
  const id = props.id;
  const methods = useForm({
    resolver: yupResolver(ProfileSettingsValidationSchemaAdminEdit),
  });
  const { handleSubmit, errors, control, reset } = methods;

  const onSubmit = (data) => {
    data["id"] = props.id;
    api.set();
    api.putUser(JSON.stringify(data));

    if (data["role"] === 0 && user["user"]["id"] === data["id"]) {
      localStorage.setItem("user", JSON.stringify(data));
    }

    history.push("/admin-settings");
    location.reload();
  };

  return (
    <div>
      <ProfileSettingsFormAdminEdit
        errors={errors}
        control={control}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        reset={reset}
        id={id}
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
};

export default ProfileSettingsAdminEdit;
