import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import { ProfileSettingsValidationSchemaAdminEdit } from "./ProfileSettingValidationSchemaAdminEdit";
import ProfileSettingsFormAdminEdit from "./ProfileSettingsFormAdminEdit";
import { api } from "../../../../api/api";
import { useHistory } from "react-router-dom";

//@todo tlacitko ulozit na pravo

const ProfileSettingsAdminEdit = (props) => {
  let history = useHistory();
  const id = props.id;
  const methods = useForm({
    resolver: yupResolver(ProfileSettingsValidationSchemaAdminEdit),
  });
  const { handleSubmit, errors, control, reset } = methods;

  const onSubmit = (data) => {
    data["id"] = props.id;
    console.log("Post data", data);
    api.deleteTokenFromHeader();

    api.putUser(JSON.stringify(data));
    history.push("settings");
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
