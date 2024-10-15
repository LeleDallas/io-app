import { Divider, ListItemInfo } from "@pagopa/io-app-design-system";
import React from "react";
import I18n from "../../../i18n";
import NewProfile from "../types";

const NewProfileContent = (value: NewProfile) => (
  <>
    {value.name && (
      <>
        <ListItemInfo
          label={I18n.t("profile.data.list.nameSurname")}
          value={value.name}
          testID="name"
          icon={"profile"}
        />
        <Divider />
      </>
    )}
    {value.fiscalCode && (
      <>
        <ListItemInfo
          label={I18n.t("profile.data.list.fiscalCode")}
          testID="fiscal-code"
          value={value.fiscalCode}
          icon={"creditCard"}
        />
        <Divider />
      </>
    )}
    {value.email && (
      <ListItemInfo
        label={I18n.t("profile.data.list.email")}
        value={value.email}
        testID="email"
        icon={"email"}
      />
    )}
  </>
);
export default NewProfileContent;
