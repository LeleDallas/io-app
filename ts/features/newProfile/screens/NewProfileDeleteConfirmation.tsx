import {
  Body,
  ContentWrapper,
  IOStyles,
  VSpacer
} from "@pagopa/io-app-design-system";
import * as pot from "@pagopa/ts-commons/lib/pot";
import React, { useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { UserDataProcessingChoiceEnum } from "../../../../definitions/backend/UserDataProcessingChoice";
import { InfoBox } from "../../../components/box/InfoBox";
import { FooterActions } from "../../../components/ui/FooterActions";
import { IOScrollViewWithLargeHeader } from "../../../components/ui/IOScrollViewWithLargeHeader";
import I18n from "../../../i18n";
import { useIONavigation } from "../../../navigation/params/AppParamsList";
import ROUTES from "../../../navigation/routes";
import { upsertUserDataProcessing } from "../../../store/actions/userDataProcessing";
import { useIODispatch, useIOSelector } from "../../../store/hooks";
import { userDataProcessingSelector } from "../../../store/reducers/userDataProcessing";
import NewProfileContent from "../components/NewProfileContent";
import NewProfileError from "../components/NewProfileError";
import NewProfileLoading from "../components/NewProfileLoading";
import { newProfileActions } from "../store/actions";
import { selectNewProfile } from "../store/selectors";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  }
});

const NewProfileDeleteConfirmation = () => {
  const navigation = useIONavigation();
  const newProfile = useIOSelector(selectNewProfile);
  const dispatch = useIODispatch();
  const userDataProcessing = useIOSelector(userDataProcessingSelector);

  const loadProfile = useCallback(
    () => dispatch(newProfileActions.request()),
    [dispatch]
  );

  const deleteProfile = useCallback(() => {
    dispatch(
      upsertUserDataProcessing.request(UserDataProcessingChoiceEnum.DELETE)
    );
    navigation.navigate(ROUTES.NEW_PROFILE_STACK_NAVIGATOR, {
      screen: ROUTES.NEW_PROFILE_DELETE_SUCCESS
    });
  }, [dispatch, navigation]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const renderUpsertError = useCallback(
    () =>
      pot.isError(userDataProcessing.DELETE) ? (
        <NewProfileError
          title={I18n.t("newProfile.deleteFlow.error")}
          content={I18n.t("newProfile.deleteFlow.retry")}
          onPress={deleteProfile}
        />
      ) : null,
    [deleteProfile, userDataProcessing.DELETE]
  );

  const DataMapped = useCallback(
    () =>
      pot.fold(
        newProfile,
        () => <NewProfileLoading />,
        () => <NewProfileLoading />,
        () => <NewProfileLoading />,
        () => <NewProfileError onPress={loadProfile} />,
        value => <NewProfileContent {...value} />,
        () => <NewProfileLoading />,
        () => <NewProfileLoading />,
        () => <NewProfileError onPress={loadProfile} />
      ),
    [loadProfile, newProfile]
  );

  return (
    <View style={styles.container}>
      <IOScrollViewWithLargeHeader
        title={{
          label: I18n.t("newProfile.deleteFlow.title")
        }}
        description={I18n.t("newProfile.deleteFlow.subtitle")}
        headerActionsProp={{ showHelp: true }}
      >
        <View style={IOStyles.flex}>
          <ContentWrapper>
            <InfoBox iconName="warningFilled" alignedCentral>
              <Body>{I18n.t("newProfile.deleteFlow.reviewData")}</Body>
            </InfoBox>
            <VSpacer size={12} />
            <DataMapped />
            <VSpacer size={12} />
            {renderUpsertError()}
          </ContentWrapper>
        </View>
      </IOScrollViewWithLargeHeader>
      <FooterActions
        fixed={false}
        actions={{
          type: "TwoButtons",
          primary: {
            label: I18n.t("global.buttons.confirm"),
            loading: pot.isLoading(userDataProcessing.DELETE),
            onPress: () => deleteProfile()
          },
          secondary: {
            label: I18n.t("global.buttons.cancel"),
            onPress: () => navigation.goBack()
          }
        }}
      />
    </View>
  );
};

export default NewProfileDeleteConfirmation;
