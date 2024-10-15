import { Alert } from "@pagopa/io-app-design-system";
import React from "react";
import I18n from "../../../i18n";

type Props = {
  title?: string;
  content?: string;
  onPress: () => void;
};

const NewProfileError = (props: Props) => {
  const {
    onPress,
    title = I18n.t("profile.errors.load"),
    content = I18n.t("global.actions.retry")
  } = props;
  return (
    <Alert
      variant={"error"}
      action={I18n.t("global.buttons.retry")}
      onPress={() => onPress()}
      title={title}
      content={content}
    />
  );
};

export default NewProfileError;
