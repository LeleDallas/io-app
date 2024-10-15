import { ContentWrapper, VSpacer } from "@pagopa/io-app-design-system";
import * as pot from "@pagopa/ts-commons/lib/pot";
import React, { useCallback, useEffect } from "react";
import { UserDataProcessingChoiceEnum } from "../../../../definitions/backend/UserDataProcessingChoice";
import { IOScrollViewWithLargeHeader } from "../../../components/ui/IOScrollViewWithLargeHeader";
import I18n from "../../../i18n";
import { loadUserDataProcessing } from "../../../store/actions/userDataProcessing";
import { useIODispatch, useIOSelector } from "../../../store/hooks";
import NewProfileContent from "../components/NewProfileContent";
import NewProfileError from "../components/NewProfileError";
import NewProfileLoading from "../components/NewProfileLoading";
import { newProfileActions } from "../store/actions";
import { selectNewProfile } from "../store/selectors";

const NewProfileScreen = () => {
  const dispatch = useIODispatch();
  const newProfileSelector = useIOSelector(selectNewProfile);

  const loadProfile = useCallback(
    () => dispatch(newProfileActions.request()),
    [dispatch]
  );

  const checkUserDataProcessing = useCallback(
    () =>
      dispatch(
        loadUserDataProcessing.request(UserDataProcessingChoiceEnum.DELETE)
      ),
    [dispatch]
  );

  useEffect(() => {
    loadProfile();
    checkUserDataProcessing();
  }, [checkUserDataProcessing, loadProfile]);

  const NewProfileContentMapped = useCallback(
    () =>
      pot.fold(
        newProfileSelector,
        () => <NewProfileLoading />,
        () => <NewProfileLoading />,
        () => <NewProfileLoading />,
        () => <NewProfileError onPress={loadProfile} />,
        value => <NewProfileContent {...value} />,
        () => <NewProfileLoading />,
        () => <NewProfileLoading />,
        () => <NewProfileError onPress={loadProfile} />
      ),
    [loadProfile, newProfileSelector]
  );

  return (
    <IOScrollViewWithLargeHeader
      title={{
        label: I18n.t("newProfile.title")
      }}
      description={I18n.t("newProfile.subtitle")}
      headerActionsProp={{ showHelp: true }}
    >
      <ContentWrapper>
        <NewProfileContentMapped />
        <VSpacer size={48} />
      </ContentWrapper>
    </IOScrollViewWithLargeHeader>
  );
};
export default NewProfileScreen;
